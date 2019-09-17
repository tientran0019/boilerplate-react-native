/* --------------------------------------------------------
 * Author Trần Đức Tiến
 * Email ductienas@gmail.com
 * Phone 0972970075
 *
 * Created: 2019-01-30 16:54:22
 *------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	View,
	ImageBackground,
	Dimensions,
	Text,
	TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createForm } from 'rc-form';
import { Input, Button } from 'react-native-elements';
import { loginRequest } from 'src/redux/actions/auth';

import AuthStorage from 'src/utils/AuthStorage';

const { height } = Dimensions.get('window');

function mapStateToProps(state) {
	return {
		store: {},
	};
}

const mapDispatchToProps = dispatch => {
	return {
		action: bindActionCreators(
			{
				loginRequest,
			},
			dispatch,
		),
	};
};

class Login extends Component {
	static propTypes = {
		navigation: PropTypes.object.isRequired,
		form: PropTypes.object.isRequired,
		store: PropTypes.shape({}).isRequired,
		// action
		action: PropTypes.shape({
			loginRequest: PropTypes.func.isRequired,
		}).isRequired,
	};

	static defaultProps = {};

	static navigationOptions = {
		header: null,
	};

	state = {
		loading: false,
	}

	componentDidMount = async () => {
		if (await AuthStorage.loggedIn) {
			this.props.navigation.navigate('Main');
		}
	}

	handlePressSubmit = async () => {
		this.props.form.validateFields((error, values) => {
			if (error) return;

			this.setState({
				loading: true,
			});
			this.props.action.loginRequest(values, async (err, res2) => {
				if (err) {
					this.setState({
						loading: false,
					});
					return;
				}
				const token = await AuthStorage.token;

				if (token) {
					this.props.navigation.navigate('Home');
				} else {
					this.setState({
						loading: false,
					});
				}
			});
		});
	};

	render() {
		const { navigation } = this.props;
		const { getFieldDecorator, getFieldError } = this.props.form;

		return (
			<ImageBackground
				source={require('src/assets/images/bg-login.jpg')}
				style={{
					width: '100%',
					height,
					justifyContent: 'flex-end',
				}}
			>
				<View
					style={{
						flex: 1,
						position: 'absolute',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0,
						width: '100%',
						height,
						backgroundColor: '#0a3343',
						opacity: 0.8,
					}}
				/>
				<View
					style={{

					}}
				>
					<View
						style={{
							justifyContent: 'center',
							alignContent: 'center',
							padding: 20,
							margin: 20,
							backgroundColor: '#fff',
							borderRadius: 20,
							borderBottomWidth: 0,
							shadowColor: '#000',
							shadowOffset: { width: 0, height: 7 },
							shadowOpacity: 0.4,
							shadowRadius: 10,
							elevation: 10,
						}}
					>
						{getFieldDecorator('email', {
							// validateFirst: true,
							initialValue: 'john22@gmail.com',
							rules: [
								{
									required: true,
									message: 'Please enter your email!',
								},
								{
									type: 'email',
									message: 'Invalid email!',
								},
							],
						})(
							<Input
								label="Email"
								placeholder="Email"
								keyboardType="email-address"
								textContentType="emailAddress"
								returnKeyType="next"
								error={getFieldError('email')}
							/>,
						)}

						{getFieldDecorator('password', {
							// validateFirst: true,
							initialValue: '1q2w3e4r',
							rules: [
								{
									required: true,
									message: 'Please enter your password!',
								},
								{
									min: 6,
									message:
										'Password cannot be shorter than 6 characters.',
								},
								{ validator: this.checkConfirm },
							],
						})(
							<Input
								label="Password"
								placeholder="Password"
								textContentType="password"
								secureTextEntry
								returnKeyType="done"
								onSubmitEditing={this.handlePressSubmit}
								errorMessage={getFieldError('password')}
							/>,
						)}

						<View
							style={{
								marginTop: 10,
								// marginBottom: 150,
							}}
						>
							<Button
								title="Login"
								onPress={this.handlePressSubmit}
								loading={this.state.loading}
							/>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('ForgotPass');
								}}
							>
								<Text
									style={{
										textAlign: 'center',
										fontSize: 14,
										marginTop: 5,
										color: '#6f7a8f',
									}}
								>
									Forget your password?
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View
						style={{
							flexDirection: 'row',
							marginBottom: 20,
							justifyContent: 'center',
							alignContent: 'center',
						}}
					>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 16,
								color: '#fff',
							}}
						>
							You don&apos;t have an account?
						</Text>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('SignUp');
							}}
						>
							<Text
								style={{
									marginLeft: 5,
									color: '#fff',
								}}
							>
								SIGN UP
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(createForm()(Login));
