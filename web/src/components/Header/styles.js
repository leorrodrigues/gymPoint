import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div`
	background: #fff;
	padding: 0 30px;
`;

export const Content = styled.div`
	height: 64px;

	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	aside {
		display: flex;
		align-items: center;
		justify-self: flex-end;
	}
`;

export const Logo = styled.div`
	display: flex;
	align-items: center;
	height: 32px;
	margin: 20px 0;
	padding: 10px;

	border-right: 1px solid #eee;
`;

export const NavBar = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;

export const NavPage = styled(Link)`
	margin: 0 0 0 40px;

	color: ${props => (props.active === 'true' ? '#444444' : '#999999')};

	font-weight: bold;
	font-size: 14px;

	${props =>
		props.active === 'false' &&
		css`
			&:hover {
				color: ${darken(0.3, '#999999')};
			}
		`}
`;

export const Profile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	button {
		color: #ee4d64;

		background: none;
		border: 0;

		&:hover {
			color: ${darken(0.3, '#ee4d64')};
		}
	}
`;
