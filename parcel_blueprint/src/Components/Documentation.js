import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js';

const StyledDocumentation = styled.div`
`;

export function Documentation() {
	const { documentation } = useContext(AppContext)
	
	return(
		<StyledDocumentation>
			<div id="documentation-title">Documentation</div>
			{ documentation !== null &&
				<div id="documentation-path">{ documentation['path'] }</div>
			}
		</StyledDocumentation>
	)
}

