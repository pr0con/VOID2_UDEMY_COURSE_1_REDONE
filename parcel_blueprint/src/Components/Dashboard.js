import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js';

const StyledDashboard = styled.div`
	padding-top: 1.5rem;
`;

import ReactJson from 'react-json-view';
import { Pty } from './Pty.js';
import { Prism } from './Prism.js';

export function Dashboard() {
	const appState = useContext(AppContext)
	const { rs, prismDataPath } = useContext(AppContext)
	
	return(
		<StyledDashboard>			
			<Pty />
			
			<div id="prism-path">{prismDataPath}</div>
			<Prism />
			
			<ReactJson src={appState} collapsed={true} />
			Ready State: { rs }			
		</StyledDashboard>
	)
}