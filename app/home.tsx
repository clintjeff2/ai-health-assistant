import {
	ScrollView,
	SectionList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import React, { useEffect } from 'react';
import Colors from '@/constants/Colors';
import SectionListAllChats from '@/components/SectionListAllChats';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import {
	createConversation,
	getConversations,
	getConvosMessages,
} from '@/store/features/chat';
import { AppDispatch } from '@/store';
import Loading from '@/components/Loading';

type Props = {};

const list = [
	{
		title: 'Last 7 Days',
		data: [
			'What are the causes of headache?',
			'I feel dizzy and tired',
			'What medicine helps for insomnia?',
			'Why do I feel so lazy?',
		],
	},
	{
		title: 'This Week',
		data: [
			'My allergies are acting up. What can I do?',
			'I woke up with a sore throat. Should I be worried?',
			'How much sleep do I really need?',
			'Healthy snacks to keep me energized throughout the day?',
		],
	},
	{
		title: 'Past Month',
		data: [
			'Is it safe to exercise with a cold?',
			'How to improve my posture?',
			'I have been feeling anxious lately. What can I do?',
			'My skin is dry and itchy. What could it be?',
		],
	},
	{
		title: 'Top Questions',
		data: [
			'How to lose weight in a healthy way?',
			'What are the symptoms of the flu?',
			'How to lower blood pressure naturally?',
			'Can stress cause hair loss?',
		],
	},
	{
		title: 'Recent Searches',
		data: [
			'Healthy breakfast ideas for kids',
			"How to get a better night's sleep?",
			'Should I get a flu shot this year?',
			'Natural remedies for headaches?',
		],
	},
	{
		title: 'For You',
		data: [
			'Based on your recent searches, did you know yoga can help with stress management?',
			'Tips for staying hydrated throughout the day.',
			'Importance of regular checkups with your doctor.',
			'How to develop a healthy relationship with food.',
		],
	},
];

const Home = (props: Props) => {
	const navigation = useNavigation();
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state) => state.auth.user);
	const chats = useSelector((state) => state.chat);

	useEffect(() => {
		dispatch(getConvosMessages({ email: user.email }));
	}, []);

	console.log(chats.convoMessages, 'JASIO CASIO');

	const handleCreateConversation = () => {
		dispatch(createConversation({ user: user.email }));
	};

	useEffect(() => {
		if (!!chats.chatID) {
			navigation.navigate('chat', { chatID: chats.chatID });
		}
	}, [chats.chatID]);

	console.log(chats.chatID);

	if (chats.isLoading) {
		return <Loading />;
	}
	return (
		<View style={styles.container}>
			<View style={styles.newChats}>
				<Text style={styles.heading}>New Chats</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={handleCreateConversation}
				>
					<Text style={styles.login}>Create New Chat</Text>
				</TouchableOpacity>
			</View>
			<View>
				<Text style={styles.chatSection}>Med Chats History</Text>
			</View>
			{chats.convoMessages?.length > 0 && (
				<SectionList
					sections={chats.convoMessages}
					renderItem={SectionListAllChats}
					renderSectionHeader={({ section: { title } }) => (
						<Text style={styles.header}>{title}</Text>
					)}
					showsVerticalScrollIndicator={false}
					style={styles.section}
				/>
			)}
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.darkGrey500,
		paddingHorizontal: 15,
	},
	newChats: {
		marginTop: 20,
		marginBottom: 30,
	},
	heading: {
		fontSize: 16,
		fontWeight: 'bold',
		color: Colors.white,
	},
	button: {
		backgroundColor: Colors.primary,
		padding: 18,
		borderRadius: 15,
		marginTop: 10,
	},
	login: {
		color: Colors.white,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	chatSection: {
		color: Colors.white,
		fontWeight: 'bold',
	},
	header: {
		color: Colors.white,
		fontWeight: 'light',
		marginTop: 12,
	},
	section: {
		marginTop: 16,
		marginBottom: 8,
	},
});
