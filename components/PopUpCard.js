import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import { LinearProgress } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useStore } from 'react-redux';
import MenuItems from './MenuItems';
import CardView from './CardView';
import { selectCurrencyUnits, selectWeeklySpendingLimit, selectWeeklySpendingLimitExhausted } from '../store/slices/debitCardSlice';

const {width, height} = Dimensions.get('screen');

const CARD_WIDTH = (width-48);  //Ensures that the currency notation and the card's left end align just like the mock up
const CARD_HEIGHT = 0.6*CARD_WIDTH; // Aspect Ratio of the card is 0.6 [h/w]

const POP_UP_HEIGHT = (height >= 844) ? 0.73*height : 0.66*height;



const renderSpendingLimitBar = (renderFlag, limitExhausted, totalLimit, currencyUnits) => {
    if(renderFlag === true){
        return (
            <View style={{height: 39}}>
                <View style={{marginBottom: 6, flexDirection: 'row', marginLeft: 0, marginRight: 0, alignContent:'space-between'}}>
                    {/* View for heading and numerical representation of limit*/}
                    <Text style={{color:'black', fontWeight:'400', fontSize:13, alignSelf:'flex-start', flex: 1}}>Debit card spending limit</Text>
                    <View style={{alignSelf:'flex-end', flexDirection: 'row'}}>
                        <Text style={{color:'#01D167', fontWeight:'400', fontSize:12}}>{currencyUnits}{limitExhausted}</Text>
                        <Text style={{color:'#222222', fontWeight:'300', fontSize:12}}> | {currencyUnits}{totalLimit}</Text>
                    </View>
                </View>
                <LinearProgress
                    color="#01D167"
                    trackColor="rgba(1,209,103,0.1)"
                    variant='determinate'
                    value={limitExhausted/totalLimit}
                    style={{
                        height: 15,
                        borderRadius: 30,
                        marginBottom: 0,
                    }}
                />
            </View>
        );
    }
    else{
        return (<View style={{display:'none'}}></View>);
    }
}

const PopUpCard = (props) => {
    const store = useStore();
    let state = store.getState()

    let spendingLimit = useSelector(selectWeeklySpendingLimit);
    let spendingLimitExhausted = useSelector(selectWeeklySpendingLimitExhausted);
    let currencyUnits = useSelector(selectCurrencyUnits);
    let isSpendingLimitSet = (spendingLimit != null && spendingLimit > 0);
    let scrollheight = isSpendingLimitSet ? 580 : 540;
    // let cardNumberForDisplay = () => {
    //     if(cardDetailsDisplayed()){
    //         return cardNumber()
    //     }
    //     else{
    //         return cardNumber().substring(12,16)
    //     }
    // };
    // const dispatch = useDispatch();
    
    return (
        <SafeAreaView style={{top:0, bottom:0, height:height, ...styles.behind}}>
            <ScrollView 
                style={{
                    top:0, 
                    bottom:0, 
                    backgroundColor: 'transparent',
                    width:width,
                }}
                bounces={true}
                showsVerticalScrollIndicator={false}
            >
                <View style={{backgroundColor:'transparent', flex: 1, height: 243}}>
                    {/* A view that stays transparent */}
                </View>
                <View style={{backgroundColor: 'white', alignItems: 'center', height: scrollheight, borderRadius: 18, shadowOpacity: 0.5}}>
                    {/* The view that scrolls up if needed */}
                    <CardView />
                    <View style={{height: scrollheight, marginTop: 26, marginBottom: 30, marginLeft: 24, marginRight: 24, width: width-48}}>
                        {/* Menu Options to be displayed here */}
                        {renderSpendingLimitBar(isSpendingLimitSet, spendingLimitExhausted, spendingLimit, currencyUnits)}
                        <MenuItems props={props}/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PopUpCard

const styles = StyleSheet.create({
    behind: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top:0,
        bottom: 0,
        backgroundColor: 'transparent',
        width: '100%',
        flex: 1,
    },
})
