//Responsible for storing data inside of navigation
import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     cardNumberVisible: false,       //Masked Card Number and CVV - Local to the App - Defaults to 'hidden' state every time the app is opened.
//     cardNumber: null,               //Card Number as received from API
//     cardValidThru: null,            //Card Valid Thru as Received from API
//     cardCVV: null,                  //Card CVV as Recevied from API
//     nameOnCard: null,               //Name on Card as Received from API
//     availableBalance: null,         //Available Balance as received from API
//     currencyUnits: null,            //Currency Unit in which Available Balance is received from API 
//                                     //since user can make payments across borders and hence multiple currency support is needed but 
//                                     //backend can store in a single format at once and hence it will be changed and stored at backend as user updates their preference
//     weeklySpendingLimit:null,       //as Recevied from API, null signifies no spending limit has been set.
//     weeklySpendingLimitExhausted:null//as Received from API 
// };

const initialState = {
    cardNumberVisible: false,
    cardNumber: "1234567887654321",
    cardValidThru: "12/20",
    cardCVV: "123",
    nameOnCard: "Shivanshu Chaudhary",
    availableBalance: "12000",
    currencyUnits: "S$",
    weeklySpendingLimit: null,
    weeklySpendingLimitExhausted: null
}


export const navSlice = createSlice({
    name: 'nav',    //Name of the slice
    initialState,
    reducer: {
        setCompleteCardDetails: (state, action) => {
            console.log("DEBUG LOG: Setting Card Details")
            state.cardNumberVisible = action.payload.cardNumberVisible;
            state.cardNumber = action.payload.cardNumber;
            state.cardValidThru = action.payload.cardValidThru;
            state.cardCVV = action.payload.cardCVV;
            state.nameOnCard = action.payload.nameOnCard;
            state.availableBalance = action.payload.availableBalance;
            state.currencyUnits = action.payload.currencyUnits;
            state.weeklySpendingLimit = action.payload.weeklySpendingLimit;
            state.weeklySpendingLimitExhausted = action.payload.weeklySpendingLimitExhausted;
        },
        setCardNumberVisible: (state, action) => { //state: current state of the data layer
            state.cardNumberVisible = action.payload.cardNumberVisible;
        },
        setCardNumber: (state, action) => { //state: current state of the data layer
            state.cardNumber = action.payload;
        },
        setCardValidThru: (state, action) => { //state: current state of the data layer
            state.cardValidThru = action.payload;
        },
        setCardCVV: (state, action) => { //state: current state of the data layer
            state.cardCVV = action.payload;
        },
        setNameOnCard: (state, action) => {
            state.nameOnCard = action.nameOnCard;
        },
        setAvailableBalance: (state, action) => { //state: current state of the data layer
            state.availableBalance = action.payload;
        },
        setCurrencyUnits: (state, action) => { //state: current state of the data layer
            state.currencyUnits = action.payload;
        },
        setWeeklySpendingLimit: (state, action) => { //state: current state of the data layer
            state.weeklySpendingLimit = action.payload;
        },
        setWeeklySpendingLimitExhausted: (state, action) => { //state: current state of the data layer
            state.weeklySpendingLimitExhausted = action.payload;
        },      
    }
});


export const { setCardNumberVisible, setCardNumber, setCardValidThru, setCardCVV, setCompleteCardDetails, setAvailableBalance, setCurrencyUnits, setWeeklySpendingLimit, setWeeklySpendingLimitExhausted } = navSlice.actions;

//Selectors -> Creating individual selector for every item
//Used to select/pull the data
export const selectCardNumberVisible = (state) => state.nav.cardNumberVisible;
export const selectCardNumber = (state) => state.nav.cardNumber;
export const selectCardValidThru = (state) => state.nav.cardValidThru;
export const selectCardCVV = (state) => state.nav.cardCVV;
export const selectNameOnCard = (state) => state.nav.nameOnCard;
export const selectAvailableBalance = (state) => state.nav.availableBalance;
export const selectCurrencyUnits = (state) => state.nav.currencyUnits;
export const selectWeeklySpendingLimit = (state) => state.nav.weeklySpendingLimit;
export const selectWeeklySpendingLimitExhausted = (state) => state.nav.weeklySpendingLimitExhausted;


export default navSlice.reducer;    //Export this by default to whichever file imports it first.