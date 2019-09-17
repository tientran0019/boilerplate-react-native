/* eslint-disable react/prop-types */
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-09-04 10:26:38
*------------------------------------------------------- */
import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from 'src/components/TabBarIcon';

import HomeScreen from 'src/screens/Home';
import LinksScreen from 'src/screens/Links';
import SettingsScreen from 'src/screens/Settings';
import ProfileScreen from 'src/screens/Profile';

const config = Platform.select({
	web: { headerMode: 'screen' },
	default: {},
});

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen,
	},
	config,
);

HomeStack.navigationOptions = {
	tabBarLabel: 'Home',
	tabBarIcon: ({ focused }) => {
		return (<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios'
				? `ios-information-circle${focused ? '' : '-outline'}`
				: 'md-information-circle'}
		/>);
	},
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
	{
		Links: LinksScreen,
	},
	config,
);

LinksStack.navigationOptions = {
	tabBarLabel: 'Links',
	tabBarIcon: ({ focused }) => {
		return (<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />);
	},
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
	{
		Settings: SettingsScreen,
	},
	config,
);

SettingsStack.navigationOptions = {
	tabBarLabel: 'Settings',
	tabBarIcon: ({ focused }) => {
		return (<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />);
	},
};

SettingsStack.path = '';

const ProfileStack = createStackNavigator(
	{
		Profile: ProfileScreen,
	},
	config,
);

ProfileStack.navigationOptions = {
	tabBarLabel: 'Profile',
	tabBarIcon: ({ focused }) => {
		return (<TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />);
	},
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
	HomeStack,
	LinksStack,
	SettingsStack,
	ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
