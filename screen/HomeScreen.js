import { Text, View } from "react-native";
import React, { Component } from "react";
import { Header } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';

export class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Header
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ["red", "pink"],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />
        <Text>HomeScreen</Text>
      </View>
    );
  }
}

export default HomeScreen;
