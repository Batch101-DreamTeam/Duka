import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: { name: null, mail: null, token: null, photos: [], favorites: [] },
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
    updateToken: (state, action) => {
      state.value.token = action.payload;
    },
    addPhoto: (state, action) => {
      if (state.value.photos.length < 3) {
        state.value.photos.push(action.payload);
      } else {
        state.value.photos.pop();
        state.value.photos.push(action.payload);
      }
    },
    removePhoto: (state, action) => {
      state.value.photos = state.value.photos.filter((data) => data !== action.payload);
    },
    deleteAllPhoto: (state, action) => {
      state.value.photos = []
    },

    addFavorites: (state, action) => {
  
       if(state.value.favorites.includes(action.payload.id) || !state.value.token){
        console.log('already Had')
        return 
      }
      else if(state.value.token){
        state.value.favorites.push(action.payload);
    }
    },
    suppFavorites: (state, action) => {
      state.value.favorites = state.value.favorites.filter((data) => data.id !== action.payload.id);
      console.log('tryed   eqsfkhzsrmrkgf')
    },
    deleteAllfavs: (state, action) => {
      state.value.favorites = [];
      console.log('del: ', state.value.favorites);
    },
    getFavorites: (state, action) => {
      state.value.favorites = action.payload;
    },

  },
});

export const { deleteAllfavs, addFavorites, suppFavorites, getFavorites, updateName, updateMail, updateToken, addPhoto, removePhoto, deleteAllPhoto } = userSlice.actions;
export default userSlice.reducer;
