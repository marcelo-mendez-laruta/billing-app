import { configureStore } from '@reduxjs/toolkit'
import clientReducer from './slices/client';
import billReducer from './slices/bill';

const reducer = {
  client: clientReducer,
  bills: billReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;