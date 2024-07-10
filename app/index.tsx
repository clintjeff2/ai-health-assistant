import Colors from '@/constants/Colors';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { storeUser } from '@/store/features/auth';

type Props = {};

function Home({}: Props) {
	const navigation = useNavigation();
	const dispatch = useDispatch<AppDispatch>();
	const handleGetStarted = () => {
		navigation.navigate('login');
	};
	useEffect(() => {
		(async () => {
			const userDetails = (await AsyncStorage.getItem('@user')) || '{}';
			const user = JSON.parse(userDetails);

			if (user.email && user.uid) {
				dispatch(storeUser(user));
				navigation.navigate('home');
			}
		})();
	}, []);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ImageBackground
				style={styles.image}
				source={{
					uri: 'https://c.ndtvimg.com/gws/ms/ai-ghost-potential-mental-health-threat/assets/2.jpeg?1710580916',
				}}
				resizeMode="cover"
			>
				<View style={styles.container}>
					<View style={styles.landing}>
						<Text style={styles.title}>
							The Future of Health with AI Technology is here
						</Text>
						<Text style={styles.landingIntro}>
							Artificial Intelligence (AI) is transforming healthcare by
							enhancing patient care and making medical processes more
							efficient. AI analyzes large data sets to predict diseases,
							personalize treatments, and assist in surgeries. This technology
							improves diagnostic accuracy and enables early detection of
							conditions, leading to better outcomes. Additionally, AI reduces
							the burden on healthcare professionals by automating routine
							tasks, allowing them to focus more on patient care. The future of
							healthcare with AI promises to be more efficient, accessible, and
							effective for everyone.
						</Text>
					</View>
					<TouchableOpacity style={styles.button} onPress={handleGetStarted}>
						<Text style={styles.getStartedText}>Get Started</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
	},
	container: {
		marginBottom: 30,
	},
	landing: {
		paddingHorizontal: 16,
	},
	title: {
		color: Colors.white,
		fontSize: 24,
		fontWeight: 'bold',
	},
	landingIntro: {
		color: Colors.lightGrey500,
		marginTop: 8,
	},
	button: {
		marginHorizontal: 16,
		backgroundColor: Colors.primary,
		padding: 16,
		borderRadius: 15,
		marginTop: 30,
	},
	getStartedText: {
		color: Colors.white,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
export default Home;
