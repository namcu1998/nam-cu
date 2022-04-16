import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, LogBox, Image } from "react-native";
import io from "socket.io-client";
import { images, icons, FONTS, COLORS, SIZES, lottiefiles } from "./constants";

LogBox.ignoreLogs(["Setting a timer"]);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
    };
  }

  componentDidMount() {
    const socket = io("http://192.168.1.5:3000/web_app");

    socket.on("send_all_data", (data) => {
      this.setState({
        loading: false,
        data: data,
      });
    });
  }

  render() {
    const show_screen = () => {
      const { connected, sensor, sensor_board_information } =
        this.state.data.sensor_board;

      console.log(
        "-----------------------------------------------------------------------------------------"
      );
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.status}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>ESP: </Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {connected ? "Connected" : "Disconnected"}
              </Text>
            </View>
            <View>
              <Image
                source={icons.ip}
                resizeMode="cover"
                style={{ width: 20, height: 20 }}
              />
            </View>
          </View>
          <Text></Text>
        </View>
      );
    };

    const show_loading_screen = () => {
      return <View style={styles.container}></View>;
    };

    return this.state.loading ? show_loading_screen() : show_screen();
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
    flexDirection: 'row',
  },
  status: {
    flexDirection: "row",
  },
});
