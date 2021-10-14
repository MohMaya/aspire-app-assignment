import { configureStore } from "@reduxjs/toolkit";
import debitCardSliceReducer from "./slices/debitCardSlice";
import userSliceReducer from "./slices/userSlice";
import appVariablesSliceReducer from "./slices/appVariablesSlice";

export const store = configureStore({
    reducer: {
        debitCard: debitCardSliceReducer,
        userSlice: userSliceReducer,
        appVariable: appVariablesSliceReducer,
    },
});