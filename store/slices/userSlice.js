//Responsible for storing data inside of navigation
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: null,       //Username field. NOT USED anywhere in the app
    userId: null,               //User ID Stored at initial page and then used to just mock setting of spending limit
};




export const userSlice = createSlice({
    name: 'userSlice',    //Name of the slice
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload.userName;
        },
        setUserId: (state, action) => {
            state.userId = action.payload.userId;
        }     
    }
});


export const { setUserName, setUserId} = userSlice.actions;

//Selectors -> Creating individual selector for every item
//Used to select/pull the data
export const selectUserName = (state) => state.userSlice.userName;
export const selectUserId = (state) => state.userSlice.userId;


export default userSlice.reducer;    //Export this by default to whichever file imports it first.