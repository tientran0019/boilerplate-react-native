/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-12-31 15:21:25
*------------------------------------------------------- */

import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'react-native';

const Logo = (props) => {
	const { size, style } = props;

	return (
		<Image
			style={[
				style,
				{
					width: size,
					height: size,
				},
			]}
			source={require('src/assets/images/icon.png')}
		/>
	);
};

Logo.propTypes = {
	size: PropTypes.number,
	style: PropTypes.object,
};

Logo.defaultProps = {
	size: 100,
	style: {},
};

export default Logo;
