import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrencyUnits, selectWeeklySpendingLimit, setWeeklySpendingLimit } from '../store/slices/debitCardSlice';


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


const MenuItems = props => {
    let spendingLimit = useSelector(selectWeeklySpendingLimit);
    let currencyUnits = useSelector(selectCurrencyUnits);
    let isSpendingLimitSet = (spendingLimit != null);
    const dispatch = useDispatch();

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
                    dispatch(setWeeklySpendingLimit({
                        weeklySpendingLimit: null,
                    }))
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
