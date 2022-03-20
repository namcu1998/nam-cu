import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, LogBox, Image } from "react-native";
import io from "socket.io-client";
import { images, icons, FONTS, COLORS, SIZES, lottiefiles } from "./constants";

LogBox.ignoreLogs(["Setting a timer"]);

const socket = io("https://nam-cu.herokuapp.com/web_app");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor_board_information: {},
      sensor_data: {
        temp_value: 100,
        humi_value: 100,
      },
    };
  }

  componentDidMount() {
    // socket.on("send_all_data", (data) => {
    //   console.log("data: ", data);
    //   this.setState({
    //     sensor_board_information: { ...data },
    //   });
    // });

    // socket.on("temp_value", (value) => {
    //   const data = { ...this.state.sensor_data };

    //   data.temp_value = value;

    //   this.setState({
    //     sensor_data: { ...data },
    //   });
    // });

    // socket.on("humi_value", (value) => {
    //   const data = { ...this.state.sensor_data };

    //   data.humi_value = value;

    //   this.setState({
    //     sensor_data: { ...data },
    //   });
    // });
  }

  render() {
    console.log(this.state.sensor_board_information);

    const { sensor_board_information } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.status}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>ESP: </Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              {sensor_board_information.sensor_board_status
                ? "Connected"
                : "Disconnected"}
            </Text>
          </View>
          <View></View>
        </View>
        <Text>{sensor_board_information.ramLeft}</Text>
        <Image
          source={icons.ip}
          resizeMode="cover"
          style={{
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 10,
  },
  header: {
    height: 30,
    backgroundColor: "red",
    justifyContent: "center",
  },
  status: {
    flexDirection: "row",
  },
});
