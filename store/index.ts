import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth';
import chatReducer from './features/chat';

const store = configureStore({
	reducer: {
		auth: authReducer,
		chat: chatReducer,
	},
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
