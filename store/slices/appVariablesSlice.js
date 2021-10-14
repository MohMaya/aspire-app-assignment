//Responsible for storing variables That Control behavior of app
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingIndicatorDisplayed: false,       //Sets visibility of Loading Indicator across the app
    loadingIndicatorText: "",                 //Sets the text for loading Indictor 
    aspireGreen: "#01D167",                   //The Green color, peculiar to the app
};




export const appVariableSlice = createSlice({
    name: 'appVariableSlice',    //Name of the slice
    initialState,
    reducers: {
        setIsLoadingIndicatorDisplayed: (state, action) => {
            state.isLoadingIndicatorDisplayed = action.payload.isLoadingIndicatorDisplayed;
        },
        setLoadingIndicatorText: (state, action) => {
            state.loadingIndicatorText = action.payload.loadingIndicatorText;
        }     
    }
});


export const { setIsLoadingIndicatorDisplayed, setLoadingIndicatorText} = appVariableSlice.actions;

//Selectors -> Creating individual selector for every item
//Used to select/pull the data
export const selectIsLoadingIndicatorDisplayed = (state) => state.appVariable.isLoadingIndicatorDisplayed;
export const selectLoadingIndicatorText = (state) => state.appVariable.loadingIndicatorText;


export default appVariableSlice.reducer;    //Export this by default to whichever file imports it first.