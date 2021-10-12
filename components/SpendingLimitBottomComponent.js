import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const {width, height} = Dimensions.get('screen');

const SpendingLimitBottomComponent = () => {
    return (
        <View style={{height: height-153, backgroundColor:'#fff', borderRadius: 24, marginTop: 40}}>
            <View style={{flexDirection: 'column', marginLeft: 24, marginRight: 24, flex: 1}}>
                <View style={{backgroundColor: 'red', marginTop: 32, height: 101}}>
                    {/* View for Details and input */}
                </View>
                <View style={{backgroundColor: 'green', flex:1}}>
                    {/* View for Preset Button */}
                </View>
                <View style={{backgroundColor: 'blue', marginBottom: 24, height: 56}}>
                    {/* View for Save Button */}
                </View>
            </View>
        </View>
    )
}

export default SpendingLimitBottomComponent

const styles = StyleSheet.create({})
