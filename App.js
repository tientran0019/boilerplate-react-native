import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

// import { Asset } from 'expo-asset';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import store from 'src/redux/store';

import AppNavigator from 'src/navigation/AppNavigator';

const theme = {
	colors: {
		primary: '#019fe6',
		secondary: '#fff',
	},
	Button: {
		buttonStyle: {
			borderRadius: 30,
		},
	},
	Input: {
		containerStyle: {
			width: '100%',
			borderBottomWidth: 0,
			marginBottom: 20,
		},
		inputStyle: {
			width: '100%',
			borderBottomWidth: 0,
			color: '#98a2b0',
			paddingRight: 15,
			paddingLeft: 15,
			borderRadius: 30,
			backgroundColor: '#e7ebed',
			marginLeft: -10,
			marginRight: -10,
		},
		inputContainerStyle: {
			borderRadius: 30,
			backgroundColor: '#e7ebed',
			// color: '#636e86',
			width: '100%',
			borderBottomWidth: 0,
		},
		labelStyle: {
			marginLeft: -10,
			marginRight: -10,
			color: '#636e85',
			marginBottom: 7,
		},
		errorStyle: {
			marginLeft: -10,
			marginRight: -10,
		},
	},
};

function handleLoadingError(error) {
	// In this case, you might want to report the error to your error reporting
	// service, for example Sentry
	console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
	setLoadingComplete(true);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});

async function loadResourcesAsync() {
	await Promise.all([
		// Asset.loadAsync([
		// 	require('./src/assets/images/robot-dev.png'),
		// 	require('./src/assets/images/robot-prod.png'),
		// ]),
	]);
}

export default function App(props) {
	const [isLoadingComplete, setLoadingComplete] = useState(false);

	Ionicons.loadFont();
	FontAwesome.loadFont();

	// if (!isLoadingComplete && !props.skipLoadingScreen) {
	// 	return (
	// 		<AppLoading
	// 			startAsync={loadResourcesAsync}
	// 			onError={handleLoadingError}
	// 			onFinish={() => handleFinishLoading(setLoadingComplete)}
	// 		/>
	// 	);
	// }
	return (
		<Provider store={store}>
			<View style={styles.container}>
				{Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
				<ThemeProvider theme={theme}>
					<AppNavigator />
				</ThemeProvider>
			</View>
		</Provider>
	);
}

App.propTypes = {
	skipLoadingScreen: PropTypes.bool,
};

App.defaultProps = {
	skipLoadingScreen: false,
};
