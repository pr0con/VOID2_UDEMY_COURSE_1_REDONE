import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
export const AppContext = createContext();

/*Array Export Method
<AppContext.Provider value={[
	test, setTest,
]}>
*/

export default function(props) {
	const [ test, setTest ] = useState('hello world');
	
	const [ rs, setRs ] = useState(0);
	const [ ws, setWs ] = useState(null); 
	
	const [ wsId, setWsId ] = useState('');
	const [ jwt, setJwt ] = useState(null);
		
	const request = async (jwt,type,data) => {
		let payload = {
			jwt,
			type,
			data
		};
		ws.send(JSON.stringify(payload));
	}	
	
	const heartbeat = async (ws) => { 		
		setTimeout(
		    function() {
				//console.log(ws.readyState);
				/*  0 	CONNECTING 	Socket has been created. The connection is not yet open.
					1 	OPEN 	The connection is open and ready to communicate.
					2 	CLOSING 	The connection is in the process of closing.
					3 	CLOSED 	The connection is closed or couldn't be opened.	
				*/
					
				if(rs !== ws.readyState) {	    
					setRs(ws.readyState)			
			    }
		        heartbeat(ws);
		    }
		    .bind(this),
		    1000
		);
	}		

	const configureWebsocket = async() => {
		ws.onopen = function(open_event) {	
			
			ws.onmessage = function(event) {
				console.log(event);
				let tjo = JSON.parse(event.data);	
				switch(tjo['type']) {
					case "server-ws-connect-success-msg":
						setWsId(tjo['data']);				
						break;
					case "server-ws-connect-success-jwt":
						setJwt(tjo['data']);
						request(tjo['data'],'test-jwt-message','noop');
						break;
					default:
						break;
				}
			}
			ws.onclose = function(close_event) {
				console.log(close_event);
			}
			
			ws.onerror = function(error_event) {
				console.log(error_event);
			}
			
			request('^vAr^','register-client-msg','noop');
		}		
	}
	
	useEffect(() => {		
		if(ws === null) { setWs(new WebSocket('wss://void.pr0con.com:1200/ws')); }
		if(ws !== null && rs === 0 ) { configureWebsocket(); heartbeat(ws); }		
	}, [ws,rs])	
	
	return(
		<AppContext.Provider value={{
			test, setTest,
			rs,
			request,
			wsId,
			jwt,
		}}>
			{ props.children }
		</AppContext.Provider>
	)
}
