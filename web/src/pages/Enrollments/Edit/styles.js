import styled from 'styled-components';
import { darken } from 'polished';
import { Form } from '@rocketseat/unform';

export const Container = styled.div`
	max-width: 1200px;
	margin: 50px auto;

	display: flex;
	flex-direction: column;
`;

export const TopItems = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-bottom: 25px;

	strong {
		color: #444444;
		font-size: 24px;
		font-weight: bold;
		margin: 0 15px;
	}

	div {
		display: flex;
		flex-direction: row;

		align-items: center;
		justify-content: center;
	}
`;

export const ReturnButton = styled.button`
	color: #fff;
	font-weight: bold;

	background: #cccccc;
	width: 142px;
	height: 36px;
	border: 0;
	border-radius: 4px;

	&:hover {
		color: ${darken(0.3, '#CCCCCC')};
	}
`;

export const SaveButton = styled.button`
	margin-left: 20px;

	color: #fff;
	font-weight: bold;

	background: #ee4d64;
	width: 142px;
	height: 36px;
	border: 0;
	border-radius: 4px;

	&:hover {
		color: ${darken(0.3, '#ee4d64')};
	}
`;

export const RegistryForm = styled(Form)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background: #fff;
	width: 100%;

	padding: 25px;

	label {
		margin-top: 25px;

		display: flex;
		flex-direction: column;
		justify-content: center;

		width: 85%;

		color: #444444;
		font-size: 14px;
		font-weight: bold;

		padding: 5px;
	}

	input {
		border: 1px solid #dddddd;
		border-radius: 4px;
		margin-top: 8px;
		padding: 20px;
		width: 100%;
	}

	div {
		display: flex;
		flex-direction: row;

		width: 85%;

		justify-content: space-between;
	}
`;
