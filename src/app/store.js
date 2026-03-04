import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "../features/user/userSlice";
import onboardingReducer from "../features/onboarding/onboardingSlice";
import todoReducer from "../features/todoSlice";
import plannerReducer from "../features/plannerSlice"
import notesReducer from "../features/noteSlice"
// 🔐 Configuration for user slice
const userPersistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    onboarding: onboardingReducer,
    todos: todoReducer,
    planners: plannerReducer,
    notes: notesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ✅ Ignore redux-persist action types to prevent warnings
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
