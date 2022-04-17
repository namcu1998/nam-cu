import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, LogBox, Image, ImageBackground } from "react-native";
import io from "socket.io-client";
import { images, icons, FONTS, COLORS, SIZES, lottiefiles } from "./constants";
import { LoadingAnimation, ContentComponent, ValueComponent } from "./components";

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
    const socket = io("https://nam-cu.herokuapp.com/web_app");

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
          <ImageBackground source={images.image1} resizeMode="cover" style={styles.image}>
            <View style={styles.header}>
              <View style={styles.status}>
                <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>ESP: </Text>
                <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
                  {connected ? "Connected" : "Disconnected"}
                </Text>
              </View>
              <View style={styles.status}>
                <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>DHT: </Text>
                <Text style={{ fontSize: 15, color: "white", fontWeight: "bold" }}>
                  {sensor[0].connected ? "Connected" : "Disconnected"}
                </Text>
              </View>
            </View>
            <View style={styles.body}>
              <View style={styles.information}>
                {sensor_board_information.map((item) => {
                  return (
                    <ContentComponent
                      key={item.id.toString()}
                      name={item.name}
                      unit={item.unit}
                      unit_name={item.unit_name}
                      value={item.value}
                      icon={icons[item.id]}
                    />
                  );
                })}
              </View>
              <View style={styles.sensor_value}>
                {sensor.map((item) => {
                  return item.data.map((item2, index) => {
                    return (
                      <ValueComponent
                        key={item2.id.toString()}
                        index={index}
                        name={item2.name}
                        totalValue={100}
                        time={item2.update_time}
                        unit={item2.unit}
                        valueState={item2.state_value}
                        surplusValue={item2.current_value - item2.before_value}
                        value={item2.current_value}
                        before_value={item2.before_value}
                        icon={icons[item2.id]}
                      />
                    );
                  })
                })}
              </View>
              
            </View>
          </ImageBackground>
        </View>
      );
    };

    const show_loading_screen = () => {
      return (
        <View style={styles.loading}>
          <LoadingAnimation
            image={images.image_transparent}
            x={200}
            y={30}
            size={500}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "yellow",
              left: "50%",
              top: "80%",
              transform: [{ translateX: -30 }],
            }}
          >
            Loading...
          </Text>
        </View>
      );
    };

    return this.state.loading ? show_loading_screen() : show_screen();
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#292929"
  },
  header: {
    marginTop: 30,
    height: 30,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  status: {
    flexDirection: "row",
  },
  loading: {
    backgroundColor: "#292929",
    width: "100%",
    height: "100%",
  },
  body: {
    height: '100%',
  },
  information: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SIZES.padding
  },
  sensor_value: {
    // backgroundColor: "black"
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: SIZES.padding
  },
  image: {
    width: "100%",
    height: "100%",
  }
});
