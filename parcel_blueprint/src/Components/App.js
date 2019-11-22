import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

//Hook based context :: from default function export
import AppProvider from './AppContext.js';
import { AppContext } from './AppContext.js';

const StyledApp = styled.div`

`;

import { NavBar } from './NavBar.js';
import { Dashboard } from './Dashboard.js';
import { LogInModal } from './Modals/LogInModal.js';
import { SignUpModal } from './Modals/SignUpModal.js';

export function App() {
	return(
		<StyledApp>
			<AppProvider>
				<AppContext.Consumer>
				{({ modal }) => (
					<>
						<NavBar />
						<Dashboard /> 
						{ modal == 'login' && <LogInModal /> }
						{ modal == 'signup' && <SignUpModal /> }
					</>
				)}
				</AppContext.Consumer>
			</AppProvider>
		</StyledApp>
	)
}

if (document.getElementById('react_root')) {
    ReactDOM.render(<App />, document.getElementById('react_root'));
}