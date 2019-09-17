/* eslint-disable react/prop-types */
/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-09-17 17:20:50
*------------------------------------------------------- */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from 'src/constants/Colors';

export default function TabBarIcon(props) {
	return (
		<Icon
			name={props.name}
			size={26}
			style={{ marginBottom: -3 }}
			color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
		/>
	);
}
