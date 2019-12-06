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
	const [ jwt, setJwt ] = useState("^vAr^");
	const [ user, setUser ] = useState('');
	const [ verifiedJwt, setVerifiedJwt ] = useState(null);
	
	const [ modal, setModal ] = useState('none');
	const [ loginErrMsg, setLoginErrMsg ] = useState('');
	
	const [ loading, setLoading ] = useState(true);
	
	const [ dropMenu, setDropMenu ] = useState('none');
	
	const [ dropMenuLeft, setDropMenuLeft ] = useState(null);
	const [ dropMenuRight, setDropMenuRight ] = useState(null);
	
	
	const [ backEnd, setBackEnd ] = useState(null);
	const [ frontEnd, setFrontEnd ] = useState(null);
	const [ documentation, setDocumentation ] = useState(null);
	
	const [ prismData, setPrismData ] = useState('Default Prism Data');
	const [ prismDataPath, setPrismDataPath ] = useState('Welcome Message....');
	
	
	
			
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
						
						request('^vAr^','get-fs-path','/var/www/VFS/documentation');
						request('^vAr^','get-fs-path','/var/www/VFS/frontend_code');
						request('^vAr^','get-fs-path','/var/www/VFS/backend_code');
										
						break;
					case "server-ws-connect-success-jwt":
						setJwt(tjo['jwt']);
						let usr = JSON.parse(tjo['data']);
						setUser(usr);
						request(tjo['jwt'],'validate-jwt','noop');
						setModal('none');
						break;
					case "server-ws-connect-login-failure":
						setLoginErrMsg(tjo['data']);
						break;
					case "user-alredy-exists":
						alert("Handle Me: user already exists");
						break;
					case "user-created-successfully":
						setModal('none');
						break;
					case "server-ws-connect-jwt-verified":
						setVerifiedJwt(true);
						break;
					case "server-ws-connect-stored-jwt-verified":
						setVerifiedJwt(true);
						setJwt(window.localStorage.getItem('Pr0conJwt'));
						let storedUser = window.localStorage.getItem('User')
						setUser(JSON.parse(storedUser));	
						setLoading(false);						
						break;
					case "stored-jwt-token-invalid":
						setJwt("^vAr^");
						setUser(null);
						setLoading(false);
						if(window.localStorage.getItem('Pr0conJwt') !== null) { window.localStorage.removeItem('Pr0conJwt');  }
						break;
					
					default:
						break;
				}
				
				switch(tjo['path']) {
					case "/var/www/VFS/frontend_code":
						setFrontEnd(tjo);
						break;
					case "/var/www/VFS/backend_code":
						setBackEnd(tjo)
						break
					case "/var/www/VFS/documentation":
						setDocumentation(tjo)
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
	
	useEffect(() => {
	    if (jwt !== '^vAr^' && verifiedJwt) { 
		    console.log("JWT has been verified..."+verifiedJwt); 
		    window.localStorage.setItem('Pr0conJwt',jwt); 
		    
		    //extract and store user...
		    window.localStorage.setItem('User',JSON.stringify(user));
		}		
	},[verifiedJwt])
	
	useEffect(() => {
		if(rs === 1 ) {
			let storedJwt = window.localStorage.getItem('Pr0conJwt');
			if(storedJwt !== null) {
				let psjwt = JSON.parse(atob(storedJwt.split('.')[1]));
				let exp = new Date(psjwt['exp'] * 1000).toUTCString();
				let now = new Date(Date.now()).toUTCString();
				console.log(now);
				console.log(exp);
				if(exp > now) {
					console.log('Stored Jwt Good');
					request(storedJwt,'validate-stored-jwt','noop');
				}
				if(exp < now) {
					setLoading(false);
					window.localStorage.removeItem('Pr0conJwt'); 
				}
			} else if (storedJwt === null) {
				setLoading(false);
			}
		}		
	},[rs])	
	
	const doLogOut = async() => {
		setJwt('^vAr^');
		setUser(null);
		setVerifiedJwt(null)
		window.localStorage.removeItem('Pr0conJwt'); 
	}	
	
	useEffect(() => {
		if (loading === false) {
			const fetchData = async () => {
				const resL = await axios('https://void.pr0con.com:1200/rest/api/ui/navbar-drop-menu-resources');
				const resR = await axios('https://void.pr0con.com:1200/rest/api/ui/navbar-drop-menu-profile');
				
				setDropMenuLeft(resL.data.elements);
				setDropMenuRight(resR.data.elements);
				
			}
			fetchData();
		}
	},[loading]);
	
	return(
		<AppContext.Provider value={{
			test, setTest,
			rs,
			request,
			wsId,
			jwt,
			user,
			modal, 
			setModal,
			loginErrMsg,
			loading,
			verifiedJwt,
			
			dropMenu, 
			setDropMenu,
			
			dropMenuLeft,
			dropMenuRight, 
			
			doLogOut,
			
			frontEnd,
			backEnd,
			documentation,
			
			prismData,
			prismDataPath,
		}}>
			{ props.children }
		</AppContext.Provider>
	)
}
