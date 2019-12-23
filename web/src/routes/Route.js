import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { updateActiveNavigation } from '~/store/modules/nav/actions';

import { store } from '~/store';

export default function RouteWrapper({
	component: Component,
	isPrivate,
	navItem,
	...rest
}) {
	const dispatch = useDispatch();
	const { signed } = store.getState().auth;

	if (!signed && isPrivate) {
		return <Redirect to="/" />;
	}

	if (signed && !isPrivate) {
		return <Redirect to="/students" />;
	}

	const Layout = signed ? DefaultLayout : AuthLayout;

	if (navItem !== '') {
		dispatch(updateActiveNavigation(navItem));
	}

	return (
		<Route
			{...rest}
			render={props => (
				<Layout>
					<Component {...props} />
				</Layout>
			)}
		/>
	);
}

RouteWrapper.propTypes = {
	isPrivate: PropTypes.bool,
	navItem: PropTypes.string,
	component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
		.isRequired,
};

RouteWrapper.defaultProps = {
	isPrivate: false,
	navItem: 'STUDENT',
};
