import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';

import { formatRelative, parseISO } from 'date-fns';

import api from '~/services/api';

import Header from '~/components/Header';

import {
	Container,
	NewCheckin,
	List,
	OrderItem,
	OrderHeader,
	Answered,
	OrderDate,
	OrderText,
} from './styles';

// eslint-disable-next-line react/prop-types
function HelpOrderList({ navigation, isFocused }) {
	const id = useSelector(state => state.auth.id);

	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);

	async function loadOrders() {
		setLoading(true);

		const response = await api.get(`students/${id}/help-orders`);

		const actual_date = new Date();

		const formated = response.data.map(item => ({
			...item,
			since: formatRelative(parseISO(item.createdAt), actual_date),
		}));

		setOrders(formated.reverse());
		setLoading(false);
	}

	useEffect(() => {
		if (isFocused) {
			loadOrders();
		}
		//	eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFocused]);

	function handleNewOrder() {
		navigation.navigate('HelpOrderNew');
	}

	function handleShowOrder(order) {
		navigation.navigate('HelpOrderShow', { order });
	}

	return (
		<>
			<Header />
			<Container>
				<NewCheckin onPress={handleNewOrder}>New Help Order</NewCheckin>
				{loading ? (
					<ActivityIndicator size="large" color="#999" />
				) : (
					<List
						data={orders}
						keyExtractor={item => String(item._id)}
						renderItem={({ item }) => (
							<OrderItem onPress={() => handleShowOrder(item)}>
								<OrderHeader>
									<Answered answered={item.answer_at}>
										{item.answer_at
											? 'Answered'
											: 'Without answer'}
									</Answered>
									<OrderDate>{item.since}</OrderDate>
								</OrderHeader>
								<OrderText numberOfLines={3}>
									{item.question}
								</OrderText>
							</OrderItem>
						)}
					/>
				)}
			</Container>
		</>
	);
}

export default withNavigationFocus(HelpOrderList);
