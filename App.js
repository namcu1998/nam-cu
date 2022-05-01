import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screen from './screen';
import React from "react";
import { View, LogBox, } from "react-native";
LogBox.ignoreLogs(["Setting a timer", 'Non-serializable values were found in the navigation state', 'Cant perform a React state update on an unmounted component']);

export default class App extends React.Component {
  render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={screen.HomeScreen} />
          <Stack.Screen name="Register" component={screen.RegScreen} />
          <Stack.Screen name="Detail" component={screen.DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
