import React from 'react'
import { StyleSheet, Text, View, Dimensions, Animated, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames'

const {width, height} = Dimensions.get('screen');

const CARD_WIDTH = (width-48);  //Ensures that the currency notation and the card's left end align just like the mock up
const CARD_HEIGHT = 0.6*CARD_WIDTH; // Aspect Ratio of the card is 0.6 [h/w]

const POP_UP_HEIGHT = (height >= 844) ? 0.68*height : 0.66*height;

const PopUpCard = () => {
    let cardDetailsDisplayed = false
    
    return (
        <SafeAreaView style={{top:0, bottom:0, height:height, ...styles.behind}}>
            <ScrollView 
                style={{
                    top:0, 
                    bottom:0, 
                    backgroundColor: 'transparent',
                    width:width,
                }}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View style={{backgroundColor:'transparent', flex: 1, height: height-POP_UP_HEIGHT}}>
                    {/* A view that stays transparent */}
                </View>
                <View style={{backgroundColor: 'white', alignItems: 'center', height: POP_UP_HEIGHT, borderRadius: 18}}>
                    {/* The view that scrolls up if needed */}
                    <View style={{backgroundColor: 'transparent', flex: 1, width: CARD_WIDTH, height: CARD_HEIGHT+32, marginTop: -90}}>
                        {/* A view for the card image : Width is calculated as a percentage of the screen width as per shared design, height is calculated such as to maintain the aspect ratio */}
                        <View style={{backgroundColor: 'white', alignSelf:'flex-end', width: 151, height: 45, borderTopRightRadius: 6, borderTopLeftRadius: 6}}>
                            {/* A view for the "Show Card Number Button" */}
                            <Button
                                type="clear"
                                title = {(cardDetailsDisplayed) ? "Hide card number" : "Show card number"}
                                titleStyle = {{
                                    color: '#01D167',
                                    fontSize: 12,
                                    fontWeight: "600",
                                }}
                                icon={
                                    <Image 
                                        style={styles.iconImage}
                                        source={(cardDetailsDisplayed) ? require("../assets/eyeClosed.png") : require("../assets/eyeOpen.png")}
                                        resizeMode='contain' 
                                    />
                                }
                                onPress={() => {
                                    console.log("Card Details Displayed = "+cardDetailsDisplayed)
                                    if(cardDetailsDisplayed){
                                        cardDetailsDisplayed = false;
                                    }
                                    else{
                                        cardDetailsDisplayed = true;
                                    }
                                }}
                            />
                        </View>
                        <View style={{backgroundColor: '#01D167', alignItems: 'flex-end', width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 10, marginTop: -13}}>
                            {/* A view for the actual card */}
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        {/* Menu Options to be displayed here */}
                    </View>
                    <Text>Hello</Text>
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
    }
})
