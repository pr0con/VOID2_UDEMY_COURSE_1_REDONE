import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

//Hook based context :: from default function export
import AppProvider from './AppContext.js';

const StyledApp = styled.div`

`;

import { NavBar } from './NavBar.js';
import { Dashboard } from './Dashboard.js';

export function App() {
	return(
		<StyledApp>
			<AppProvider>
				<NavBar />
				<Dashboard />
			</AppProvider>
		</StyledApp>
	)
}

if (document.getElementById('react_root')) {
    ReactDOM.render(<App />, document.getElementById('react_root'));
}