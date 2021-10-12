import React, { Component, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, Image, Dimensions } from 'react-native'
import { Text } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
// import popUpCards from '../components/popUpCard';
// import { useDispatch } from 'react-redux';
import PopUpCard from '../components/PopUpCard';
import { setCompleteCardDetails } from '../store/slices/debitCardSlice';
import { useNavigationState } from '@react-navigation/core';
import { useDispatch, useStore } from 'react-redux';

const {width, height} = Dimensions.get('screen');
let firstLoad_FLAG = true;

const DebitCardControlCenterScreen = (props) => {
    // const dispatch = useDispatch();
    // const [currency, setCurrencyUnits] = useState();
    // const [availableBalance, setAvailableBalance] = useState();
    const store = useStore();
    const forceUpdate = React.useReducer(() => ({}))[1]
    const dispatch = useDispatch();
    let state = store.getState()
    let currency = state.debitCard.currencyUnits //selectCurrencyUnits();//"S$";
    let availableBalance = state.debitCard.availableBalance

    useEffect(() => {
        console.log("Use-effect trigerred, firstLoad : "+firstLoad_FLAG)
        if(firstLoad_FLAG == true)
        {
            firstLoad_FLAG = false;
            let dummyCardDetails = {
                cardNumberVisible: false,
                cardNumber: "1234567887654321",
                cardValidThru: "12/20",
                cardCVV: "456",
                nameOnCard: "Rakesh seth",
                availableBalance: "42000",
                currencyUnits: "INR",
                weeklySpendingLimit: null,
                weeklySpendingLimitExhausted: null
            }

            dispatch(
                setCompleteCardDetails(dummyCardDetails)
            );

            state = store.getState();
            console.log(state);
            currency = state.debitCard.currencyUnits //selectCurrencyUnits();//"S$";
            availableBalance = state.debitCard.availableBalance 
            console.log("Debit Card Control Screen Loaded - Currency : "+currency+" && availableBalance : "+availableBalance);
            forceUpdate();
        }
    });
    
    return (
        <SafeAreaView style={styles.background}>
            <View style={tw `p-0`}>
                <View style={{paddingLeft:24}}>
                    <View style={styles.container}>
                        <Image
                            style={{
                                width: 25,
                                height: 25,
                                resizeMode: "contain",
                            }}
                            source={require("../assets/Logo.png")}
                        />
                    </View>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:24}}>Debit Card</Text>
                    <Text style={{color:'white', fontSize:14, marginTop: 22}}>Available balance</Text>
                    <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center'}}>
                        {/* View For Displaying Currency and available balance amount */}
                        <View style={{backgroundColor:'#01D167', width:40, height:22, borderRadius: 4, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{color:'white', fontWeight:'bold', fontSize:12}}>
                                {currency}
                            </Text>
                        </View>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:24, paddingLeft:10}}>
                                {availableBalance}
                        </Text>
                    </View>
                </View>
            </View>
            <PopUpCard props={props}/>
        </SafeAreaView>
    )
}

export default DebitCardControlCenterScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        position: 'relative',
        paddingRight: 24,
    },
    text: {
        color: "blue",
    },
    background: {
      backgroundColor: '#0C365A',
      flex:1
    },
    behind: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: width,
        height: height,
        top: 0,
        backgroundColor: 'white',
    }  
})