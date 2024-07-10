import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
	loginWithEmailAndPassword,
	loginWithGoogle,
} from '@/store/features/auth';
import { userTypes } from '@/utils/types';
import { AppDispatch } from '@/store';

const defaultUser: userTypes = {
	name: '',
	email: '',
	password: '',
};

// Allow Expo to handle authentication with WebBrowser
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
	const navigation = useNavigation();
	const [userData, setUserData] = useState<userTypes>(defaultUser);
	const dispatch = useDispatch<AppDispatch>();
	const action = useSelector((state) => state.auth);

	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId:
			'307251974206-ifg1gh2gvav0qrnqmf398pog5tld8vbu.apps.googleusercontent.com',
		iosClientId:
			'307251974206-ivrvodfheilav0fto9134h8fajfm3nql.apps.googleusercontent.com',
		webClientId:
			'307251974206-ifg1gh2gvav0qrnqmf398pog5tld8vbu.apps.googleusercontent.com',
		scopes: ['profile', 'email'],
	});

	const getUserInfo = async (token: string) => {
		if (!token) return;

		try {
			const response = await fetch(
				'https://www.googleapis.com/userinfo/v2/me',
				{
					headers: { Authorization: 'Bearer ' + token },
				}
			);
			return response;
		} catch (error) {
			// your own things
		}
	};

	const handleSignInWithGoogle = async () => {
		if (response?.type === 'success') {
			const res = await getUserInfo(response.authentication.accessToken);
		}
	};
	useEffect(() => {
		handleSignInWithGoogle();
	}, [response]);

	const handleLogin = () => {
		dispatch(loginWithEmailAndPassword(userData));
		setUserData(defaultUser);
	};

	if (action.user.isLoggedIn) {
		navigation.navigate('home');
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.appContainer}>
				<Text style={styles.appName}>Pocket Doc</Text>
				<Text style={styles.appText}>Please Login To Your Account</Text>
			</View>
			<View style={styles.logoContainer}>
				<TouchableOpacity
					style={styles.loginOther}
					onPress={() => promptAsync()}
				>
					<FontAwesome name="google" size={24} color={Colors.white} />
				</TouchableOpacity>
				{/* <TouchableOpacity style={styles.loginOther}>
					<FontAwesome name="facebook-f" size={24} color={Colors.white} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.loginOther}>
					<FontAwesome5 name="microsoft" size={24} color={Colors.white} />
				</TouchableOpacity> */}
			</View>
			<View style={styles.lineContainer}>
				<Text style={styles.line}></Text>
				<Text style={{ color: Colors.white }}>or</Text>
				<Text style={styles.line}></Text>
			</View>
			<View style={styles.form}>
				<View style={styles.textArea}>
					<Ionicons name="mail" size={24} color={Colors.primary} />
					<TextInput
						placeholder="Enter Your Email"
						style={styles.inputText}
						placeholderTextColor={Colors.lightGrey500}
						value={userData.email}
						onChangeText={(text) =>
							setUserData((prev) => {
								return {
									...prev,
									email: text,
								};
							})
						}
					/>
				</View>
				<View style={styles.textArea}>
					<FontAwesome name="lock" size={24} color={Colors.primary} />
					<TextInput
						placeholder="Enter Your Password"
						style={styles.inputText}
						placeholderTextColor={Colors.lightGrey500}
						value={userData.password}
						onChangeText={(text) =>
							setUserData((prev) => {
								return {
									...prev,
									password: text,
								};
							})
						}
					/>
				</View>
				<TouchableOpacity style={styles.forgotContainer}>
					<Text style={styles.forgotPass}>forgot password ?</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={handleLogin}>
					<Text style={styles.login}>Login</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.bottom}>
				<View style={styles.noAccount}>
					<Text style={{ color: Colors.white }}>Don't Have An Account? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('signup')}>
						<Text style={styles.forgotPass}>Sign Up ?</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.darkGrey500,
	},
	appContainer: {
		marginVertical: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	appName: {
		color: Colors.white,
		fontSize: 36,
		fontWeight: 'bold',
	},
	appText: {
		color: Colors.lightGrey500,
		margin: 8,
		fontWeight: '100',
		fontSize: 12,
	},
	logoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 16,
	},
	loginOther: {
		backgroundColor: Colors.darkGrey300,
		width: 70,
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
	line: {
		width: 80,
		borderBottomWidth: 2,
		borderColor: Colors.white,
		marginBottom: 12,
	},
	lineContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 30,
		gap: 8,
	},
	form: {
		marginHorizontal: 35,
		gap: 28,
	},
	textArea: {
		padding: 12,
		backgroundColor: Colors.darkGrey300,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		borderRadius: 15,
	},
	inputText: {
		color: Colors.lightGrey500,
	},
	forgotContainer: {
		alignSelf: 'flex-end',
	},
	forgotPass: {
		color: Colors.primary,
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
	button: {
		backgroundColor: Colors.primary,
		padding: 16,
		borderRadius: 15,
		marginTop: 30,
	},
	login: {
		color: Colors.white,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	noAccount: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	bottom: {
		marginTop: 'auto',
		marginBottom: 30,
	},
});
