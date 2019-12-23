import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { formatRelative, parseISO } from 'date-fns';

import PropTypes from 'prop-types';
import api from '~/services/api';

import Header from '~/components/Header';

import {
	Container,
	NewCheckin,
	List,
	CheckinItem,
	CheckinText,
	CheckinDate,
} from './styles';

// eslint-disable-next-line react/prop-types
function CheckIn({ isFocused }) {
	const id = useSelector(state => state.auth.id);

	const [checkins, setCheckins] = useState([]);
	const [loading, setLoading] = useState(false);

	async function loadCheckins() {
		setLoading(true);

		const response = await api.get(`students/${id}/checkins`);

		const checkins_data = response.data;

		const actual_date = new Date();

		const formated = checkins_data.map((item, index) => ({
			...item,
			since: formatRelative(parseISO(item.createdAt), actual_date),
			index: index + 1,
		}));

		setCheckins(formated.reverse());
		setLoading(false);
	}

	useEffect(() => {
		if (isFocused) {
			loadCheckins();
		}
		//	eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFocused]);

	async function handleCheckin() {
		try {
			await api.post(`students/${id}/checkins`);

			Alert.alert('Success', 'Check-in made with success!');
			loadCheckins();
		} catch (error) {
			Alert.alert('You can only make 5 checkins in 5 consecutive days.');
		}
	}

	return (
		<>
			<Header />
			<Container>
				<NewCheckin onPress={handleCheckin}>New CheckIn</NewCheckin>
				{loading ? (
					<ActivityIndicator size="large" color="#999" />
				) : (
					<List
						data={checkins}
						keyExtractor={item => String(item.id)}
						renderItem={({ item }) => (
							<CheckinItem>
								<CheckinText>
									Check-in #{item.index}
								</CheckinText>
								<CheckinDate>{item.since}</CheckinDate>
							</CheckinItem>
						)}
					/>
				)}
			</Container>
		</>
	);
}

const AgendaTabBarIcon = ({ tintColor }) => (
	<Icon name="event" type="font-awesome" size={20} color={tintColor} />
);
AgendaTabBarIcon.propTypes = {
	tintColor: PropTypes.string.isRequired,
};

CheckIn.navigationOptions = {
	tabBarLabel: 'Checkins',
	tabBarIcon: AgendaTabBarIcon,
};

export default withNavigationFocus(CheckIn);
