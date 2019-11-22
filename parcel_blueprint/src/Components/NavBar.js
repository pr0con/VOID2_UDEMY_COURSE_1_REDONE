import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js';

const StyledNavBar = styled.div`
	position: fixed;
	z-index: 2;
	
	width: 100vw;
	top: 0px;
	left: 0px;
	
	height: 6.5rem;
	box-shadow: 0 0 1px 1px rgba(20,23,28,.1),0 3px 1px 0 rgba(20,23,28,.1);
	
	font-size: 2rem;
	color: #505763;
	background: #fff;
	
	font-family: 'Hackman-Bold';
	
	#styled-navbar-content {
	    position: relative;
	    width: 1500px;
	    margin: 0 auto;
	    padding: 10px;
	    line-height: 4.5rem;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    
	    
	    #styled-navbar-content-icon {
			width: 4.5rem;
			height: 4.5rem;
			background: rgb(236,82,82);
			-webkit-mask: url('/icons/16px/code.svg') no-repeat center;
			mask: url('/icons/16px/code.svg') no-repeat center;	
			display: inline-block;		
		}
		#styled-navbar-content-title {
			margin-left: 1rem;
			margin-right: 1.5rem;
		}
		
		
		#navbar-search-input {
			color: #686f7a;
			background: #f2f3f5;
			border: 0px solid
			transparent !important;
			border-top-left-radius: 2px;
			border-bottom-left-radius: 2px;
			width: 46rem;
			margin-left: 3rem;
			text-indent: 1.5rem;		
		}
		#navbar-search-input-submit-btn {
			width: 4.5rem;
			height: 4.7rem;
			border-top-right-radius: 2px;
			border-bottom-right-radius: 2px;
			background: #f2f3f5;
			line-height: 4.5rem;
			
			svg {
				width: 3rem;
				height: 3rem;
				fill: rgb(236,82,82);
				position: relative;
				left: 50%;
				top: 50%;
				-webkit-transform: translate(-50%,-50%);
				-ms-transform: translate(-50%,-50%);
				transform: translate(-50%,-50%);
			}		
		}
		#navbar-search-input-submit-btn:hover {
			cursor: pointer;
			background: rgb(236,82,82);
			
			svg {
				fill: #fff;
			}
		}
		
		#navbar-divider {
			margin-left: 1.5rem;
			margin-right: 1.5rem;
			border-left: 1px solid #dedfe0;		
		}
					
	}
`;

import { Button } from './Button.js';

export function NavBar() {
	const { setModal } = useContext(AppContext);
	
	return(
		<StyledNavBar>
			<div id="styled-navbar-content" >
				<div id="styled-navbar-content-icon"></div>
				<div id="styled-navbar-content-title">Foo Demy2</div>
				<Button btype="icon-button" text="Resources" icon="/icons/20px/box.svg" />
				<input type="text" id="navbar-search-input" />
				<div id="navbar-search-input-submit-btn">
					<svg focusable="false" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path fill="none" d="M0 0h24v24H0z"></path></svg>
				</div>
				
				<Button btype="grey-button" text="An Awsome Button" icon="" />
				
				<div id="navbar-divider"></div>
				
				<Button btype="white-button" text="Login" icon="" onClick={(e) => setModal('login')} />
				<Button btype="red-button" text="Sign Up!" icon="" onClick={(e) => setModal('signup')} />
			</div>
		</StyledNavBar>
	)
}