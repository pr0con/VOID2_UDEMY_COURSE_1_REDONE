import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import styled from 'styled-components';

//Hook based context :: from default function export
import AppProvider from './AppContext.js';
import { AppContext } from './AppContext.js';

const StyledApp = styled.div`
	#app-content {
		
		position:relative;
		top: 6.5rem;
		margin: 0 auto;
		
		width: 120rem;
		
		display: grid;
		grid-template-columns: 32rem 86.5rem;
		grid-column-gap: 1.5rem;
	}
`;

import { NavBar } from './NavBar.js';
import { Dashboard } from './Dashboard.js';
import { LogInModal } from './Modals/LogInModal.js';
import { SignUpModal } from './Modals/SignUpModal.js';

import { Loader } from './Loader.js';

import { Documentation } from './Documentation.js';
import { FileSystem } from './FileSystem.js';

export function App() {
	return(
		<StyledApp>
			<AppProvider>
				<AppContext.Consumer>
				{({ loading, modal, setDropMenu, frontEnd, backEnd }) => (
					<>
						<NavBar />
						 
						{ modal == 'login' && <LogInModal /> }
						{ modal == 'signup' && <SignUpModal /> }
						
						<div id="app-content" onMouseOver={ (e) => setDropMenu('none') } >
							<div id="app-content-left">
								<Documentation />
								<FileSystem forWhat="Front End" fileSystemData={frontEnd} />
								<FileSystem forWhat="Back End"  fileSystemData={backEnd} />
							</div>

							<div id="app-content-right">
								<Dashboard />
							</div>
						</div>
						
						{ loading === true && <Loader /> }
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