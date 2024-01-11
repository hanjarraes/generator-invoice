import React from "react";
import { CssBaseline } from '@mui/material';
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import reportWebVitals from "./reportWebVitals";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

import { configureStore } from "@reduxjs/toolkit";
import storeLogin from "./store/storeLogin";
import storeGlobal from "./store/storeGlobal";

const rootReducer = combineReducers({
  login: storeLogin,
  global: storeGlobal
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const container = document.getElementById("root");
const root = createRoot(container);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <CssBaseline />
          <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
