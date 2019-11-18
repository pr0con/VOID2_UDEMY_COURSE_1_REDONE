package main

import (
	//Native Packages
	"fmt"
	"flag"
	"net/http"

	
	"github.com/google/uuid"
	
	//3rd Party Packages
	"github.com/gorilla/mux"
	//"github.com/gorilla/handlers"
	"github.com/gorilla/websocket"
	
	//Our Packages
	"procon_jwt"
	"procon_data"
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
					jwt, err := procon_jwt.GenerateJWT(procon_config.PrivKeyFile, "fake nameame","fake alias","fake@email.com","Admin");
					if err != nil { fmt.Println("JWT Generation Failed") }else {
						procon_data.SendMsg("^vAr^", "server-ws-connect-success-jwt", jwt , c);
					}						
					break;
				case "test-jwt-message":
					valid, err := procon_jwt.ValidateJWT(procon_config.PubKeyFile,in.Jwt)
					fmt.Println(in.Jwt);
					if err != nil { fmt.Println(err); procon_data.SendMsg("^vAr^", "jwt-token-invalid",err.Error(), c) } else if (err == nil && valid ) {	
						fmt.Println("VALID JWT");
					}
					break;
				case "create-user":
					fmt.Println(in.Data)
				default:
					break;					
			}
		}		
}

func main() {
	flag.Parse()
	
	//look into subrouter stuffs
	r := mux.NewRouter()	
	
	//Websocket API
	r.HandleFunc("/ws", handleAPI)
	
	//Rest API
	http.ListenAndServeTLS(*addr,"/etc/letsencrypt/live/void.pr0con.com/cert.pem", "/etc/letsencrypt/live/void.pr0con.com/privkey.pem", r)			
}