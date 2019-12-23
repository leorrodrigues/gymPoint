import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
	flex: 1;
	padding: 30px;
	background: #fafafa;
`;

export const NewCheckin = styled(Button)`
	font-size: 20px;
	font-weight: bold;
	align-self: center;
	margin-top: 30px;

	align-self: stretch;
`;

export const List = styled.FlatList.attrs({
	showsVerticalScrollIndicator: false,
})`
	margin-top: 20px;
`;

export const OrderItem = styled(TouchableOpacity)`
	justify-content: space-between;

	padding: 10px;
	margin-top: 20px;

	border: 1px solid #ddd;
	border-radius: 4px;

	background: #fff;
`;

export const OrderHeader = styled.View`
	flex-direction: row;

	justify-content: space-between;

	padding: 10px;
`;

export const Answered = styled.Text`
	font-size: 14px;
	font-weight: bold;

	color: ${props => (props.answered ? '#42CB59' : '#999')};
`;

export const OrderDate = styled.Text`
	font-size: 14px;
	color: #666;
`;

export const OrderText = styled.Text`
	padding-left: 10px;
	font-size: 14px;
	color: #666;
`;
