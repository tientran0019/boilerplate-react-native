/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-12-29 16:35:56
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StatusBar, Dimensions, Platform } from 'react-native';

// import getStatusBarHeight from 'src/utils/getStatusBarHeight';

const { height } = Dimensions.get('window');

const Container = (props) => {
	const { children, style } = props;

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: '#fff',
				// minHeight: Platform.OS === 'ios' ? height : height - getStatusBarHeight(),
			}}
		>
			{/* <StatusBar barStyle="light-content" backgroundColor="#174430" /> */}
			<ScrollView
				style={[
					style,
					{
						flex: 1,
						minHeight: Platform.OS === 'ios' ? height : height,
					},
				]}
			>
				{children}
			</ScrollView>
		</View>
	);
};

Container.propTypes = {
	children: PropTypes.node,
	style: PropTypes.object,
};

Container.defaultProps = {
	style: {},
	children: null,
};

export default Container;
