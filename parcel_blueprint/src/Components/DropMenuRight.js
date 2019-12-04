import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from './AppContext.js';

const StyledDropMenuRight = styled.div`
	position: absolute;
	z-index: 4;
	top: 6.5rem;
	right: 418px;
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

	font-family: 'Hackman';
	-moz-osx-font-smoothing: grayscale;
	
	&:after {
		left: auto;
		right: 12px;
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
	
	.text-link-item {
		height: 4.2rem;
		color: #007791;
		font-size: 1.5rem;
		font-weight: 600;
		padding: 10px 22px;
		width: 100%;
		position: relative;
		line-height: 2.2rem;
	}
	.text-link-item:hover {
		background: #f2f3f5;
		cursor:pointer;
	}	
`;

const DynamicIcon = styled.span`
	display:inline-block;
	background: #a1a7b3;
	width: 2rem;
	height: 2rem;
	mask: ${props => `url(${props.svgIconUrl}) no-repeat center center;`});
	mask-size: 2rem;
	margin-right: 1.5rem;
`;

export function DropMenuRight() {
	const { dropMenuRight, setDropMenu, doLogOut } = useContext(AppContext)

	const doAction = async(action, parameter) => {
		switch(action) {
			case "log-out":
				doLogOut();
				setDropMenu('none');
				break;	
			default:
				break;
		}
	}
	
	return(
		<StyledDropMenuRight>	
			{ (dropMenuRight !== null && dropMenuRight.length > 0) && dropMenuRight.map((el, i) => (
				<div key={i} className={el.type} onClick={(e) => doAction(el.action, el.parameter)}><DynamicIcon svgIconUrl={`/icons/20px/${el.icon}.svg`} />{ el.text }</div>
			))}
		</StyledDropMenuRight>
	)
}