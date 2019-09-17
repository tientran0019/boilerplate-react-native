/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2019-09-12 10:27:20
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { logoutRequest } from 'src/redux/actions/auth';

function mapStateToProps(state) {
	return {
		// dialog: state.get('dialog').toJS(),
	};
}

const mapDispatchToProps = dispatch => {
	return {
		action: bindActionCreators(
			{
				logoutRequest,
			},
			dispatch,
		),
	};
};

const ProfileScreen = (props) => {
	// const {  } = props;

	const handleLogout = () => {
		props.action.logoutRequest();
	};

	return (
		<View
			style={{

			}}
		>
			<Button
				title="Logout"
				onPress={handleLogout}
			/>
		</View>
	);
};

ProfileScreen.propTypes = {
	// navigation: PropTypes.object.isRequired,
	action: PropTypes.shape({
		logoutRequest: PropTypes.func.isRequired,
	}).isRequired,
};

ProfileScreen.defaultProps = {
	// prop: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
