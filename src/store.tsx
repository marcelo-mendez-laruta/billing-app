import { configureStore } from '@reduxjs/toolkit'
import clientReducer from './slices/client';

const reducer = {
  client: clientReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;