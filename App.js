import { StatusBar } from 'expo-status-bar';
import React from "react";
import { StyleSheet, Text, View, LogBox } from 'react-native';
import io from "socket.io-client";

LogBox.ignoreLogs(["Setting a timer"]);

const socket = io("http://192.168.1.6:3000/web_app");

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sensor_board_information: {},
      sensor_data: {
        temp_value: 100,
        humi_value: 100
      }
    }
  }

  componentDidMount() {
    socket.on("send_all_data", (data) => {
      console.log("data: ", data)
      this.setState({
        sensor_board_information: {...data}
      });
    });

    socket.on("temp_value", (value) => {
      const data = {...this.state.sensor_data};

      data.temp_value = value;

      this.setState({
        sensor_data: {...data}
      });
    })

    socket.on("humi_value", (value) => {
      const data = {...this.state.sensor_data};

      data.humi_value = value;

      this.setState({
        sensor_data: {...data}
      });
    })

  }

  render() {
    console.log(this.state.sensor_board_information)
    return (
      <View style={styles.container}>
        <Text>{this.state.sensor_board_information.ramLeft}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
