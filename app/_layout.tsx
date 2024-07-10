import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { FontAwesome6 } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';
import { Provider } from 'react-redux';
import store from '../store/index';

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <Root />;
}

function RootLayoutNav() {
	const router = useRouter();
	return (
		<>
			<StatusBar hidden={true} />
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="login" options={{ headerShown: false }} />
				<Stack.Screen name="signup" options={{ headerShown: false }} />
				<Stack.Screen
					name="home"
					options={{
						headerShadowVisible: false,
						headerStyle: { backgroundColor: Colors.darkGrey500 },
						headerLeft: () => (
							<TouchableOpacity onPress={() => router.back()}>
								<FontAwesome6
									name="bars-staggered"
									size={24}
									color={Colors.white}
									style={{ marginRight: 20, marginVertical: 30 }}
								/>
							</TouchableOpacity>
						),
						headerTitle: 'Pocket Doc',
						headerTintColor: Colors.white,
					}}
				/>
				<Stack.Screen
					name="chat"
					options={{
						headerShadowVisible: false,
						headerStyle: { backgroundColor: Colors.darkGrey500 },
						headerLeft: () => (
							<TouchableOpacity onPress={() => router.back()}>
								<FontAwesome6
									name="bars-staggered"
									size={24}
									color={Colors.white}
									style={{ marginRight: 20, marginVertical: 30 }}
								/>
							</TouchableOpacity>
						),
						headerTitle: 'Pocket Doc',
						headerTintColor: Colors.white,
					}}
				/>
			</Stack>
		</>
	);
}

function Root() {
	return (
		<Provider store={store}>
			<RootLayoutNav />
		</Provider>
	)
}
