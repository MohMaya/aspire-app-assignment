import React from 'react'
import { StyleSheet, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const SpendingLimitScreen = () => {
    return (
        <SafeAreaView style={styles.background}>
            <View style={tw `p-0`}>
                <View style={{paddingLeft:24, paddingRight: 24}}>
                    <View style={styles.container}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log("Back Button Tapped");
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
                </View>
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
