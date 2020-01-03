import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-aside.svg';

import { Container, Content, Logo, NavBar, NavPage, Profile } from './styles';

const pages = {
	students: { name: 'STUDENTS', route: '/students' },
	plans: { name: 'PLANS', route: '/plans' },
	registrations: { name: 'ENROLLMENTS', route: '/enrollments' },
	helpOrders: { name: 'ASSISTANCE REQUESTS', route: '/help-orders' },
};

export default function Header() {
	const dispatch = useDispatch();

	const profile = useSelector(state => state.user.profile);
	const activeNavItem = useSelector(state => state.nav.navItem);

	function handleSignOut() {
		dispatch(signOut());
	}

	return (
		<Container>
			<Content>
				<Logo>
					<img src={logo} alt="GymPoint" />
				</Logo>
				<NavBar>
					{Object.keys(pages).map(key => {
						const item = pages[key];

						return (
							<NavPage
								key={item.name}
								active={
									activeNavItem === item.name
										? 'true'
										: 'false'
								}
								to={item.route}>
								{item.name}
							</NavPage>
						);
					})}
				</NavBar>

				<aside>
					<Profile>
						<strong>{profile.name}</strong>
						<button type="button" onClick={handleSignOut}>
							Exit GymPoint
						</button>
					</Profile>
				</aside>
			</Content>
		</Container>
	);
}
