import { configureStore } from "@reduxjs/toolkit";
import debitCardSliceReducer from "./slices/debitCardSlice";
import userSliceReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        debitCard: debitCardSliceReducer,
        userSlice: userSliceReducer,
    },
});