import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		setUser: (state, action) => {
			return action.payload;
		},
		clearUser: () => null,
		updateUserLocation: (state, action) => {
			state.location = action.payload;
		},
		updateUserBio: (state, action) => {
			state.bio = action.payload;
		},
		updateUserTags: (state, action) => {
			state.tags = action.payload;
		}
	},
});

export const { setUser, clearUser, updateUserLocation, updateUserBio, updateUserTags } =
	userSlice.actions;
export default userSlice.reducer;
