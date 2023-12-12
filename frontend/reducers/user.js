import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState = {
  value: { email: null, photos: [] },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
     connexion: (state, action)=>{
         console.log('connexion')
     },
     inscription: (state, action)=>{
         console.log('inscription')
     }
  },
});

export const { connexion, inscription } = userSlice.actions;
export default userSlice.reducer;
