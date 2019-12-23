import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
	email: Yup.string()
		.email('Insert a valid e-mail')
		.required('e-mail is required'),
	password: Yup.string().required('password is required'),
});

export default function SingIn() {
	const dispatch = useDispatch();
	const loading = useSelector(state => state.auth.loading);

	function handleSubmit({ email, password }) {
		dispatch(signInRequest(email, password));
	}

	return (
		<>
			<img src={logo} alt="GymPoint" />
			<Form schema={schema} onSubmit={handleSubmit}>
				<strong>YOUR E-MAIL</strong>
				<Input
					name="email"
					type="email"
					placeholder="example@email.com"
				/>
				<strong>YOUR PASSWORD</strong>
				<Input name="password" type="password" placeholder="********" />
				<button type="submit">
					{loading ? 'Loading...' : 'Login'}
				</button>
			</Form>
		</>
	);
}
