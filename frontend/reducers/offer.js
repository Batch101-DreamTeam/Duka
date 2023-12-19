import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: { resultSearch: "" },
};

export const userSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {
        newSearch: (state, action) => {
            state.value.resultSearch = action.payload;
        },
    },
});
export const { newSearch } = userSlice.actions;
export default userSlice.reducer;
