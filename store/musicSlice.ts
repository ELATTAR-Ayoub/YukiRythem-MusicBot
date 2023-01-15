import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";


interface owner {
    name: string;
    ID: string;
    canonicalURL: string;
    thumbnails?: string[];
}

interface Data {
    ID: string;
    URL: string;
    title: string;
    thumbnails: string[];
    owner: owner;
    musicLengthSec?: number;
    message?: string;
}

// Type for our state
export interface AuthState {
    musicState: Data[];
}

// Initial state
const initialState: AuthState = {
    musicState: [],
};

// Actual Slice
export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {

    // Action to set the authentication status
    setMusicState(state, action) {
      state.musicState = action.payload;
    },

    ADD_ITEM(state, action) {
      return {
        ...state,
        musicState: [...state.musicState, action.payload],
      };
    },

    DELETE_ITEM(state, action) {
      const index = state.musicState.findIndex(item => item.ID === action.payload.ID);
      if (index === -1) return state;
    
      const newMusicState = [...state.musicState];
      newMusicState.splice(index, 1);
    
      return {
        ...state,
        musicState: newMusicState,
      };
    },


    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    /* extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    }, */

  },
});

export const { setMusicState, ADD_ITEM } = musicSlice.actions;

export const selectMusicState = (state: AppState) => state.music.musicState;

export default musicSlice.reducer;