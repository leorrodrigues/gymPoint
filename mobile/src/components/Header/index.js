import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-aside.png';

import {
	Container,
	Logo,
	Student,
	StudentText,
	LogOut,
	LogOutText,
} from './styles';

export default function Header() {
	const dispatch = useDispatch();
	const name = useSelector(state => state.auth.name);

	function handleLogOut() {
		dispatch(signOut());
	}

	return (
		<Container>
			<Logo source={logo} />
			<Student>
				<StudentText>Welcome {name}!</StudentText>
				<LogOut onPress={handleLogOut}>
					<LogOutText>Logout gympoint</LogOutText>
				</LogOut>
			</Student>
		</Container>
	);
}
