import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

const MenuItems = () => {
    let spendingLimit = () => 5000;
    let currencyUnits = () => "S$";
    let isSpendingLimitSet = () => true;

    let menuArr = [
        {
            key: "MenuItem#1",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Top-up account",                                    // The Title of the menu Item
            menuSubtitle: "Deposit money to your account to use with card", // The subtitle of the menu Item
            iconAssetUri: require("../assets/insight.png"),                             // Uri for the icon
        },
        {
            key: "MenuItem#2",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Weekly spending limit",                                    // The Title of the menu Item
            menuSubtitle: isSpendingLimitSet() ? "Your weekly spending limit is "+currencyUnits()+" "+spendingLimit() : "You haven't set any spending limit on card", // The subtitle of the menu Item
            iconAssetUri: require("../assets/Transfer-2.png"),                             // Uri for the icon
        },
        {
            key: "MenuItem#3",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Freeze card",                                    // The Title of the menu Item
            menuSubtitle: "Your debit card is currently active", // The subtitle of the menu Item
            iconAssetUri: require("../assets/Transfer-3.png"),                             // Uri for the icon
        },
        {
            key: "MenuItem#4",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Get a new card",                                    // The Title of the menu Item
            menuSubtitle: "This deactivates your current debit card", // The subtitle of the menu Item
            iconAssetUri: require("../assets/Transfer-1.png"),                             // Uri for the icon
        },
        {
            key: "MenuItem#5",                                              // A unique key to supress the warning and optimize changes
            menuTitle: "Deactivated cards",                                    // The Title of the menu Item
            menuSubtitle: "Your previously deactivated cards", // The subtitle of the menu Item
            iconAssetUri: require("../assets/Transfer.png"),                             // Uri for the icon
        }
    ];

    return (
        <FlatList
            data={menuArr}
            renderItem={({item}) => {
                return (
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
                    </View>
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
