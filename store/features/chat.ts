import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getConversations = createAsyncThunk(
	'chats/getConversations',
	async (data, thunkAPI) => {
		try {
			const res = await axios({
				method: 'post',
				url: 'https://healthconsultant-jn08.onrender.com/getConversations',
				data,
			});

			console.log(res);
			return res.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);

export const createConversation = createAsyncThunk(
	'chats/createConversation',
	async (data, thunkAPI) => {
		try {
			const formData = new FormData();
			formData.append('user', data.user);
			const res = await axios({
				method: 'post',
				url: 'https://healthconsultant-jn08.onrender.com/createConvo',
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			const response = res.data;
			return response;
		} catch (err) {
			const data = { err: [...err] };
			return thunkAPI.rejectWithValue(data);
		}
	}
);

export const sendQuestion = createAsyncThunk(
	'chats/sendQuestion',
	async (data, thunkAPI) => {
		try {
			const formData = new FormData();
			formData.append('user', data.user);
			formData.append('message', data.message);
			formData.append('convoID', data.convoID);

			const res = await axios({
				method: 'post',
				url: 'https://healthconsultant-jn08.onrender.com/getResponse',
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			const response = res.data;
			console.log(response, 'SENDING A MESSAGE');
			return response;
		} catch (err) {
			const data = { err: [...err] };
			return thunkAPI.rejectWithValue(data);
		}
	}
);

export const getAllConvos = createAsyncThunk(
	'chats/getAllConvos',
	async (data, thunkAPI) => {
		try {
			const formData = new FormData();
			formData.append('convoID', data.convoID);

			const res = await axios({
				method: 'post',
				url: 'https://healthconsultant-jn08.onrender.com/getMessagesOfChat',
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			const response = res.data;
			console.log(response, 'Getting All Conversations');

			return response;
		} catch (err) {
			const data = { err: [...err] };
			return thunkAPI.rejectWithValue(data);
		}
	}
);
export const getConvosMessages = createAsyncThunk(
	'chats/getConvosMessages',
	async (data, thunkAPI) => {
		try {
			const formData = new FormData();
			formData.append('user', data.email);

			const res = await axios({
				method: 'post',
				url: 'https://healthconsultant-jn08.onrender.com/getPastWeekConversations',
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			const response = res.data;
			console.log(response);

			return response;
		} catch (err) {
			const data = { err: [...err] };
			return thunkAPI.rejectWithValue(data);
		}
	}
);
const initialState = {
	isLoading: false,
	error: false,
	data: {},
	chatID: '',
	convos: [] || {},
	convoMessages: [],
};

const chatSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getConversations.pending, (state, action) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getConversations.fulfilled, (state, action) => {
			state.data = action.payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(getConversations.rejected, (state, action) => {
			state.isLoading = false;
			state.error = true;
		});
		builder.addCase(createConversation.pending, (state, action) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(createConversation.fulfilled, (state, action) => {
			state.chatID = action.payload.chatID;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(createConversation.rejected, (state, action) => {
			state.isLoading = false;
			state.error = true;
		});
		builder.addCase(sendQuestion.pending, (state, action) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(sendQuestion.fulfilled, (state, action) => {
			state.convoMessages = []
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(sendQuestion.rejected, (state, action) => {
			state.isLoading = false;
			state.error = true;
		});
		builder.addCase(getAllConvos.pending, (state, action) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getAllConvos.fulfilled, (state, action) => {
			state.convos = action.payload;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(getAllConvos.rejected, (state, action) => {
			state.isLoading = false;
			state.error = true;
		});
		builder.addCase(getConvosMessages.pending, (state, action) => {
			state.isLoading = true;
			state.error = false;
		});
		builder.addCase(getConvosMessages.fulfilled, (state, action) => {
			const data = [
				{
					title: action.payload.title,
					data: action.payload.chats,
				},
			];
			state.convoMessages = data;
			state.isLoading = false;
			state.error = false;
		});
		builder.addCase(getConvosMessages.rejected, (state, action) => {
			state.isLoading = false;
			state.error = true;
		});
	},
});

export default chatSlice.reducer;
