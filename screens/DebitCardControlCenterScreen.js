import React, { Component, useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Image, Dimensions, Alert } from 'react-native'
import { Text, FAB } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
// import popUpCards from '../components/popUpCard';
// import { useDispatch } from 'react-redux';
import PopUpCard from '../components/PopUpCard';
import { selectAvailableBalance, selectCurrencyUnits, setCompleteCardDetails } from '../store/slices/debitCardSlice';
import { selectAppColorSolid, setAppColorSolid, setIsLoadingIndicatorDisplayed, setLoadingIndicatorText} from '../store/slices/appVariablesSlice';
import { setUserId } from '../store/slices/userSlice';
import { useNavigationState } from '@react-navigation/core';
import { useDispatch, useSelector, useStore } from 'react-redux';
import debitCardDetailsAPI from '../api/debitCardDetailsAPI';

const {width, height} = Dimensions.get('screen');

let dummyUserIDsList = [
                            "ee7bb6a818df311024b3a6e705e55945",
                            "e9ac92ba8f8223309904c773483e0b35",
                            "d32b8789f913925cb3b7d491a59e19fc",
                            "58a0723973209d6475b2b32e32ee8e7d",
                            "46f7b46f7f6552c36e1a61f59bfb79c6",
                            "4a9f64cbecd5b7bd5f7a7ce8b70a59ed",
                            "226358da2235a5097e45f13b3eb35213"
                        ]

let dummyUserIDsColorScheme = {
    "ee7bb6a818df311024b3a6e705e55945":"#000",
    "e9ac92ba8f8223309904c773483e0b35":"#aa0505",
    "d32b8789f913925cb3b7d491a59e19fc":"#01d167",
    "58a0723973209d6475b2b32e32ee8e7d":"#826a5f",
    "46f7b46f7f6552c36e1a61f59bfb79c6":"#2B3784",
    "4a9f64cbecd5b7bd5f7a7ce8b70a59ed":"#000",
    "226358da2235a5097e45f13b3eb35213":"#10369c"
}

const DebitCardControlCenterScreen = (props) => {
    const store = useStore();
    const dispatch = useDispatch();
    let state = store.getState()
    let currency = useSelector(selectCurrencyUnits);
    let availableBalance = useSelector(selectAvailableBalance);
    let appColorSolid = useSelector(selectAppColorSolid);

    const [cardDetails, setCardDetails] = useState([]);

    const manageLoadingIndicator = (displayFlag, message) => {
        dispatch(
            setIsLoadingIndicatorDisplayed({
                isLoadingIndicatorDisplayed: displayFlag,
            })
        )
        dispatch(
            setLoadingIndicatorText({
                loadingIndicatorText: message,
            })
        )
    }

    const cardDetailsApi = async (userId) => {
        if(userId == null){
            return;
        }
        const response = await debitCardDetailsAPI.get('/cardDetails/'+userId)
        .then()
        .catch((error) => {
            manageLoadingIndicator(false, "");
            return createOneButtonAlert("Error", "Error Encountered in fetching data");
            }
        );
        
        manageLoadingIndicator(false, "");
        if(response.status != 200){
            return;
        }
        else{
            let tempCardDetails = response.data;
            if(tempCardDetails.cardNumber != null){
                dispatch(
                    setCompleteCardDetails(response.data)
                );
                let tempCCode = dummyUserIDsColorScheme[userId];
                dispatch(
                    setAppColorSolid({
                        appColorSolid: tempCCode,
                    })
                )
                setCardDetails(response.data);  // The API returns just card details JSON in case of successfull query
            }
            else{
                return createOneButtonAlert("Error", "No Cards Registered for the your ID");
            }
        }
    }

    const fetchRandomCardDetails = () => {
        
        let randomIdx = Math.floor(Math.random() * dummyUserIDsList.length);
        dispatch(
            setUserId({
                userId: dummyUserIDsList[randomIdx],
            })
        )
        manageLoadingIndicator(true, "Fetching Debit Card Details");
        cardDetailsApi(dummyUserIDsList[randomIdx]);
    }

    useEffect(() => {
        fetchRandomCardDetails();
    }, []);


    const createOneButtonAlert = (title, message) =>
        Alert.alert(
            title,
            message,
            [
                {
                text: "OK",
                onPress: () => {},
                }
            ]
    );
    const paddingTop = (height > 700) ? 48 : 20;//Based on an observation in a bezelless android device
    return (
        <SafeAreaView style={styles.background}>
            <View style={tw `p-0`}>
                <View style={{paddingLeft:24, paddingTop: paddingTop}}>
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
                        <View style={{backgroundColor:appColorSolid, width:40, height:22, borderRadius: 4, alignItems:'center', justifyContent:'center'}}>
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
                onPress = {fetchRandomCardDetails}
                size="small"
                overlayColor={appColorSolid}
                color={appColorSolid}
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
    },
})