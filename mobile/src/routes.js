import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from '~/pages/SignIn';
import CheckIn from '~/pages/CheckIn';
import HelpOrderList from '~/pages/HelpOrder/List';
import HelpOrderShow from '~/pages/HelpOrder/Show';
import HelpOrderNew from '~/pages/HelpOrder/New';

export default (signedIn = false) =>
	createAppContainer(
		createSwitchNavigator(
			{
				Sign: createSwitchNavigator({
					SignIn,
				}),
				App: createBottomTabNavigator(
					{
						CheckIn,
						HelpOrder: {
							screen: createStackNavigator(
								{
									HelpOrderList,
									HelpOrderShow,
									HelpOrderNew,
								},
								{
									defaultNavigationOptions: {
										headerTitleStyle: {
											textAlign: 'center',
											flex: 1,
											marginLeft: -30,
										},
										headerTransparent: true,
										headerTintColor: '#fff',
										headerLeftContainerStyle: {
											margin: 15,
										},
									},
								}
							),
							navigationOptions: {
								tabBarVisible: true,
								title: 'Ask for help',
								// eslint-disable-next-line react/prop-types
								tabBarIcon: ({ tintColor }) => (
									<Icon
										name="live-help"
										size={20}
										color={tintColor}
									/>
								),
							},
						},
						// Profile,
					},
					{
						resetOnBlur: true,
						tabBarOptions: {
							keyboardHidesTabBar: true,
							activeTintColor: '#ee4e62',
							inactiveTintColor: '#aaa',
							style: {
								backgroundColor: '#fff',
							},
						},
					}
				),
			},
			{
				initialRouteName: signedIn ? 'App' : 'Sign',
			}
		)
	);
