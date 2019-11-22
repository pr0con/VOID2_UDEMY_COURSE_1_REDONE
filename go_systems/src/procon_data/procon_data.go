package procon_data

import(
	"fmt"
	
	"github.com/gorilla/websocket"
)

type Msg struct {
	Jwt string `json:"jwt"`
	Type string `json:"type"`
	Data string	`json:"data"`
}

func SendMsg(j string, t string, d string, c *websocket.Conn) {
	m := Msg{j, t, d};
	
	if err := c.WriteJSON(m); err != nil {
		fmt.Println(err)
	}

	//mm, _ := json.Marshal(m);
	//fmt.Println(string(mm));
}

type TryUser struct {
    Email    string     `json:"user"`
    Password string     `json:"password"`
}

type AUser struct {
   User     string 		`json:"user"`
   Role		string		`json:"role"`
   FullName string		`json:"fullname"`
   Password string		`json:"password"`   	
}



