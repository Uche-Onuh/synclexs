// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default storage is localStorage for web
import userReducer from "./slice/userSlice"; // Adjust the path according to your file structure

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Specify the slices you want to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
