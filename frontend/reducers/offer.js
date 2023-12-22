import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    value: { resultSearch: null, nameOfResearch: "", filterPrice: null, filterCategory: null, filterCity: null, haveFilter: false },
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
        newFilterPrice: (state, action) => {
            state.value.filterPrice = action.payload;
        },
        newFilterCategory: (state, action) => {
            state.value.filterPrice = action.payload;
        },
        newFiltercity: (state, action) => {
            state.value.filterPrice = action.payload;
        },
        filterApply: (state, action) => {
            state.value.haveFilter = action.payload;
        }
    },
});
export const { newSearch, nameSearch, filterApply } = userSlice.actions;
export default userSlice.reducer;
