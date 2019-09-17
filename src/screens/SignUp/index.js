/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email ductienas@gmail.com
* Phone 0972970075
*
* Created: 2018-12-31 15:05:17
*------------------------------------------------------- */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createForm } from 'rc-form';

import { View, Text, Dimensions, StatusBar, Platform, TouchableOpacity, Linking, Alert } from 'react-native';

import { Input, Button, CheckBox, Icon } from 'react-native-elements';

import Container from 'src/components/Layout/Container';

import { SafeAreaView } from 'react-navigation';

import { signUpRequest } from 'src/redux/actions/auth';

const { height } = Dimensions.get('window');

function mapStateToProps(state) {
	return {
		// store: {
		// 	auth: state.auth.toJS(),
		// },
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		action: bindActionCreators({
			signUpRequest,
		}, dispatch),
	};
};

class SignUp extends Component {
	static propTypes = {
		// store
		// store: PropTypes.shape({
		// 	auth: PropTypes.object.isRequired,
		// }).isRequired,
		// action
		action: PropTypes.shape({
			signUpRequest: PropTypes.func.isRequired,
		}).isRequired,

		navigation: PropTypes.object.isRequired,
		form: PropTypes.object.isRequired,
	}

	static defaultProps = {}

	static navigationOptions = {
		header: null,
	};

	state = {
		loading: false,
		signUpSuccess: false,
		termChecked: false,
		confirmDirty: false,
	}

	handlePressSubmit = async () => {
		this.props.form.validateFields((error, values) => {
			if (error) return;
			this.setState({
				loading: true,
			});

			const { fullName, email, password } = values;

			this.props.action.signUpRequest({ fullName, email, password }, (err) => {
				if (err) {
					this.setState({
						loading: false,
					});
					return;
				}
				this.setState({
					loading: false,
					signUpSuccess: true,
				});
			});
		});
	}

	checkPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback('Confirmation password does not match.');
		} else {
			callback();
		}
	}

	checkConfirm = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['passwordConfirm'], { force: true });
		}
		callback();
	}

	handleConfirmBlur = (e) => {
		const { value } = e.target;
		// eslint-disable-next-line react/no-access-state-in-setstate
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	render() {
		const { navigation } = this.props;
		const { getFieldDecorator, getFieldError } = this.props.form;

		if (this.state.signUpSuccess) {
			return (
				<Container
					style={{ minHeight: Platform.OS === 'ios' ? height : height - StatusBar.currentHeight }}
				>
					<View
						style={{
							// top: -50,
							flex: 1,
							justifyContent: 'center',
							alignContent: 'center',
						}}
					>
						<Text
							style={{
								fontSize: 20,
								marginBottom: 20,
								lineHeight: 24,
								paddingHorizontal: 10,
								textAlign: 'center',
							}}
						>
							Sign Up Success.
						</Text>
						<Text
							style={{
								fontSize: 16,
								paddingHorizontal: 10,
								marginBottom: 20,
								lineHeight: 20,
								textAlign: 'center',
							}}
						>
							Please confirm your email before logging in.
						</Text>
						<Button
							style={{
								marginTop: 50,
								// marginBottom: 150,
							}}
							onPress={() => { navigation.navigate('Login'); }}
							title="Login"
						/>
					</View>
				</Container>
			);
		}


		return (
			<Container
				style={{ minHeight: Platform.OS === 'ios' ? height : height - StatusBar.currentHeight }}
			>
				<View
					style={{
						// top: -50,
						flex: 1,
						justifyContent: 'center',
						alignContent: 'center',
						padding: 20,
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							alignContent: 'center',
							marginTop: 20,
							marginBottom: 20,
							flexWrap: 'wrap',
						}}
					>
						<Icon name="ios-arrow-round-back" type="ionicon" color="#019fe6" size={40} onPress={() => { navigation.navigate('Login'); }} />
						<Text
							style={{
								fontSize: 26,
								color: '#019fe6',
								marginLeft: 20,
							}}
						>
							Sign Up
						</Text>
					</View>
					{
						getFieldDecorator('fullName', {
							// validateFirst: true,
							rules: [{ required: true, message: 'Please enter your name!' }, { min: 6, message: 'The name cannot be shorter than 6 characters.' }],
						})(
							<Input
								label="Full Name"
								placeholder="EmFull Nameail"
								returnKeyType="next"
								error={getFieldError('fullName')}
							/>,
						)
					}
					{
						getFieldDecorator('email', {
							// validateFirst: true,
							// initialValue: 'taothichkiemtien@gmail.com',
							rules: [
								{ required: true, message: 'Please input your email!' },
								{ type: 'email', message: 'Email is invalid!' },
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
						)
					}
					{getFieldDecorator('password', {
						// validateFirst: true,
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
					{
						getFieldDecorator('passwordConfirm', {
							// validateFirst: true,
							rules: [{ required: true, message: 'Please input confirmation password!' }, { min: 6, message: 'Password cannot be shorter than 6 characters.' }, { validator: this.checkPassword }],
						})(
							<Input
								label="Confirmation password"
								placeholder="Confirmation password"
								textContentType="password"
								secureTextEntry
								returnKeyType="done"
								onSubmitEditing={this.handlePressSubmit}
								errorMessage={getFieldError('passwordConfirm')}
							/>,
						)
					}

					<View
						style={{
							flexDirection: 'row',
							alignContent: 'center',
							marginTop: 10,
							flexWrap: 'wrap',
						}}
					>
						<CheckBox
							checked={this.state.termChecked}
							onPress={() => {
								this.setState((prevState) => {
									return { termChecked: !prevState.termChecked };
								});
							}}
							containerStyle={{
								backgroundColor: 'transparent',
								borderWidth: 0,
								padding: 0,
								margin: 0,
								marginLeft: 0,
								marginRight: 0,
								width: 30,
								height: 30,
								alignSelf: 'center',
							}}
							wrapperStyle={{
								backgroundColor: 'transparent',
								borderWidth: 0,
								padding: 0,
								margin: 0,
							}}
							textStyle={{
								fontSize: 13,
								lineHeight: 20,
								fontFamily: 'Lato-Regular',
								fontWeight: 'normal',
							}}
							checkedColor="#019fe6"
							fontFamily="Lato-Regular"
						/>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 13,
								lineHeight: 20,
							}}
						>
							I agree with
						</Text>

						<TouchableOpacity
							onPress={() => {
								Linking.canOpenURL('https://www.google.com').then(supported => {
									if (supported) {
										Linking.openURL('https://www.google.com');
									} else {
										Alert.alert(
											'',
											'Could not open the link: https://www.google.com',
										);
									}
								});
							}}
						>
							<Text
								style={{
									fontSize: 13,
									color: '#019fe6',
									lineHeight: 20,
									marginHorizontal: 5,
								}}
							>
								Terms and Conditions
							</Text>
						</TouchableOpacity>

						<Text
							style={{
								textAlign: 'center',
								fontSize: 13,
								lineHeight: 20,
							}}
						>
							of GiverTaker
						</Text>
					</View>
					<View
						style={{
							marginTop: 20,
						}}
					>
						<Button
							title="Sign Up"
							onPress={this.handlePressSubmit}
							loading={this.state.loading}
							disabled={!this.state.termChecked}
						/>
					</View>
				</View>
				<SafeAreaView>
					<View
						style={{
							flexDirection: 'row',
							marginTop: 20,
							marginBottom: 20,
							justifyContent: 'center',
							alignContent: 'center',
						}}
					>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 16,
							}}
						>
							You had an account already?
						</Text>
						<TouchableOpacity
							onPress={() => { navigation.navigate('Login'); }}
						>
							<Text
								style={{
									// fontSize: 16,
									color: '#019fe6',
									marginLeft: 5,
								}}
							>
								LOGIN
							</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</Container>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(createForm()(SignUp));
