import { configureStore } from "@reduxjs/toolkit";
import debitCardSliceReducer from "./slices/debitCardSlice";

export const store = configureStore({
    reducer: {
        debitCard: debitCardSliceReducer,
    },
});