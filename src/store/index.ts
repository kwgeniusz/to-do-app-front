import { combineReducers, configureStore, AnyAction } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist"
import { thunk, ThunkDispatch } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./authSlice";
import { taskSlice } from "./taskSlice";
import { useDispatch } from "react-redux";

const persistConfig = {
    key: "root",
    storage,
}

const reducers = combineReducers({
    auth: authSlice.reducer,
    tasks: taskSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer ,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Para evitar advertencias de redux-persist
        }).concat(thunk), // Agrega redux-thunk a los middlewares predeterminados
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();