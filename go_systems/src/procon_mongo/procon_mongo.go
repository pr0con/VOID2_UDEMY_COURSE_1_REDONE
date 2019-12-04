package procon_mongo

import (
	"fmt"
	"context"
	"net/http"
	"encoding/json"
	
	"github.com/gorilla/websocket"
	
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"	

    //"go.mongodb.org/mongo-driver/x/bsonx"
    //"go.mongodb.org/mongo-driver/bson/primitive"

	"procon_data"
	"procon_utils"
	"procon_config"	
)

type key string

const (
	HostKey     = key("hostKey")
	UsernameKey = key("usernameKey")
	PasswordKey = key("passwordKey")
	DatabaseKey = key("databaseKey")	
)

var ctx context.Context;
var client *mongo.Client;

func init()  {
	ctx = context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()
	
	ctx = context.WithValue(ctx, HostKey, procon_config.MongoHost)
	ctx = context.WithValue(ctx, UsernameKey, procon_config.MongoUser)
	ctx = context.WithValue(ctx, PasswordKey, procon_config.MongoPassword)
	ctx = context.WithValue(ctx, DatabaseKey, procon_config.MongoDb)

	uri := fmt.Sprintf(`mongodb://%s:%s@%s/%s`,
		ctx.Value(UsernameKey).(string),
		ctx.Value(PasswordKey).(string),
		ctx.Value(HostKey).(string),
		ctx.Value(DatabaseKey).(string),
	)
	clientOptions := options.Client().ApplyURI(uri)
	
	var err error
	client, err = mongo.Connect(ctx, clientOptions)
	
	// Check the connection
	err = client.Ping(ctx, nil)
	if err != nil { fmt.Println(err); } else { fmt.Println("Mongo Connected"); }
}

func CreateUser(json_create_user string, ws *websocket.Conn) (bool) {
	user := procon_data.AUser{}
	err := json.Unmarshal([]byte(json_create_user), &user);
	if err != nil {  fmt.Println(err) }else {
	    //fmt.Printf("%+v\n", user) DEBUG REDACTED
	    
		usr, pwd, err := procon_utils.B64DecodeTryUser(json_create_user);
		if err != nil { fmt.Println(err);  } else {    
		    user.Email = string(usr)
		    user.Password = string(pwd)
		    
		    collection := client.Database("api").Collection("users");	
		    //check if user already exists
			
			var xdoc interface{}
			filter := bson.D{{"user", user.Email }}
		    err := collection.FindOne(ctx, filter).Decode(&xdoc); 
		    if (err != nil && xdoc == nil) { 
			    fmt.Println("User Available", err);
				
				hp := procon_utils.GenerateUserPassword(user.Password);
				user.Password = hp;
				user.Role = "Generic";
				
				insertResult, err := collection.InsertOne(ctx, &user)
				if err != nil { fmt.Println("Error Inserting Document"); } else {
					fmt.Println("Inserted a single User: ", insertResult.InsertedID)
					procon_utils.SendMsg("vAr","toast-success", "User Created Successfully", ws);
					procon_utils.SendMsg("vAr","user-created-successfully", "User Created Successfully", ws);
					
					return true
				}
			} else {
				//shouldn't get here but it means some how rapid test didn't catch this
				//modal is still open so just display modal error...
				procon_utils.SendMsg("vAr","user-alredy-exists", "User Already Exists!", ws);
				
				return false
			}	 			
			
		}
	}
	
	return false
}

func MongoTryUser(e []byte, p []byte) (bool, *procon_data.AUser, error) {
	var xdoc procon_data.AUser
	collection := client.Database("api").Collection("users");
	filter := bson.D{{"email", string(e)}}
	if err := collection.FindOne(ctx, filter).Decode(&xdoc); err != nil {
	    return false,nil, err
    } else {
		bres, err := procon_utils.ValidateUserPassword(p, []byte(xdoc.Password))
	    if err != nil { return false,nil,err } else {  return bres, &xdoc, nil }
    }		    
}

func MongoGetUIComponent(component string, w http.ResponseWriter ) {
	var xdoc map[string]interface{}
	collection := client.Database("api").Collection("ui");		
	
	filter := bson.D{{"component", component}}
	
	if err  := collection.FindOne(ctx, filter).Decode(&xdoc); err != nil { fmt.Println(err) } else {
		json.NewEncoder(w).Encode(xdoc)  
	}
}

