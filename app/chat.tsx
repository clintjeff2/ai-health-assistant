import {
	Alert,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { getAllConvos, sendQuestion } from '@/store/features/chat';
import Markdown from 'react-native-markdown-display';
import Loading from '@/components/Loading';

type Props = {
	question: string;
	response: string;
	chat: string;
};

const chats = [
	{
		me: true,
		message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, sint dignissimos inventore est unde quidem praesentium in, debitis alias sed ducimus asperiores repellendus quos eveniet quae tempora tempore, dicta reprehenderit!`,
	},
	{
		me: false,
		message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, recusandae?`,
	},
	{
		me: true,
		message: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
	},
	{
		me: false,
		message: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus quasi ipsam nostrum, repellendus nemo doloremque officiis accusantium est architecto illum!`,
	},
	{
		me: false,
		message: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
	},
	{
		me: true,
		message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, sint dignissimos inventore est unde quidem praesentium in, debitisalias sed ducimus asperiores repellendus quos eveniet quae temporatempore, dicta reprehenderit!`,
	},
	{
		me: true,
		message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, recusandae?`,
	},
	{
		me: true,
		message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, sint dignissimos inventore est unde quidem praesentium in, debitis alias sed ducimus asperiores repellendus quos eveniet quae tempora tempore, dicta reprehenderit!`,
	},
	{
		me: false,
		message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, recusandae?`,
	},
	{
		me: true,
		message: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
	},
	{
		me: false,
		message: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus quasi ipsam nostrum, repellendus nemo doloremque officiis accusantium est architecto illum!`,
	},
	{
		me: false,
		message: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
	},
	{
		me: true,
		message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, sint dignissimos inventore est unde quidem praesentium in, debitisalias sed ducimus asperiores repellendus quos eveniet quae temporatempore, dicta reprehenderit!`,
	},
	{
		me: true,
		message: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, recusandae?`,
	},
];

const Chat = (props: Props) => {
	const params = useLocalSearchParams();
	const [text, setText] = useState('');
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch<AppDispatch>();
	const messages = useSelector((state) => state.chat);

	console.log(params.chatID);

	const renderItem = ({ item }: { item: Props }) => {
		return (
			<>
				<Text style={!!item.question ? styles.messageMe : styles.messageAi}>
					{item.question}
				</Text>
				<View style={!!item.response ? styles.messageAi : styles.messageMe}>
					<Markdown style={{ body: { color: 'white' } }}>
						{item.response}
					</Markdown>
				</View>
			</>
		);
	};
	const handleSendMessage = () => {
		if (!!text) {
			const data = {
				user: user.email,
				convoID: params.chatID,
				message: text,
			};

			console.log(data);

			dispatch(sendQuestion(data));

			setText('');
			dispatch(getAllConvos({ convoID: params.chatID }));
		} else {
			Alert.alert(
				'Invalid Text',
				'Please type an appropriate health question and ask Pocket Doc'
			);
		}

		Keyboard.dismiss();
	};

	useEffect(() => {
		dispatch(getAllConvos({ convoID: params.chatID }));
	}, []);

	// if (messages.isLoading) return <Loading />;
	return (
		<View style={styles.container}>
			<View style={styles.containerSub}>
				<View style={styles.chatContainer}>
					{messages.convos?.allMessages?.length > 0 && !messages.isLoading && (
						<FlatList
							data={messages.convos.allMessages}
							keyExtractor={(item, index) => item.chat + index}
							renderItem={renderItem}
							ItemSeparatorComponent={() => (
								<View style={styles.seperate}></View>
							)}
							showsVerticalScrollIndicator={false}
							style={styles.flat}
							contentContainerStyle={{
								alignItems: 'center',
								justifyContent: 'center',
							}}
						/>
					)}
					{messages.isLoading && <Loading />}
					{messages.convos?.allMessages?.length === 0 &&
						!messages.isLoading && (
							<View style={styles.flat}>
								<Text style={styles.flatText}>
									Start A Converstation With Pocket Doc
								</Text>
							</View>
						)}
					{/* <View style={styles.flat}>
						<Markdown>{copy}</Markdown>
					</View> */}
					<View style={styles.inputContainer}>
						<TextInput
							placeholderTextColor={Colors.lightGrey500}
							placeholder="Pocket Doc: Ask Me Anything ...Health."
							style={styles.input}
							value={text}
							onChangeText={(text) => setText(text)}
						/>
						<TouchableOpacity style={styles.send} onPress={handleSendMessage}>
							<Ionicons name="send" size={24} color={Colors.white} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Chat;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.darkGrey500,
	},
	flat: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center'
	},
	flatText: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginHorizontal: 12,
	},
	containerSub: {
		flex: 1,
	},
	chatContainer: {
		flex: 1,
		gap: 8,
	},
	messageMe: {
		color: Colors.whiteTransparent,
		backgroundColor: Colors.darkGrey400,
		padding: 10,
		borderRadius: 12,
		borderBottomRightRadius: 0,
		maxWidth: '88%',
		alignSelf: 'flex-end',
	},
	messageAi: {
		color: Colors.white,
		backgroundColor: Colors.primary,
		padding: 20,
		borderRadius: 12,
		borderBottomLeftRadius: 0,
		maxWidth: '88%',
		alignSelf: 'flex-start',
		marginTop: 12,
	},
	seperate: {
		height: 12,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		backgroundColor: Colors.darkGrey800,
		padding: 15,
		borderTopStartRadius: 20,
		borderTopEndRadius: 20,
	},
	input: {
		flex: 1,
		padding: 12,
		backgroundColor: Colors.darkGrey300,
		borderRadius: 20,
		color: Colors.white,
	},
	send: {
		padding: 14,
		backgroundColor: Colors.primary,
		borderRadius: 100,
	},
});
