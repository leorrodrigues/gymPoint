import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
	height: 56px;
	padding: 5px;

	background: #ee4e62;
	border-radius: 4px;

	align-items: center;
	justify-content: center;

	/* width: 75%; */
`;

export const Text = styled.Text`
	color: #fff;
	font-weight: bold;
	font-size: 16px;
`;
