import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../AppContext.js';

const StyledLogInModal = styled.div`
	position: fixed;
	z-index: 0;
	width: 100vw;
	height: 100vh;
	top: 0px;
	left: 0px;
	overflow: hidden;
	background-color: rgba(41,48,59,.8);
	z-index: 4;

	#login-center-dialog {
		position: relative;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%,-50%);
		-ms-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
		border-radius: 6px;
		background: #fff;
		color: #29303b;
		max-width: 380px;
		max-height: 500px;
		box-shadow: 0 0 1px 1px
		rgba(20,23,28,.1),0 3px 1px 0 rgba(20,23,28,.1);
		
		#login-center-dialog-header {
			border-bottom: solid 1px #dedfe0;
			border-top-left-radius: 6px;
			border-top-right-radius: 6px;
			color: #29303b;
			display: block;
			font-weight: 600;
			font-size: 20px;
			padding: 24px 24px 24px 24px;
			
			#login-center-dialog-header-text {
				display: inline-block;
			}
			#login-center-dialog-header-close {
				font-size: 3.6rem;
				display: inline-block;
				width: 20px;
				height: 20px;
				background:
				#686f7a;
				-webkit-mask: url('/icons/20px/cross.svg');
				mask: url('/icons/20px/cross.svg');
				float: right;
				top: 2px;
				position: relative;	
				
				&:hover {
					cursor:pointer;
				}					
			}		
		}
		#login-center-dialog-form {
			padding: 24px 24px 24px 24px;
			
			#login-errors {
				padding: 1.6rem;
				font-size: 1.5rem;
				border-radius: .2rem;
				border: 1px solid
				border-color: transparent;
				background-color: #faebeb;
				color: #521822;	
				margin-bottom: .5rem;		
			}
			
			#login-center-dialog-form-email-field,
			#login-center-dialog-form-password-field {
				display: inline-block;
				position: relative;
				
								
				input {
					border-radius: 5px;
					width: 100%;
					color:
					#29303b;
					font-size: 18px;
					height: auto;
					padding: 11px 60px 12px 40px;
					border: 1px solid
					#cacbcc;				
				}
			}
			#login-center-dialog-form-email-field:before {
				width: 1.8rem;
				height: 1.8rem;
				content: '';
				-webkit-mask: url('/icons/20px/envelope.svg');
				mask: url('/icons/20px/envelope.svg');
				position: absolute;
				top: 50%;
				left: 10px;
				-webkit-transform: translateY(-50%);
				-ms-transform: translateY(-50%);
				transform: translateY(-50%);
				background: #cacbcc;
			}
			#login-center-dialog-form-password-field:before {
				width: 1.8rem;
				height: 1.8rem;
				content: '';
				-webkit-mask: url('/icons/20px/lock.svg');
				mask: url('/icons/20px/lock.svg');
				position: absolute;
				top: 50%;
				left: 10px;
				-webkit-transform: translateY(-50%);
				-ms-transform: translateY(-50%);
				transform: translateY(-50%);
				background: #cacbcc;			
			}
			#submit-login-form-btn {
				width: 100%;
				height: 4.8rem;
				text-align: center;
				line-height: 4.8rem;
				font-size: 1.8rem;
				color: #fff;
				background-color: #ec5252;
				border: 1px solid transparent;
				    border-top-color: transparent;
				    border-right-color: transparent;
				    border-bottom-color: transparent;
				    border-left-color: transparent;
				border-radius: 2px;
				font-family: 'Hackman-Bold';	
				
				&:hover {
					color: #fff;
					background-color:
					#992337;
					border-color:
					transparent;
					cursor: pointer;
				}		
			}
			
			#login-center-dialog-form-password-field,
			#submit-login-form-btn {
				margin-top: .5rem;
			}
		}	
	}	
`;

export function LogInModal() {
	const { request, setModal, loginErrMsg } = useContext(AppContext);
	
	const [ e, setE ] = useState(''); //email
	const [ p, setP ] = useState(''); //password...	
	
	
	const handleSubmit = async() => {
		let login_user = {
			email: btoa(e),
			password: btoa(p),
		}
		
		request("vAr","login-user", JSON.stringify(login_user));		
	}
	
	return(
		<StyledLogInModal>
			<div id="login-center-dialog">
				<div id="login-center-dialog-header">
					<div id="login-center-dialog-header-text">Log In</div>
					<div id="login-center-dialog-header-close" onClick={(e) => setModal('none')} ></div>
				</div>
				
				<div id="login-center-dialog-form">
					{ loginErrMsg !== '' && <div id="login-errors">{ loginErrMsg }</div> }
				
					<span id="login-center-dialog-form-email-field"><input type="text" placeholder="Email" onChange={(e) => setE(e.target.value)}/></span>
					<span id="login-center-dialog-form-password-field"><input type="password" placeholder="Password" onChange={(e) => setP(e.target.value)}/></span>
					<div id="submit-login-form-btn" onClick={(e) => handleSubmit()}>Login</div>
				</div>
			</div>
		</StyledLogInModal>
	)	
}
