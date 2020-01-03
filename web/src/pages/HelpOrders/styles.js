import styled from 'styled-components';
import { darken } from 'polished';
import Modal from 'react-modal';

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

		justify-content: space-between;
		align-items: center;
	}
`;

export const ListQuestions = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	background: #fff;
	padding: 25px;

	border-radius: 4px;

	table-layout: fixed;
	width: 100%;

	table {
		/* margin-left: 20px; */
		text-align: left;

		border-collapse: collapse;
		width: 95%;

		th {
			padding-bottom: 12px;

			font-size: 16px;
			font-weight: bold;
		}

		td {
			font-size: 16px;
			color: #666666;
			padding-top: 15px;
			padding-bottom: 15px;
		}

		td:nth-child(1) {
			min-width: 15%;
		}

		td:nth-child(2) {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 1px;
		}

		td:nth-child(3) {
			text-align: right;
			min-width: 7%;
		}

		tr + tr {
			border-bottom: 1px solid #eeeeee;
		}

		tr:last-child {
			border-bottom: 0px;
		}
	}
`;

export const AnswerButton = styled.button`
	border: none;
	background: none;
	color: #4d85ee;

	&:hover {
		color: ${darken(0.3, '#4d85ee')};
	}
`;

export const EmptyList = styled.div`
	display: flex;

	align-items: center;
	justify-content: center;

	margin-top: 34px;
	padding: 15px;
	margin-left: 20px;

	strong {
		font-size: 26px;
		font-weight: bold;
	}
`;

export const AnswerModal = styled(Modal).attrs({
	style: { overlay: { background: 'rgba(0, 0, 0, 0.5)' } },
})`
	min-width: 50%;

	height: 40%;
	position: absolute;
	top: 25%;
	left: 25%;

	display: flex;
	flex-direction: column;

	background: #fff;

	padding: 30px;
	border-radius: 4px;

	span {
		margin-bottom: 10px;
		color: #444;
		font-size: 16px;
		line-height: 26px;

		strong {
			font-size: 20;
			font-weight: bold;
		}
	}

	form {
		display: flex;
		flex-direction: column;

		textarea {
			height: 127px;
			line-height: 18px;
			border: 1px solid #dddddd;
			background: none;
			resize: none;
			padding: 10px;
			border-radius: 4px;
			font-size: 16px;
		}

		div {
			display: flex;
			flex-direction: row;

			align-items: center;
			justify-content: center;

			button {
				height: 100%;
				width: 100%;
				margin-top: 21px;
				margin-left: 20px;
				margin-right: 20px;
				background: #de3b3b;
				color: #fff;
				font-size: 16px;
				font-weight: bold;
				border-radius: 4px;
			}
		}
	}
`;

export const Paginate = styled.div`
	display: flex;

	align-items: center;
	justify-content: center;

	padding: 15px;

	font-weight: bold;
`;

export const PaginateButton = styled.button.attrs(props => ({
	disabled:
		(props.page === 1 && props.type === 'prev') ||
		(props.type === 'next' && props.end === 'true'),
}))`
	margin: 20px;

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

	&[disabled] {
		cursor: not-allowed;
		opacity: 0.6;
	}
`;
