import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js';

const StyledDatabases = styled.div`
	height: 0px;
	overflow: hidden;
	
	display: grid;
	grid-template-columns: 200px repeat(3, 1fr);
	grid-template-rows: 25px 100px 220px 25px;
	grid-gap: 20px;
	grid-row-gap: 10px;
	grid-column-gap: 10px;
	grid-gap: 10px;	
	
	& > div {
		border:1px dashed #aaa;
	}
	& > div.operations-layout-section.header {
		grid-column: 1 / -1;
	}
	& > div.operations-layout-section.content {
		grid-column: 2 / span 3;
		overflow:scroll;
	}
	& > div.operations-layout-section.sidebar {
		grid-column: 1 / 1;
		grid-row: 2 / span 2;
	}
	& > div.operations-layout-section.footer {
		grid-column: 1 / -1;
		display: flex;
	}	
	
	margin-bottom: 1rem;
	
	${({ display }) => display == true && `
		height: 40rem;
	`}	
`;

import { Button } from './Button.js';

export function Databases() {
	const { request, showDatabaseOps, mySqlDatabases, websocketClients } = useContext(AppContext)
	
	return(
		<StyledDatabases display={showDatabaseOps}>
			<div className="operations-layout-section header"></div>
				<div className="operations-layout-section box1">
					{ (mySqlDatabases !== null && mySqlDatabases.length > 0) && mySqlDatabases.map((mdb,i) => (
						<div key={i}>{ mdb }</div>	
					))}
				</div>
				<div className="operations-layout-section box2"></div>
				<div className="operations-layout-section box3"></div>
				<div className="operations-layout-section sidebar">
					{ websocketClients !== null && <div>Client Count: { websocketClients['CC'] }</div> }
					
					{ (websocketClients !== null && websocketClients['CIDS'].length > 0) && websocketClients['CIDS'].map((wsc, i) => (
						<div key={i}>
							{ wsc }
						</div>
					))}
				</div>
				<div className="operations-layout-section content">
					
				</div>
				<div className="operations-layout-section footer">
					<Button btype="blue" text="List Mysql Databases" onClick={(e) => request('noop','get-mysql-databases','noop') }/>
				</div>				
		</StyledDatabases>
	)
}