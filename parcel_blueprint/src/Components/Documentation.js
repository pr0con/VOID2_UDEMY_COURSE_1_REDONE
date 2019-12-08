import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js';

const StyledDocumentation = styled.div`
	#documentation-title {
		font-size: 1.5rem;
	}
	
	#documentation-path {
		font-style: italic;
	}
	
	& .file-system-documentation-level-one {
		display:flex;
		
		& .file-system-documentation-level-one-index { 
			font-size: 2rem;
			line-height: 2rem;
		}
		& .file-system-documentation-level-one-text {
			display: inline-block;
			margin-left: .5rem;
			font-size: 1.2rem;
			padding-top: .5rem;
		}
	}
	
	& .file-system-documentation-level-two-nodes {
		& .file-system-documentation-level-two-node {
			display: flex;
			margin-left: 2rem;
			
			& .file-system-documentation-level-two-node-index {
				font-size: 2rem;
				line-height: 2rem;
			}
			& .file-system-documentation-level-two-node-text {
				display: inline-block;
				margin-left: .5rem;
				font-size:1.2rem;
				padding-top: .5rem;	
			}	
		}
		& .file-system-documentation-level-two-node:hover {
			cursor:pointer;
		}
	}
	
	margin-bottom: 1rem;	

`;

export function Documentation() {
	const { documentation, setPrismDataPath, request } = useContext(AppContext)


	const getDocument = (p) => {
		setPrismDataPath(p);
		request('noop','return-fs-path-data', p);
	}

	const LevelOneAlias = ['A','B','C','D'];	
	
	return(
		<StyledDocumentation>
			<div id="documentation-title">Documentation</div>
				{ documentation !== null && <div id="documentation-path">{ documentation['path'] }</div> }
				
				{ (documentation !== null && documentation['children'].length > 0) && documentation['children'].map((fsn,index) => (
					<>
						
						<div className="file-system-documentation-level-one">
							<span className="file-system-documentation-level-one-index">{ LevelOneAlias[index] }.</span>
							<span className="file-system-documentation-level-one-text">{ documentation['children'][index]['info']['name'] }</span>
						</div>
						<div className="file-system-documentation-level-two-nodes">
							{ fsn['children'].length > 0 && fsn['children'].map((fsnc,index) => (
								<div className="file-system-documentation-level-two-node">
									<span className="file-system-documentation-level-two-node-index">{ index + 1 }.</span>
									<span className="file-system-documentation-level-two-node-text" onClick={(e) => getDocument(fsnc['path'])}>{ fsnc['info']['name'] }</span>
								</div>
							))}
						</div>
					</>
				))}				
		</StyledDocumentation>
	)
}

