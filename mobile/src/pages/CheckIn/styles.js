import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
	flex: 1;
	padding: 30px;
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

export const CheckinItem = styled.View`
	background: #fff;

	flex-direction: row;

	padding: 20px;
	margin-top: 20px;

	border: 1px solid #ddd;
	border-radius: 4px;

	align-items: center;
	justify-content: space-between;
`;

export const CheckinText = styled.Text`
	font-size: 14px;
	font-weight: bold;
	color: #444;
`;

export const CheckinDate = styled.Text`
	font-size: 14px;
	color: #666;
`;
