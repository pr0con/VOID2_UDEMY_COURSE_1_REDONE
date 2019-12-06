import React, { useState, useContext } from 'react';
import styled from 'styled-components';

const StyledFileSystem = styled.div`
`;

export function FileSystem({ forWhat, fileSystemData }) {

	return(
		<StyledFileSystem>
			<div id="file-system-title">{ forWhat }</div>
			{ fileSystemData !== null &&
				<div id="file-system-path">{ fileSystemData['path'] }</div>
			}			
		</StyledFileSystem>
	)
}

