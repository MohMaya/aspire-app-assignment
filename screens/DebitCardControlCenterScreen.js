import React, { Component, useEffect } from 'react'
import { StyleSheet, View, SafeAreaView, Image, Dimensions } from 'react-native'
import { Text, FAB } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
// import popUpCards from '../components/popUpCard';
// import { useDispatch } from 'react-redux';
import PopUpCard from '../components/PopUpCard';
import { selectAvailableBalance, selectCurrencyUnits, setCompleteCardDetails } from '../store/slices/debitCardSlice';
import { useNavigationState } from '@react-navigation/core';
import { useDispatch, useSelector, useStore } from 'react-redux';

const {width, height} = Dimensions.get('screen');
let firstLoad_FLAG = true;

const DebitCardControlCenterScreen = (props) => {
    const store = useStore();
    const dispatch = useDispatch();
    let state = store.getState()
    let currency = useSelector(selectCurrencyUnits);
    let availableBalance = useSelector(selectAvailableBalance);


    const setRandomCardDetails = () => {
        let dummyCardDetails = [
            {
                cardNumberVisible: false,
                cardNumber: "12345678912345678",
                cardValidThru: "12/30",
                cardCVV: "000",
                nameOnCard: "Shivanshu Chaudhary",
                availableBalance: "420,000",
                currencyUnits: "INR",
                weeklySpendingLimit: null,
                weeklySpendingLimitExhausted: null
            },
            {
                cardNumberVisible: false,
                cardNumber: "1234567800000001",
                cardValidThru: "01/25",
                cardCVV: "001",
                nameOnCard: "Tony Stark",
                availableBalance: "97,000,000",
                currencyUnits: "USD",
                weeklySpendingLimit: 10000,
                weeklySpendingLimitExhausted: 3000
            },
            {
                cardNumberVisible: false,
                cardNumber: "1234567887654321",
                cardValidThru: "03/24",
                cardCVV: "013",
                nameOnCard: "Bruce Banner",
                availableBalance: "13,000",
                currencyUnits: "BRL",
                weeklySpendingLimit: 500,
                weeklySpendingLimitExhausted: 40
            },
            {
                cardNumberVisible: false,
                cardNumber: "1234567843218765",
                cardValidThru: "06/44",
                cardCVV: "007",
                nameOnCard: "Natasha Romanoff",
                availableBalance: "42,000",
                currencyUnits: "RUB",
                weeklySpendingLimit: null,
                weeklySpendingLimitExhausted: null
            },
            {
                cardNumberVisible: false,
                cardNumber: "1234567887651234",
                cardValidThru: "09/34",
                cardCVV: "420",
                nameOnCard: "Peter Parker",
                availableBalance: "84,000",
                currencyUnits: "USD",
                weeklySpendingLimit: 4000,
                weeklySpendingLimitExhausted: 400
            },
            {
                cardNumberVisible: false,
                cardNumber: "1234567812345678",
                cardValidThru: "10/28",
                cardCVV: "666",
                nameOnCard: "T'Challa",
                availableBalance: "1,000,000",
                currencyUnits: "WVD",   //Wakandan Vibranium Dollar
                weeklySpendingLimit: null,
                weeklySpendingLimitExhausted: null
            },
            {
                cardNumberVisible: false,
                cardNumber: "1234567887650000",
                cardValidThru: "11/36",
                cardCVV: "777",
                nameOnCard: "James Rhodes",
                availableBalance: "68,000",
                currencyUnits: "USD",
                weeklySpendingLimit: null,
                weeklySpendingLimitExhausted: null
            },
        ]
        let randomIdx = Math.floor(Math.random() * dummyCardDetails.length);
        dispatch(
            setCompleteCardDetails(dummyCardDetails[randomIdx])
        );
    }

    useEffect(() => {
        setRandomCardDetails();
    }, []);
    
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
            <FAB 
                title="Load Another Card"
                onPress = {setRandomCardDetails}
                size="small"
                overlayColor="#01D167"
                color="#01D167"
                placement='right'
            />
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