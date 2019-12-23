import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
	Return,
	ReturnText,
	Container,
	Content,
	ContentDiv,
	TextStrong,
	Text,
	Date,
} from './styles';

import Header from '~/components/Header';

// eslint-disable-next-line react/prop-types
export default function HelpOrderNew({ navigation }) {
	const { since, question, answer } = navigation.getParam('order');

	return (
		<>
			<Header />
			<Return onPress={() => navigation.goBack()}>
				<Icon name="chevron-left" size={30} color="#ee4e62" />
				<ReturnText>Return</ReturnText>
			</Return>
			<Container>
				<Content>
					<ContentDiv>
						<TextStrong>Question</TextStrong>
						<Date>{since}</Date>
					</ContentDiv>
					<Text>{question}</Text>
					<TextStrong>Answer</TextStrong>
					<Text>{answer || 'Not answered yet'}</Text>
				</Content>
			</Container>
		</>
	);
}
