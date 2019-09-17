/* eslint-disable react/prop-types */
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-09-04 10:26:38
*------------------------------------------------------- */
import { Platform } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';

import Login from 'src/screens/Login';
import SignUp from 'src/screens/SignUp';

const config = Platform.select({
	web: { headerMode: 'screen' },
	default: {},
});

const AuthStack = createStackNavigator({
	Login,
	SignUp,
}, config);

AuthStack.path = '';

export default AuthStack;
