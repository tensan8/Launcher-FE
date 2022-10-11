import { configureStore } from '@reduxjs/toolkit';
import combineReducer from './combineReducer';

const store: any = configureStore({ reducer: combineReducer })

export default store