import React, { useState, useContext } from 'react';
import styled from 'styled-components';

const StyledFileSystem = styled.div`
	#file-system-title {
		font-size: 1.5rem;	
	}
	
	& .file-system-browser-level-one {
		display:flex;
		
		& .file-system-browser-level-one-icon { 
			width: 2rem;
			height: 2rem;
			mask: url('/icons/20px/document.svg');		
			background: #5c7080;
		}
		& .file-system-browser-level-one-icon.directory  {
			mask: url('/icons/20px/folder-close.svg');
		}
		& .file-system-browser-level-one-text {
			display: inline-block;
			margin-left: .5rem;
			font-size: 1.2rem;
			padding-top: .5rem;
		}
	}
	& .file-system-browser-level-one:hover {
		cursor:pointer;
	}	
	& .file-system-browser-level-one:hover .file-system-browser-level-one-icon {
		background: rgb(236,82,82);
	}
	
	
		
	
	& .file-system-browser-level-two-nodes {	
		& .file-system-browser-level-two-node {
			display: flex;
			margin-left: 2rem;
			
			& .file-system-browser-level-two-node-icon { 
				width: 2rem;
				height: 2rem;
				mask: url('/icons/20px/document.svg');	
				background: #5c7080;
			}
			& .file-system-browser-level-two-node-icon.directory  {
				mask: url('/icons/20px/folder-close.svg');
			}
			& .file-system-browser-level-two-node-text {
				display: inline-block;
				margin-left: .5rem;
				font-size: 1.2rem;
				padding-top: .5rem;
			}
		}
		& .file-system-browser-level-two-node:hover {
			cursor:pointer;
		}	
		& .file-system-browser-level-two-node:hover .file-system-browser-level-two-node-icon {
			background: rgb(236,82,82);
		}	
		
		& .file-system-browser-level-three-nodes {
			& .file-system-browser-level-three-node {
				display: flex;
				margin-left: 4.5rem;
				
				& .file-system-browser-level-three-node-icon { 
					width: 2rem;
					height: 2rem;
					mask: url('/icons/20px/document.svg');	
					background: #5c7080;
				}
				& .file-system-browser-level-three-node-icon.directory  {
					mask: url('/icons/20px/folder-close.svg');
				}
				& .file-system-browser-level-three-node-text {
					display: inline-block;
					margin-left: .5rem;
					font-size: 1.2rem;
					padding-top: .5rem;
				}
			}
			& .file-system-browser-level-three-node:hover {
				cursor:pointer;
			}	
			& .file-system-browser-level-three-node:hover .file-system-browser-level-three-node-icon {
				background: rgb(236,82,82);
			}
			
			& .file-system-browser-level-four-nodes {
				& .file-system-browser-level-four-node {
					display: flex;
					margin-left: 7rem;
					
					& .file-system-browser-level-four-node-icon { 
						width: 2rem;
						height: 2rem;
						mask: url('/icons/20px/document.svg');	
						background: #5c7080;
					}
					& .file-system-browser-level-four-node-icon.directory  {
						mask: url('/icons/20px/folder-close.svg');
					}
					& .file-system-browser-level-four-node-text {
						display: inline-block;
						margin-left: .5rem;
						font-size: 1.2rem;
						padding-top: .5rem;
					}
				}
				& .file-system-browser-level-four-node:hover {
					cursor:pointer;
				}	
				& .file-system-browser-level-four-node:hover .file-system-browser-level-four-node-icon {
					background: rgb(236,82,82);
				}			
			}	
		}		
	}
	
	margin-bottom: 1rem;
	
`;

export function FileSystem({ forWhat, fileSystemData, setPrismDataPath, request }) {

	const getDocument = (p) => {
		setPrismDataPath(p);
		request('noop','return-fs-path-data', p);
	}

	return(
		<StyledFileSystem>
			<div id="file-system-title">{ forWhat }</div>
			{ fileSystemData !== null && <div id="file-system-path">{ fileSystemData['path'] }</div> }
			
			{ (fileSystemData !== null && fileSystemData['children'].length > 0) && fileSystemData['children'].map((fsn,index) => (
				<>
					
					<div className="file-system-browser-level-one">
						<span className={fileSystemData['children'][index]['info']['is_dir'] ? `file-system-browser-level-one-icon directory` : `file-system-browser-level-one-icon`}></span>
						<span className="file-system-browser-level-one-text"  onClick={(e) => getDocument(fsn['path'])}>{ fileSystemData['children'][index]['info']['name'] }</span>
					</div>				
					<div className="file-system-browser-level-two-nodes">
						{ fsn['children'].length > 0 && fsn['children'].map((fsnc,index) => (
							<>
								<div className="file-system-browser-level-two-node">
									<span className={ fsn['children'][index]['info']['is_dir'] ? `file-system-browser-level-two-node-icon directory` : `file-system-browser-level-two-node-icon`}></span>
									<span className="file-system-browser-level-two-node-text"  onClick={(e) => getDocument(fsnc['path'])}>{ fsnc['info']['name'] }</span>								
								</div>
								<div className="file-system-browser-level-three-nodes">
									{ fsnc['children'].length > 0 && fsnc['children'].map((fsncc,index) => (
										<>
											<div className="file-system-browser-level-three-node">
												<span className={ fsnc['children'][index]['info']['is_dir'] ? `file-system-browser-level-three-node-icon directory` : `file-system-browser-level-three-node-icon`}></span>
												<span className="file-system-browser-level-three-node-text"  onClick={(e) => getDocument(fsncc['path'])}>{ fsncc['info']['name'] }</span>								
											</div>
											<div className="file-system-browser-level-four-nodes">
												{ fsncc['children'].length > 0 && fsncc['children'].map((fsnccc, index) => (															
													<div className="file-system-browser-level-four-node">
														<span className={ fsncc['children'][index]['info']['is_dir'] ? `file-system-browser-level-four-node-icon directory` : `file-system-browser-level-four-node-icon`}></span>
														<span className="file-system-browser-level-four-node-text"  onClick={(e) => getDocument(fsnccc['path'])}>{ fsnccc['info']['name'] }</span>								
													</div>
												))}
											</div>
										</>
									))}
								</div>							
							</>
						))}
					</div>
				</>
			))}			
		</StyledFileSystem>
	)
}

