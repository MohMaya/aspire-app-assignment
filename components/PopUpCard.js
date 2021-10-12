import React from 'react'
import { StyleSheet, Text, View, Dimensions, Animated, ScrollView, Image } from 'react-native'
import { Button, LinearProgress } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import tw from 'tailwind-react-native-classnames'
import { selectCardCVV, selectCardNumber, selectCardNumberVisible, selectCardValidThru, selectNameOnCard, setCardNumberVisible } from '../store/slices/navSlice';
import MenuItems from './MenuItems';

const {width, height} = Dimensions.get('screen');

const CARD_WIDTH = (width-48);  //Ensures that the currency notation and the card's left end align just like the mock up
const CARD_HEIGHT = 0.6*CARD_WIDTH; // Aspect Ratio of the card is 0.6 [h/w]

const POP_UP_HEIGHT = (height >= 844) ? 0.73*height : 0.66*height;

const cardDisplayRender = (cardDisplayFlag, cardNumber) => {
    if(cardDisplayFlag)
        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={{color:'white', fontWeight:'500', fontSize:16, width: 50, letterSpacing: 2}}>{cardNumber.substring(0,4)}</Text>
                <Text style={{color:'white', fontWeight:'500', fontSize:16, marginLeft: 20, width: 50, letterSpacing: 2}}>{cardNumber.substring(4,8)}</Text>
                <Text style={{color:'white', fontWeight:'500', fontSize:16, marginLeft: 20, width: 50, letterSpacing: 2}}>{cardNumber.substring(8,12)}</Text>
                <Text style={{color:'white', fontWeight:'500', fontSize:16, marginLeft: 20, width: 50, letterSpacing: 2}}>{cardNumber.substring(12,16)}</Text>
            </View>
        );
    else{
        return (
            <View style={{flexDirection: 'row'}}>
                <View style={{marginLeft: -4, flexDirection: 'row'}}>
                    <View style={styles.bullets}></View>
                    <View style={styles.bullets}></View>
                    <View style={styles.bullets}></View>
                    <View style={styles.bullets}></View>
                </View>
                <View style={{marginLeft: 20, flexDirection: 'row'}}>
                    <View style={styles.bullets}></View>
                    <View style={styles.bullets}></View>
                    <View style={styles.bullets}></View>
                    <View style={styles.bullets}></View>
                </View>
                <View style={{marginLeft: 20, flexDirection: 'row'}}>
                <View style={styles.bullets}></View>
                    <View style={styles.bullets}></View>
                    <View style={styles.bullets}></View>
                    <View style={styles.bullets}></View>
                </View>
                <Text style={{color:'white', fontWeight:'400', fontSize:16, marginLeft: 20}}>{cardNumber}</Text>
            </View>
        );
    }
};

const renderSpendingLimitBar = (renderFlag, limitExhausted, totalLimit, currencyUnits) => {
    if(renderFlag == false){
        return (<View style={{display:'none'}}></View>);
    }
    else{
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
}

const PopUpCard = () => {
    let cardDetailsDisplayed = () => false//selectCardNumberVisible;
    let cardNumber = () => "1234567887654321"//selectCardNumber;
    let cardValidThru = () => "12/20"//selectCardValidThru;
    let cardCVV = () => "123"//selectCardCVV;
    let nameOnCard = () => "Shivanshu Chaudhary"//selectNameOnCard;
    let spendingLimit = () => 5000;
    let spendingLimitExhausted = () => 1050;
    let currencyUnits = () => "S$";
    let isSpendingLimitSet = () => true;
    let cardNumberForDisplay = () => {
        if(cardDetailsDisplayed()){
            return cardNumber()
        }
        else{
            return cardNumber().substring(12,16)
        }
    };
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
                <View style={{backgroundColor: 'white', alignItems: 'center', height: height-243, borderRadius: 18, shadowOpacity: 0.5}}>
                    {/* The view that scrolls up if needed */}
                    <View style={{backgroundColor: 'transparent', width: CARD_WIDTH, height: CARD_HEIGHT+32, marginTop: -90}}>
                        {/* A view for the card image : Width is calculated as a percentage of the screen width as per shared design, height is calculated such as to maintain the aspect ratio */}
                        <View style={{backgroundColor: 'white', alignSelf:'flex-end', width: 151, height: 45, borderTopRightRadius: 6, borderTopLeftRadius: 6}}>
                            {/* A view for the "Show Card Number Button" */}
                            <Button
                                type="clear"
                                title = {(cardDetailsDisplayed()) ? "Hide card number" : "Show card number"}
                                titleStyle = {{
                                    color: '#01D167',
                                    fontSize: 12,
                                    fontWeight: "600",
                                }}
                                icon={
                                    <Image 
                                        style={styles.iconImage}
                                        source={(cardDetailsDisplayed()) ? require("../assets/eyeClosed.png") : require("../assets/eyeOpen.png")}
                                        resizeMode='contain' 
                                    />
                                }
                                onPress={() => {
                                    console.log("Card Details Displayed = "+cardDetailsDisplayed())
                                    if(cardDetailsDisplayed()){
                                        // dispatch(setCardNumberVisible({
                                        //     cardNumberVisible: false,
                                        // }));
                                    }
                                    else{
                                        // dispatch(setCardNumberVisible({
                                        //     cardNumberVisible: false,
                                        // }));
                                    }
                                }}
                            />
                        </View>
                        <View style={{backgroundColor: '#01D167', width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 10, marginTop: -13, padding: 0, ...styles.shadow}}>
                            {/* A view for the actual card */}
                            <View style={{marginTop: 24, height: 21, marginRight: 24, alignItems:'flex-end'}}>
                                {/* View For Top Logo */}
                                <Image 
                                    style={{width: 74}}
                                    source={require("../assets/AspireLogo.png")}
                                    resizeMode='contain' 
                                />
                            </View>
                            <View style={{height: CARD_HEIGHT-89, flexDirection:'column', alignContent:'space-between'}}>
                                {/* Value of 89 is calculated as (margin top + height) of Aspire logo at top; +  (margin bottom + height) of VISA logo at the bottom */}
                                {/* View for card details like name, number, date */}
                                <View style={{flex: 1, justifyContent: 'center', marginLeft: 24}}>
                                    {/* View for User Name */}
                                    <Text style={{color:'white', fontWeight:'700', fontSize:22}}>{nameOnCard()}</Text>
                                </View>
                                <View style={{flex: 1, marginLeft: 24, alignContent: 'space-between'}}>
                                    {/* View for card number valid thru and cvv */}
                                    <View style={{height: 17, flex: 1}}>
                                        {/* View for Card Number */}
                                        {cardDisplayRender(cardDetailsDisplayed(), cardNumberForDisplay())}
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        {/* View for valid thru and cvv */}
                                        <Text style={{color:'white', fontWeight:'400', fontSize:16}}>Thru: {cardValidThru()}</Text>
                                        <Text style={{color:'white', fontWeight:'400', fontSize:15, marginLeft: 10}}>CVV: {cardCVV()}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{marginBottom: 24, marginRight: 24, height: 20, alignItems: 'flex-end'}}>
                                {/* View for bottom VISA logo */}
                                <Image 
                                    style={{width: 59}}
                                    source={require("../assets/VisaLogo.png")}
                                    resizeMode='contain' 
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{height: height-243-CARD_HEIGHT-32, marginTop: 26, marginBottom: 30, marginLeft: 24, marginRight: 24, width: width-48}}>
                        {/* Menu Options to be displayed here */}
                        {renderSpendingLimitBar(isSpendingLimitSet(), spendingLimitExhausted(), spendingLimit(), currencyUnits())}
                        <MenuItems />
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
    iconImage: {
        height: 16,
        width: 16,
        marginRight: 6,
    },
    bullets:{
        height: 8,
        width: 8,
        borderRadius: 8,
        margin: 4,
        backgroundColor: 'white',
    },
    shadow:{
        shadowColor: '#AAA',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 8,
    },
})
