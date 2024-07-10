import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBEV8ZI9DKtPbzI6m7LABX1bGrHeLVwT3Y',
	authDomain: 'healthai-99da4.firebaseapp.com',
	databaseURL:
		'https://healthai-99da4-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'healthai-99da4',
	storageBucket: 'healthai-99da4.appspot.com',
	messagingSenderId: '411448785007',
	appId: '1:411448785007:web:cd5d4f496521f1b053b59a',
};

// Initialize Firebase
export default app = initializeApp(firebaseConfig);
