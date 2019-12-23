import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
	const dispatch = useDispatch();

	const [id, setId] = useState('');

	const loading = useSelector(state => state.auth.loading);

	function handleSubmit() {
		dispatch(signInRequest(id));
	}

	return (
		<Container>
			<Image source={logo} />

			<Form>
				<FormInput
					autoCorrect={false}
					autoCapitalize="none"
					placeholder="Enter your student ID"
					returnKeyType="send"
					onSubmitEditing={handleSubmit}
					value={id}
					onChangeText={setId}
				/>

				<SubmitButton loading={loading} onPress={handleSubmit}>
					Access
				</SubmitButton>
			</Form>
		</Container>
	);
}
