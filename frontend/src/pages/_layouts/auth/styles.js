import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
	height: 100%;
	background: #ee4d64;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Container = styled.div`
	max-width: 400px;
	min-width: 400px;
	max-height: 500px;
	min-height: 500px;
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Content = styled.div`
	width: 100%;
	max-width: 315px;
	text-align: center;

	form {
		display: flex;
		flex-direction: column;
		margin: 10px 0 0;

		strong {
			font-size: 16px;
			display: flex;
			align-items: flex-start;
			margin: 15px 0 0;
			padding: 5px;
		}

		input {
			background: #fff;
			border: 1px solid #dddddd;
			border-radius: 4px;
			box-sizing: border-box;
			width: 300px;
			height: 40px;
			padding: 0 15px;
			color: #fff;
			margin: 0 0 10px;

			color: #000;

			&::placeholder {
				color: #999999;
				font-size: 16px;
			}
		}

		button {
			margin: 10px 0 0;
			height: 44px;
			background: #ee4d64;
			color: #fff;
			border: 0;
			border-radius: 4px;
			font-size: 16px;
			transition: background 0.2s;

			&:hover {
				background: ${darken(0.1, '#ee4d64')};
			}
		}

		a {
			color: #000;
			margin: 10px 0 0;
			font-size: 16px;
			opacity: 0.6;

			&:hover {
				opacity: 1;
			}
		}

		span {
			color: #fb6f91;
			align-self: flex-start;
			margin: 0 0 10px;
			font-weight: bold;
		}
	}
`;
