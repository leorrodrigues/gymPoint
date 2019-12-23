import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
	flex: 1;
	padding: 30px;
	margin-bottom: 30px;
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

export const Text = styled.Text`
	font-size: 24px;
	font-weight: bold;
`;

export const SubmitText = styled(Input)`
	margin-top: 25px;
	height: 30%;
`;

export const SubmitButton = styled(Button)`
	font-size: 20px;
	font-weight: bold;
	align-self: center;
	margin-top: 30px;

	align-self: stretch;
`;
