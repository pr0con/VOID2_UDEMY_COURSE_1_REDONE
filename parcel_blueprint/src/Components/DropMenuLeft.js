import React from 'react';
import styled from 'styled-components';

const StyledDropMenuLeft = styled.div`
	position: absolute;
	z-index: 4;
	top: 6.5rem;
	left: 18rem;
	min-width: 30rem;
	min-height: 10rem;
	border: none;
	border-bottom-left-radius: 2px;
	border-bottom-right-radius: 2px;
	border-top: 1px solid #e8e9eb;
	box-shadow: 0 4px 16px rgba(20,23,28,.25);
	color: #505763;
	font-size: 13px;
	background: #fff;
	padding: 15px 0 15px 0;
	
	&:after{
		right: 12px;
		left: 12px;
		border-color: transparent transparent #fff transparent;
		top: -12px;
		box-sizing: border-box;
		border-style: solid;
		border-width: 0 10px 13px;
		content: '' !important;
		height: 0;
		position: absolute;
		width: 0;	
	}
`;

export function DropMenuLeft() {
	return(
		<StyledDropMenuLeft>
			drop menu left
		</StyledDropMenuLeft>
	)
}

