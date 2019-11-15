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