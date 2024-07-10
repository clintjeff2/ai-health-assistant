import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

type Props = {};

const Loading = (props: Props) => {
	return (
		<View style={styles.indicator}>
			<ActivityIndicator color={Colors.primary} size={'large'} />
		</View>
	);
};

export default Loading;

const styles = StyleSheet.create({
	indicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.darkGrey500,
	},
});
