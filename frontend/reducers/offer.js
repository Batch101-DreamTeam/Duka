import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: { resultSearch: null, nameOfResearch: "" },
};
export const userSlice = createSlice({
    name: 'offer',
    initialState,
    reducers: {
        newSearch: (state, action) => {
            state.value.resultSearch = action.payload;
        },
        nameSearch: (state, action) => {
            state.value.nameOfResearch = action.payload;
        },
    },
});
export const { newSearch, nameSearch } = userSlice.actions;
export default userSlice.reducer;
