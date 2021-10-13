import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCardNumber, selectCurrencyUnits, selectWeeklySpendingLimit, setWeeklySpendingLimit, setWeeklySpendingLimitExhausted } from '../store/slices/debitCardSlice';
import { selectUserId } from '../store/slices/userSlice';
import debitCardDetailsAPI from '../api/debitCardDetailsAPI';


const renderButton = (buttonState) => {
    if(buttonState == -1){
        //No Button Present
        return (<View style={{display:'none'}}></View>);
    }
    else if(buttonState == 0){
        return (
            <View style={{
                alignItems: 'flex-end',
                flex:1
            }}>
                <Image
                    style={{
                        width: 34,
                        height: 20,
                    }}
                    source={require("../assets/toggle.png")}
                    resizeMode='contain'
                />
            </View>
        );
    }
    else if(buttonState == 1){
        return (
            <View style={{
                alignItems: 'flex-end',
                flex:1
            }}>
                <Image
                    style={{
                        width: 34,
                        height: 20,
                    }}
                    source={require("../assets/activeToggle.png")}
                    resizeMode='contain'
                />
            </View>
        );
    }
}

const createOneButtonAlert = (title, message) =>
        Alert.alert(
            title,
            message,
            [
                {
                text: "Go back.",
                onPress: () => {},
                }
            ]
    );



const MenuItems = props => {
    let spendingLimit = useSelector(selectWeeklySpendingLimit);
    let currencyUnits = useSelector(selectCurrencyUnits);
    let cardNumber = useSelector(selectCardNumber);
    let userId = useSelector(selectUserId);
    let isSpendingLimitSet = (spendingLimit != null && spendingLimit > 0);
    const dispatchEvent = useDispatch();

    let menuArr = [
        {
            key: "MenuItem#1",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Top-up account",                                    // The Title of the menu Item
            menuSubtitle: "Deposit money to your account to use with card", // The subtitle of the menu Item
            iconAssetUri: require("../assets/insight.png"),                             // Uri for the icon
            buttonState: -1,                                                //A parameter that suggest about the radio button -1: Hidden; 0: Button inactive; 1: Button active 
            itemEnabled: false,                                             //A Parameter that tells if the menu item is enabled, therefore touchable opacity behavior
        },
        {
            key: "MenuItem#2",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Weekly spending limit",                                    // The Title of the menu Item
            menuSubtitle: isSpendingLimitSet ? "Your weekly spending limit is "+currencyUnits+" "+spendingLimit : "You haven't set any spending limit on card", // The subtitle of the menu Item
            iconAssetUri: require("../assets/Transfer-2.png"),                             // Uri for the icon
            buttonState: isSpendingLimitSet ? 1 : 0,                                                //A parameter that suggest about the radio button -1: Hidden; 0: Button inactive; 1: Button active
            itemEnabled: true,                                             //A Parameter that tells if the menu item is enabled, therefore touchable opacity behavior
        },
        {
            key: "MenuItem#3",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Freeze card",                                    // The Title of the menu Item
            menuSubtitle: "Your debit card is currently active", // The subtitle of the menu Item
            iconAssetUri: require("../assets/Transfer-3.png"),                             // Uri for the icon
            buttonState: 0,                                                //A parameter that suggest about the radio button -1: Hidden; 0: Button inactive; 1: Button active
            itemEnabled: false,                                             //A Parameter that tells if the menu item is enabled, therefore touchable opacity behavior
        },
        {
            key: "MenuItem#4",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Get a new card",                                    // The Title of the menu Item
            menuSubtitle: "This deactivates your current debit card", // The subtitle of the menu Item
            iconAssetUri: require("../assets/Transfer-1.png"),                             // Uri for the icon
            buttonState: -1,                                                //A parameter that suggest about the radio button -1: Hidden; 0: Button inactive; 1: Button active
            itemEnabled: false,                                             //A Parameter that tells if the menu item is enabled, therefore touchable opacity behavior
        },
        {
            key: "MenuItem#5",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Deactivated cards",                                    // The Title of the menu Item
            menuSubtitle: "Your previously deactivated cards", // The subtitle of the menu Item
            iconAssetUri: require("../assets/Transfer.png"),                             // Uri for the icon
            buttonState: -1,                                                //A parameter that suggest about the radio button -1: Hidden; 0: Button inactive; 1: Button active
            itemEnabled: false,                                             //A Parameter that tells if the menu item is enabled, therefore touchable opacity behavior
        }
    ];

    const removeSpendingLimitApi = async () => {
        
        const params = {
            userId: userId, //User ID for which Spending limit is being set
            cardNumber: cardNumber ,    //Card Number for which the Spending Limit is being set
        }
    
        //MARK: this line is used to contact one of the two mocked dumb APIs that return either success(90%) or failure(10%) in changing the limit
        let randomizedSucessfulApi = (Math.floor(Math.random() * 100) < 10) ? "/removeSpendingLimitf" : "/removeSpendingLimits";
        console.log("API CALL : "+randomizedSucessfulApi);
        console.log(params);
    
        const response = debitCardDetailsAPI.post(randomizedSucessfulApi, params)
        .then(response => {
            // Response is designed to be in the form of 
            // For: setSpendingLimitf -> {success: "false", reason: "You are not allowed to remove spending limit. Contact your administrator", limitExhausted: -1}    //The setting/removal failed at backend due to a restriction by card manager
            // For: setSpendingLimits -> {success: "true", reason: "", limitExhausted: <numericalValue>} //Limit set successfully
            // setIndicatorDisplayed(false);
            if(response.status != 200){
                return createOneButtonAlert("Error", "Error Encountered in Removing Spending Limit");
            }
            else{
                console.log(response.data);
                if(response.data.success != null){
                    if(response.data.success == "true"){
                        dispatchEvent(setWeeklySpendingLimit({
                            weeklySpendingLimit: -1,
                        }));
                        dispatchEvent(setWeeklySpendingLimitExhausted({
                            weeklySpendingLimitExhausted: -1,
                        }));
                    }
                    else if(response.data.success == "false" && response.data.reason != null && response.data.reason != ""){
                        return createOneButtonAlert("Error", response.data.reason);
                    }
                }
            }
        })
        .catch((error) => {
            console.log(response);
            console.log(error);
            // setIndicatorDisplayed(false);
            return createOneButtonAlert("Error", "Error Encountered in Removing Spending Limit");
        });
        
    }

    const loadMenuItem = (menuKey, buttonState) => {
        switch(menuKey) {
            case "MenuItem#1":
                break;
            case "MenuItem#2":
                if(buttonState == 0){
                    //i.e. The Spending limit is not set ->  Open the Spending Limits screen
                    props.props.props.navigation.push('SpendingLimit');
                }
                else if(buttonState == 1){
                    //i.e. The Spending limit is already set, unset it
                    removeSpendingLimitApi();
                }
                
                break;
            case "MenuItem#3":
                break;
            case "MenuItem#4":
                break;
            case "MenuItem#5":
                break;
            default:
                //Do Nothing
                return
        }
    }

    return (
        <FlatList
            data={menuArr}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            loadMenuItem(item.key, item.buttonState);
                        }}
                        disabled={!(item.itemEnabled)}
                    >
                        <View style={styles.menuItem}>
                            <Image
                                style={{width: 32}}
                                source={item.iconAssetUri}
                                resizeMode='contain'
                            />
                            <View style={{flexDirection:'column', marginLeft:12}}>
                                <Text style={styles.menuTitle}>{item.menuTitle}</Text>
                                <Text style={styles.menuSubtitle}>{item.menuSubtitle}</Text>
                            </View>
                            {renderButton(item.buttonState)}
                        </View>
                    </TouchableOpacity>
                );
            }}
            scrollEnabled={false}
        />
    )
}

export default MenuItems

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        height: 41,
        marginTop: 22,
        alignContent: 'center',
        alignItems: 'center'
    },
    menuTitle: {
        height: 19,
        fontWeight: '400',
        fontSize:14,
        alignContent:'flex-start',
        flex:1,
        marginBottom: 2,
    },
    menuIcon: {
        width: 32,
        height: 32,
    },
    menuSubtitle:{
        height: 18,
        fontWeight: '300',
        fontSize: 12,
        color: 'rgba(34,34,34,0.4)'
    },
})
