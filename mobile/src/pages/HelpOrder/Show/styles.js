import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.SafeAreaView`
	flex: 1;
	padding: 30px;
	margin-bottom: 30px;
`;

export const Content = styled.View`
	padding: 20px;

	background: #fff;
	border: 1px solid #ddd;
`;

export const ContentDiv = styled.View`
	flex-direction: row;
	justify-content: space-between;

	margin-top: 10px;
`;

export const Return = styled(TouchableOpacity)`
	margin-top: 15px;
	margin-left: 10px;

	flex-direction: row;
	align-items: center;
`;

export const ReturnText = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: #ee4e62;
`;

export const TextStrong = styled.Text`
	margin-bottom: 20px;
	font-size: 20;
	font-weight: bold;
	color: #444;
`;

export const Text = styled.Text`
	font-size: 18;
	color: #666;
	margin-bottom: 20px;
`;

export const Date = styled.Text`
	color: #666;
	font-size: 16px;
`;
