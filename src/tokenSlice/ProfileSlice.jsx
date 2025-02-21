import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {
        _id: '',
        username: '',
        name: '',
        email: '',
        mob: '',
        city: '',
        dist: '',
        state: '',
        role: '',
        following: [],
        favourite: []
    }
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addProfile: (state, action) => {
            // Action payload should contain all profile data
            state.profile = { ...action.payload };
        },
        deleteProfile: (state) => {
            // Reset the profile to the initial state
            state.profile = initialState.profile;
        }
    }
});

// Export the actions
export const { addProfile, deleteProfile } = profileSlice.actions;

// Export the reducer
export default profileSlice.reducer;
