import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js';

const StyledDashboard = styled.div`

`;

import ReactJson from 'react-json-view';

export function Dashboard() {
	const appState = useContext(AppContext)
	const { rs } = useContext(AppContext)
	
	return(
		<StyledDashboard>
			<ReactJson src={appState} collapsed={true} />
			Ready State: { rs }
			
			
		</StyledDashboard>
	)
}