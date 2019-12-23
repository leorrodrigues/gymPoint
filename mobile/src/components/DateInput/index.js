import React, { useMemo, useState } from 'react';
import { format } from 'date-fns';
import en from 'date-fns/locale/en-US';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {
	const [opened, setOpened] = useState(false);

	const dateFormatted = useMemo(
		() => format(date, "MMMM','dd 'of' yyyy", { locale: en }),
		[date]
	);

	return (
		<Container>
			<DateButton onPress={() => setOpened(true)}>
				<Icon name="event" color="#fff" size={20} />
				<DateText>{dateFormatted}</DateText>
			</DateButton>

			{opened && (
				<RNDateTimePicker
					value={date}
					onChange={(event, newDate) => {
						setOpened(false);
						if (newDate !== undefined) {
							onChange(newDate);
						}
					}}
					minimumDate={new Date()}
					locale="en"
					mode="date"
					display="spinner"
				/>
			)}
		</Container>
	);
}

DateInput.propTypes = {
	date: PropTypes.instanceOf(Date).isRequired,
	onChange: PropTypes.func.isRequired,
};
