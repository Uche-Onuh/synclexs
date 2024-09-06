import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice"; // Adjust this path to your actual user slice
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist the user slice, adjust if needed
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
