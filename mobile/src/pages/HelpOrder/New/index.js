import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
	Container,
	Return,
	ReturnText,
	Text,
	SubmitText,
	SubmitButton,
} from './styles';
import api from '~/services/api';

import Header from '~/components/Header';

// eslint-disable-next-line react/prop-types
export default function HelpOrderNew({ navigation }) {
	const id = useSelector(state => state.auth.id);
	const [order, setOrder] = useState('');

	async function handleSubmitOrder() {
		if (order === '') {
			Alert.alert('Error in submit the order', 'The answer is requested');
			return;
		}
		try {
			await api.post(`students/${id}/help-orders`, { question: order });
			navigation.navigate('HelpOrderList');
		} catch (e) {
			Alert.alert('Error in submit the order', 'Try again later');
		}
	}

	return (
		<>
			<Header />
			<Return onPress={() => navigation.goBack()}>
				<Icon name="chevron-left" size={30} color="#ee4e62" />
				<ReturnText>Return</ReturnText>
			</Return>

			<Container>
				<Text>Do you need any help?</Text>
				<Text>Write to us!</Text>
				<SubmitText
					multiline
					placeholder="What's your question?"
					value={order}
					onChangeText={setOrder}
				/>
				<SubmitButton onPress={handleSubmitOrder}>
					Send help order
				</SubmitButton>
			</Container>
		</>
	);
}
