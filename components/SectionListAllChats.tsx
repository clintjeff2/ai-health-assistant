import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import TextLengthShortener from '@/utils/TextLengthShortener';
import { Link, useNavigation } from 'expo-router';

// type Props = {
// 	title: string;
// 	data: Array<string>;
// };
type Props = {
	item: object;
};

const SectionListAllChats = ({ item }: Props) => {
	const navigation = useNavigation();
	const handleMoveToChat = (id) => {
		console.log('this is my id: ', id);
		navigation.navigate('chat', { chatID: id });
	};
	return (
		<View style={styles.sectionItem}>
			<TouchableOpacity
				style={styles.chats}
				onPress={() => handleMoveToChat(item.chatID)}
			>
				<Ionicons name="chatbox" size={24} color={Colors.whiteTransparent} />
				<Text style={styles.text}>
					{TextLengthShortener(35, item.fmessage)}
				</Text>
			</TouchableOpacity>
			<FontAwesome
				name="trash"
				size={24}
				color={Colors.primary}
				style={{ marginRight: 8 }}
			/>
		</View>
	);
};

export default SectionListAllChats;

const styles = StyleSheet.create({
	sectionItem: {
		flexDirection: 'row',
		gap: 8,
		padding: 8,
		backgroundColor: Colors.darkGrey300,
		marginVertical: 4,
		borderRadius: 12,
		// alignItems: 'center',
	},
	text: {
		color: Colors.lightGrey500,
	},
	chats: {
		marginRight: 'auto',
		flexDirection: 'row',
		flex: 1,
		gap: 8
	},
});
