import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './features/users/userSlice';


export default configureStore({
    reducer:{
        users: usersSlice.reducer
    }
  })