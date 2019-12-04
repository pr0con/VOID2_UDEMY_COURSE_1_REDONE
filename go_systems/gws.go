package main

import(
	//Native Packages
	"fmt"
	"flag"
	"net/http"
	"encoding/json"
	
	"github.com/google/uuid"
	
	//3rd Party Packages
	"github.com/gorilla/mux"
	//"github.com/gorilla/handlers"
	"github.com/gorilla/websocket"
	
	//Our Packages
	"procon_jwt"
	"procon_data"
	"procon_utils"
	"procon_mongo"
	"procon_config"
)

var addr = flag.String("addr", "0.0.0.0:1200", "http service address")
var upgrader = websocket.Upgrader{} // use default options


func handleAPI(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Print("WTF @HandleAPI Ws Upgrade Error> ", err)
		return
	}
	
	id, err := uuid.NewRandom() 
	if err != nil { fmt.Println(err) }
	
	//Modified Mux Websocket package Conn Struct in Conn.go
	c.Uuid = "ws-"+id.String()		
	
	Loop:
		for {
			in := procon_data.Msg{}
			
			err := c.ReadJSON(&in)
			if err != nil {
				c.Close()
				break Loop
			}	
			switch(in.Type) {
				case "register-client-msg":
					procon_data.SendMsg("^vAr^", "server-ws-connect-success-msg", c.Uuid , c);						
					break;
				case "create-user":
					res := procon_mongo.CreateUser(in.Data, c)
					fmt.Println("Mongo Function Result: ", res)
					//Change Role in mongo package!!!!	
					break;
				case "login-user":
					usr, pwd, err := procon_utils.B64DecodeTryUser(in.Data);
					if err != nil { fmt.Println(err);  } else {   	
						vres, auser, err := procon_mongo.MongoTryUser(usr,pwd);
						if err != nil { fmt.Println(err) } else if vres == true {
							auser.Password = "F00"
							
							jauser,err := json.Marshal(auser); if err != nil { fmt.Println("error marshaling AUser.") }else {
								jwt, err := procon_jwt.GenerateJWT(procon_config.PrivKeyFile, auser.Name, "You Implement", auser.Email, auser.Role)
								if err != nil { fmt.Println(err); } else {  procon_data.SendMsg(jwt, "server-ws-connect-success-jwt", string(jauser), c ); }
							}	
						}
						if vres == false {
							procon_data.SendMsg("^vAr^", "server-ws-connect-login-failure", "User Not Found or Invalid Credentials", c );
						}
					}
				case "validate-jwt": fallthrough
				case "validate-stored-jwt":
					valid, err := procon_jwt.ValidateJWT(procon_config.PubKeyFile, in.Jwt)
					fmt.Println(in.Jwt);
					if err != nil  {  
						fmt.Println(err); 
						if in.Type == "validate-jwt" { procon_data.SendMsg("^vAr^", "jwt-token-invalid", err.Error(), c) }
						if in.Type == "validate-stored-jwt" { procon_data.SendMsg("^vAr^", "stored-jwt-token-invalid", err.Error(), c) }
					} else if (err == nil && valid) {
						if in.Type == "validate-jwt" {  procon_data.SendMsg("^vAr^", "server-ws-connect-jwt-verified", "noop", c); }
						if in.Type == "validate-stored-jwt" {  procon_data.SendMsg("^vAr^", "server-ws-connect-stored-jwt-verified", "noop", c); }
					}
													
				default:
					break;					
			}
		}		
}

func handleUI(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	component := params["component"]

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json");
	fmt.Println(component);

	procon_mongo.MongoGetUIComponent(component, w)	
}


func main() {
	flag.Parse()
	
	
	//look into subrouter stuffs
	r := mux.NewRouter()	
	
	//Websocket API
	r.HandleFunc("/ws", handleAPI)
	
	//Resit API
	r.HandleFunc("/rest/api/ui/{component}", handleUI)
	
	//Rest API
	http.ListenAndServeTLS(*addr,"/etc/letsencrypt/live/void.pr0con.com/cert.pem", "/etc/letsencrypt/live/void.pr0con.com/privkey.pem", r)			
}