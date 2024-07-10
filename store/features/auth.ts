import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import app from './../../firebase.config';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	UserCredential,
} from 'firebase/auth';
import { RootType } from '../index';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
	email: string;
	id: string;
	isLoggedIn: boolean;
};

interface initialStateType {
	isLoading: boolean;
	error: boolean;
	data: Array<any> | object;
	user: User;
}

type dataType = {
	email: string;
	password: string;
};

const initialState: initialStateType = {
	isLoading: false,
	error: false,
	data: {},
	user: {
		email: '',
		id: '',
		isLoggedIn: false,
	},
};

type payloadType = {
	email: string;
	uid: string;
	emailVerified: boolean;
	displayName: string;
	refreshToken: string;
	idToken: string;
	expiresIn: Number;
};

export const signUpWithEmailAndPassword = createAsyncThunk<
	UserCredential,
	dataType,
	{ state: RootType }
>('auth/signUpWithEmailAndPassword', async (data: dataType, thunkAPI) => {
	try {
		const auth = getAuth(app);
		const res = await createUserWithEmailAndPassword(
			auth,
			data.email,
			data.password
		);
		const { user }: payloadType = res;
		const tokenResponse = res._tokenResponse; // Or use `await user.getIdToken()` to get the token

		// Create a serializable payload
		const payload = {
			email: user.email,
			uid: user.uid,
			emailVerified: user.emailVerified,
			displayName: user.displayName,
			refreshToken: tokenResponse.refreshToken,
			idToken: tokenResponse.idToken,
			expiresIn: tokenResponse.expiresIn,
		};

		await AsyncStorage.setItem('@user', JSON.stringify(payload));

		return payload;
	} catch (err) {
		// console.log(err);
		return thunkAPI.rejectWithValue(err);
	}
});

export const loginWithEmailAndPassword = createAsyncThunk<
	UserCredential,
	dataType,
	{ state: RootType }
>('auth/loginWithEmailAndPassword', async (data: dataType, thunkAPI) => {
	try {
		const auth = getAuth(app);
		const res = await signInWithEmailAndPassword(
			auth,
			data.email,
			data.password
		);
		const { user }: payloadType = res;
		const tokenResponse = res._tokenResponse; // Or use `await user.getIdToken()` to get the token

		// Create a serializable payload
		const payload = {
			email: user.email,
			uid: user.uid,
			emailVerified: user.emailVerified,
			displayName: user.displayName,
			refreshToken: tokenResponse.refreshToken,
			idToken: tokenResponse.idToken,
			expiresIn: tokenResponse.expiresIn,
		};

		await AsyncStorage.setItem('@user', JSON.stringify(payload));

		return payload;
	} catch (err) {
		// console.log(err);
		return thunkAPI.rejectWithValue(err);
	}
});

export const loginWithGoogle = createAsyncThunk<
	UserCredential,
	dataType,
	{ state: RootType }
>('auth/loginWithGoogle', async (thunkAPI) => {
	try {
	} catch (err) {
		console.log(err);
		return thunkAPI.rejectWithValue(err);
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		storeUser: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signUpWithEmailAndPassword.pending, (state, action) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(signUpWithEmailAndPassword.fulfilled, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			const { email, uid: id } = action.payload;
			state.user = { email, id, isLoggedIn: !!email };
			state.error = false;
		});
		builder.addCase(signUpWithEmailAndPassword.rejected, (state, action) => {
			state.isLoading = false;
			state.error = true;
		});
		builder.addCase(loginWithEmailAndPassword.pending, (state, action) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
			const { email, uid: id } = action.payload;
			state.user = { email, id, isLoggedIn: !!email };
			state.data = action.payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(loginWithEmailAndPassword.rejected, (state, action) => {
			state.isLoading = false;
			state.error = true;
		});
		builder.addCase(loginWithGoogle.pending, (state, action) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(loginWithGoogle.rejected, (state, action) => {
			state.isLoading = false;
			state.error = true;
		});
	},
});

export const { storeUser } = authSlice.actions;
export default authSlice.reducer;
