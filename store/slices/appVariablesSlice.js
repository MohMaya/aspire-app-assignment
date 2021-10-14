//Responsible for storing variables That Control behavior of app
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoadingIndicatorDisplayed: false,       //Sets visibility of Loading Indicator across the app
    loadingIndicatorText: "",                 //Sets the text for loading Indictor 
    appColorSolid: "#01D167",                   //The Green color, peculiar to the app - by default
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
        },
        setAppColorSolid: (state, action) => {
            state.appColorSolid = action.payload.appColorSolid;
        },
     }
});


export const { setIsLoadingIndicatorDisplayed, setLoadingIndicatorText, setAppColorSolid} = appVariableSlice.actions;

//Selectors -> Creating individual selector for every item
//Used to select/pull the data
export const selectIsLoadingIndicatorDisplayed = (state) => state.appVariable.isLoadingIndicatorDisplayed;
export const selectLoadingIndicatorText = (state) => state.appVariable.loadingIndicatorText;
export const selectAppColorSolid = (state) => state.appVariable.appColorSolid;


export default appVariableSlice.reducer;    //Export this by default to whichever file imports it first.