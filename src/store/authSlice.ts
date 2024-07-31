import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
	token: string;
}

const token = localStorage.getItem('token');

const initialState: AuthState = {
	token: token || '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
	},
});

export default authSlice.reducer;
export const { setAuth } = authSlice.actions;
