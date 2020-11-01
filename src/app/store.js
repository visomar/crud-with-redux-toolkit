import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../components/login/loginSlice';
import mainReducer from '../components/mainwindow/mainSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    main: mainReducer,
  },
});
