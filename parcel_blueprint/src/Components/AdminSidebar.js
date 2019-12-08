import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js';

const StyledAdminSidebar = styled.div`
	#admin-sidebar-title {
		font-size: 1.5rem;	
	}
	
	& .vertical-menu-icon-link {
		display: flex;
		padding: 5px 15px;
		flex-direction: row;
		align-items: center;
		
		& .vertical-menu-icon-link-text {
			margin-left: 1rem;
			line-height: 2rem;
		}
		& .vertical-menu-icon-link-text:hover {
			cursor:pointer;
		}
	}
	
	& .vertical-menu-icon-link:hover .vertical-menu-icon-link-icon {
		background: rgb(236,82,82);
	}
	
	margin-bottom: 1rem;
`

const DynamicIcon = styled.div`
	background: #686f7a;
	width: 1.5rem;
	height: 1.5rem;
	mask: ${props => `url(${props.svgIconUrl}) no-repeat center;`});
	mask-size: 1.5rem;
`;


export function AdminSidebar() {
	const { adminSidebar, showDatabaseOps, setShowDatabaseOps } = useContext(AppContext);
	

	const doAction = async(action) => {
		switch(action) {
			case "users":
				break;
			case "interface":
				break;
			case "databases":
				setShowDatabaseOps(!showDatabaseOps);
				break;
			default:
				break;
		}
	}
	
	return(
		<StyledAdminSidebar>
			<div id="admin-sidebar-title" >Admintration</div>
			{ adminSidebar  != null && adminSidebar .map((el) =>
				<div className={el.type}>
					<DynamicIcon className={`${el.type}-icon`} svgIconUrl={`/icons/20px/${el.icon}.svg`}/><div className={`${el.type}-text`} onClick={(e) => doAction(el.action)}>{ el.text }</div>
				</div>
			)}

		</StyledAdminSidebar>
	)
}

