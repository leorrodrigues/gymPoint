import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	margin-left: 15px;
	margin-right: 15px;
	background: #fff;

	border-bottom-width: 1px;
	border-bottom-color: #e3e3e3;

	height: 7%;
`;

export const Logo = styled.Image``;

export const Student = styled.View`
	align-items: center;
`;

export const StudentText = styled.Text``;

export const LogOut = styled(RectButton)`
	background: #fff;

	padding: 5px;
	height: 25px;

	align-items: center;
	justify-content: center;
`;

export const LogOutText = styled.Text`
	color: #ee4e62;
	font-weight: bold;
	font-size: 16px;
`;
