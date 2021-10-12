// Having to add this stack as parent even though it seems counter intuitive since it is the recommended way as per https://reactnavigation.org/docs/hiding-tabbar-in-screens/
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SpendingLimitScreen from '../screens/SpendingLimitScreen';
import Tabs from './Tabs';



const navStackParent = createNativeStackNavigator();



const NavStack = () => {
    return (
        <navStackParent.Navigator
        initialRouteName='Tabs'
        screenOptions={{
            headerShown: false,
        }}
      >
        <navStackParent.Screen
        // This will house all the screen that ought to have tab bar visible on them.
          name="Tabs"
          component={Tabs}
        />
        <navStackParent.Screen
          name="SpendingLimit"
          component={SpendingLimitScreen}
        />
      </navStackParent.Navigator>
    )
}

export default NavStack

const styles = StyleSheet.create({})
