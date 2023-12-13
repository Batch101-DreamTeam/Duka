import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  value: { name: null, mail: null, token: null, photos: [] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.value.name = action.payload;
    },
    updateMail: (state, action) => {
      state.value.mail = action.payload;
    },
    token: (state, action) => {
      state.value.token = action.payload;
    },
    addPhoto: (state, action) => {
      state.value.photos.push(action.payload)
    },
    removePhoto: (state, action) => {
      state.value.photos = state.value.photos.filter((data) => data !== action.payload);
    },
  },
});

export const { updateName, updateMail, token, addPhoto, removePhoto } = userSlice.actions;
export default userSlice.reducer;
