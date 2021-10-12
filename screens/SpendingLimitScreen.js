import React from 'react'
import { StyleSheet, View, SafeAreaView, Image, Dimensions, TouchableOpacity, Text } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import SpendingLimitBottomComponent from '../components/SpendingLimitBottomComponent'

const SpendingLimitScreen = (props) => {
    
    return (
        <SafeAreaView style={styles.background}>
            <View style={tw `p-0`}>
                <View style={{paddingLeft:24, paddingRight: 24}}>
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.pop();
                            }}
                        >
                            <Image
                                style={{
                                    width: 25,
                                    height: 25,
                                    resizeMode: "contain",
                                    marginLeft:0,
                                }}
                                source={require("../assets/arrowLeft.png")}
                            />
                        </TouchableOpacity>
                        <View style={{flex:1}}>
                            {/* A Space bar in between */}
                        </View>
                        <Image
                            style={{
                                width: 25,
                                height: 25,
                                resizeMode: "contain",
                                marginRight:0,
                            }}
                            source={require("../assets/Logo.png")}
                        />
                    </View>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:24, marginTop: 19}}>Spending limit</Text>
                </View>
                <SpendingLimitBottomComponent />
            </View>
        </SafeAreaView>
    )
}

export default SpendingLimitScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignContent: 'space-between',
        marginLeft: 0,
        marginRight: 0,
    },
    background: {
        backgroundColor: '#0C365A',
        flex:1
    },
})
