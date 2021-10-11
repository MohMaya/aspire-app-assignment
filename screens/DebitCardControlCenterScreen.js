import React from 'react'
import { StyleSheet, View, SafeAreaView, Image, Dimensions } from 'react-native'
import { Text } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
// import popUpCards from '../components/popUpCard';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../store/slices/navSlice';
import PopUpCard from '../components/PopUpCard';

const {width, height} = Dimensions.get('screen');

const DebitCardControlCenterScreen = () => {
    const dispatch = useDispatch();
    let currency = "S$"
    let availableBalance = "3,000"
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
            <PopUpCard />
        </SafeAreaView>
    )
}

export default DebitCardControlCenterScreen

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