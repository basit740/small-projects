import { createSlice } from '@reduxjs/toolkit';

let initialUser = null;

(() => {
	if (localStorage.getItem('user') !== null) {
		initialUser = JSON.parse(localStorage.getItem('user'));
	}
})();

const initialState = {
	name: 'auth',
	user: initialUser,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			localStorage.setItem('user', JSON.stringify(action.payload.user));
			localStorage.setItem('token', action.payload.token);
			state.user = action.payload.user;
		},
		logout: (state) => {
			localStorage.removeItem('user');
			localStorage.removeItem('token');
			state.user = null;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
