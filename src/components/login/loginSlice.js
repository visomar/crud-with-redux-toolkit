import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    name: null,
    token: null
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
    }
  }
});

const { setUser } = loginSlice.actions;

export const attemptLogin = user => dispatch => {
  const { name, passw } = user;
  // handle properly security login
  axios.get(`http://localhost:3004/users/${name}`)
    .then(resp => {
      const { id, token } = resp.data;
      dispatch(setUser({name: id, token}));
    })
    .catch(error => {
      console.log(error);
    })
};

export const selectUser = state => state.login.name;
export const selectToken = state => state.login.token;

export default loginSlice.reducer;
