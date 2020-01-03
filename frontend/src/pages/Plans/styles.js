import styled from 'styled-components';
import { darken } from 'polished';

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
	button {
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
	}

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

	input {
		margin-left: 25px;

		background: #ffffff;
		border: 1px solid #dddddd;
		box-sizing: border-box;
		border-radius: 4px;
		height: 36px;
		padding-left: 25px;
	}
`;

export const ListPlans = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	background: #fff;
	padding: 25px;

	border-radius: 4px;

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

		th:nth-child(3) {
			text-align: center;
		}

		td {
			font-size: 16px;
			color: #666666;
			padding-top: 15px;
			padding-bottom: 15px;
		}

		td:nth-child(3),
		td:nth-child(4),
		td:nth-child(5) {
			text-align: center;
		}

		tr + tr {
			border-bottom: 1px solid #eeeeee;
		}

		tr:last-child {
			border-bottom: 0px;
		}
	}
`;

export const EditButton = styled.button`
	border: none;
	background: none;
	color: #4d85ee;

	&:hover {
		color: ${darken(0.3, '#4d85ee')};
	}
`;

export const DeleteButton = styled.button`
	border: none;
	background: none;
	color: #de3b3b;

	&:hover {
		color: ${darken(0.3, '#de3b3b')};
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
