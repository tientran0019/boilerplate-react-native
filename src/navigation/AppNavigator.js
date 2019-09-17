// import React from 'react';
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-09-04 10:27:03
*------------------------------------------------------- */
import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthLoadingScreen from 'src/screens/AuthLoading';

import NavigationService from './NavigationService';

import MainTabNavigator from './MainTabNavigator';
import AuthStack from './AuthStack';

const AppContainer = createAppContainer(
	createSwitchNavigator({
		AuthLoading: AuthLoadingScreen,
		Main: MainTabNavigator,
		Auth: AuthStack,
	}, {
		initialRouteName: 'AuthLoading',
	}),
);


const RootNavigator = (props) => {
	return (
		<AppContainer
			ref={(v) => {
				if (v) {
					NavigationService.setTopLevelNavigator(v);
				}
			}}
			uriPrefix="/"
		/>
	);
};

RootNavigator.propTypes = {
	// prop: PropTypes.object.isRequired,
};

RootNavigator.defaultProps = {
	// prop: {},
};

export default RootNavigator;
