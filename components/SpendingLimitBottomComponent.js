import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View, Image, TextInput, Alert, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { selectCardNumber, selectCurrencyUnits, setWeeklySpendingLimit, setWeeklySpendingLimitExhausted } from '../store/slices/debitCardSlice';
import debitCardDetailsAPI from '../api/debitCardDetailsAPI';
import { selectUserId } from '../store/slices/userSlice';

const {width, height} = Dimensions.get('screen');

const SpendingLimitBottomComponent = (props) => {
    
    let [number, onChangeNumber] = useState(null);
    let [isSaveButtonActive, setIsSaveButtonActive] = useState(false);
    let [indicatorDisplayed, setIndicatorDisplayed] = useState(false);

    const dispatchEvent = useDispatch();
    const currencyUnits = useSelector(selectCurrencyUnits);
    const cardNumber = useSelector(selectCardNumber);
    let userId = useSelector(selectUserId);
    const lastKnownLimit = "5,000";//Putting in dummy value as of now
    const presetValues = [5000, 10000, 20000];

    const onChangeNumberMiddle = (val) => {
        if(val == null || val.length == 0){
            setIsSaveButtonActive(false);
        }
        else{
            setIsSaveButtonActive(true);
        }
        onChangeNumber(val);
    }


    const createOneButtonAlert = (title, message) =>
        Alert.alert(
            title,
            message,
            [
                {
                text: "Go back.",
                onPress: () => {props.props.navigation.pop()},
                }
            ]
    );
    

    const updateSpendingLimitApi = async (number) => {
        if (number == null){
            return;
        } 

        const params = {
            userId: userId, //User ID for which Spending limit is being set
            cardNumber: cardNumber ,    //Card Number for which the Spending Limit is being set
            spendingLimit: number,  //the Spending Limit in Amount
        }

        //MARK: this line is used to contact one of the two mocked dumb APIs that return either success(90%) or failure(10%) in changing the limit
        let randomizedSucessfulApi = (Math.floor(Math.random() * 100) < 10) ? "/setSpendingLimitf" : "/setSpendingLimits";
        console.log("API CALL : "+randomizedSucessfulApi);
        console.log(params);

        const response = debitCardDetailsAPI.post(randomizedSucessfulApi, params)
        .then(response => {
            // Response is designed to be in the form of 
            // For: setSpendingLimitf -> {success: "false", reason: "You are not allowed to set spending limit. Contact your administrator", limitExhausted: -1}    //The setting/removal failed at backend due to a restriction by card manager
            // For: setSpendingLimits -> {success: "true", reason: "", limitExhausted: <numericalValue>} //Limit set successfully
            setIndicatorDisplayed(false);
            if(response.status != 200){
                return createOneButtonAlert("Error", "Error Encountered in Setting Spending Limit");
            }
            else{
                console.log(response.data);
                if(response.data.success != null){
                    if(response.data.success == "false" && response.data.reason != null && response.data.reason != ""){
                        return createOneButtonAlert("Error", response.data.reason);
                    }
                    else if(response.data.success == "true" && response.data.limitExhausted != null && response.data.limitExhausted != -1){
                        dispatchEvent(setWeeklySpendingLimit({
                            weeklySpendingLimit: number,
                        }));
                        dispatchEvent(setWeeklySpendingLimitExhausted({
                            weeklySpendingLimitExhausted: response.data.limitExhausted,
                        }));
                        props.props.navigation.pop();
                    }
                }
            }
        })
        .catch((error) => {
            console.log(response);
            console.log(error);
            setIndicatorDisplayed(false);
            return createOneButtonAlert("Error", "Error Encountered in Setting Spending Limit");
        });
        
    }

    const onSaveButtonPress = () => {
        console.log("Save Button Pressed For Amount = "+number);
        setIndicatorDisplayed(true);
        updateSpendingLimitApi(number);
    }

    return (
        <View>
        <View style={{height: (4*height)/5, backgroundColor:'#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: 0}}>
            <View style={{flexDirection: 'column', marginLeft: 24, marginRight: 24, flex: 1}}>
                <View style={{marginTop: 32, height: 122, flexDirection: 'column'}}>
                    {/* View for Details and input */}
                    <View style={{ marginTop: 0, height: 19, flexDirection: 'row'}}>
                        {/* View for Heading and icon */}
                        <Image
                            style={{
                                width: 16,
                                height: 16,
                                resizeMode: "contain",
                                marginRight:0,
                            }}
                            source={require("../assets/pickup-car.png")}
                        />
                        <Text style={{fontSize: 13, fontWeight: '400', marginLeft:8}}>Set a weekly debit card spending limit</Text>
                    </View>
                    <View style={{marginTop: 13, height: 33, flexDirection: 'row', alignContent: 'flex-start'}}>
                        {/* View for Input */}
                        <View style={{backgroundColor:'#01D167', borderRadius: 3, width: 40, height: 24, alignItems:'center', justifyContent:'center'}}>
                            {/* View of currency units */}
                            <Text style={{color:'#fff', fontSize: 16, fontWeight: '700'}}>{currencyUnits}</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumberMiddle}
                            value={number}
                            placeholder="Amount"
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={{backgroundColor:'#E5E5E5', height:0.5, marginTop: 5}}/>
                    {/* Grey Bar */}
                    <View style={{ marginBottom: 0, marginTop: 12.5, height: 40, maxWidth: 344, flexDirection: 'row', alignContent: 'flex-start'}}>
                        {/* View for Note */}
                        <Text style={{fontSize: 13, fontWeight: '300', color:'#22222266'}}>Here weekly means the last 7 days - not the calendar week</Text>
                    </View>
                </View>
                <View style={{marginTop: 25, height: 40, flexDirection: 'row'}}>
                    {/* View for Preset Buttons */}
                    <Button
                        title={currencyUnits+" "+presetValues[0]}
                        buttonStyle={{...styles.customButton, marginRight: 12}}
                        titleStyle={styles.buttonTitle}
                        onPress={() => {
                            onChangeNumberMiddle(''+presetValues[0]);
                        }}
                    />
                    <Button
                        title={currencyUnits+" "+presetValues[1]}
                        buttonStyle={{...styles.customButton, marginRight: 12}}
                        titleStyle={styles.buttonTitle}
                        onPress={() => {
                            onChangeNumberMiddle(''+presetValues[1]);
                        }}
                    />
                    <Button
                        title={currencyUnits+" "+presetValues[2]}
                        buttonStyle={{...styles.customButton, marginRight: 12}}
                        titleStyle={styles.buttonTitle}
                        onPress={() => {
                            onChangeNumberMiddle(''+presetValues[2]);
                        }}
                    />
                </View>
                <View style={{flex:1, marginBottom: 30, height: 56}}>
                    {/* View for Save Button */}
                    <View style={{flex:1}}>{/* A Blank View put up as a spacer */}</View>
                    <Button
                        title={"Save"}
                        buttonStyle={styles.saveButtonActive}
                        titleStyle={{color:"#FFF", fontSize: 16}}
                        disabled={!(isSaveButtonActive)}
                        onPress={onSaveButtonPress}
                    />
                </View>
            </View>
        </View>
        <View 
            style={indicatorDisplayed ? styles.loadingOverlay : {display: 'none'}}
        >
            <ActivityIndicator 
                size="large"
                color="#000"
            />
            <Text style={{textAlign:'center', fontSize: 15, fontWeight: '700'}}>Setting Spending Limit.</Text>
        </View>
    </View>
    )
}

export default SpendingLimitBottomComponent

const styles = StyleSheet.create({
    input: {
        height: 33,
        marginLeft: 12,
        marginTop: -3.5,
        marginRight: 0,
        marginBottom: 0,
        borderWidth: 0,
        fontWeight: 'bold',
        fontSize: 24,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'flex-start',
    },
    customButton: {
        backgroundColor: 'rgba(32,209,103,0.07)',
        borderRadius: 4,
        height: 40,
        width: (width-72)/3,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonTitle:{
        color: '#01D167',
        fontSize: 12,
        fontWeight: '600',
    },
    saveButtonActive: {
        height: 56,
        marginLeft: 33,
        marginRight: 33,
        backgroundColor: '#01D167',
        borderRadius: 30,
        alignItems:'center',
        justifyContent:'center',
    },
    loadingOverlay:{
        height:height, 
        width:width, 
        backgroundColor: 'rgba(0,0,0,0.25)', 
        position:'absolute', 
        alignContent:'center', 
        justifyContent:'center'
    },
})
