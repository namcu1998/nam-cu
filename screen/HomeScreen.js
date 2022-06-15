import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Alert,
} from "react-native";
import {
  registerForPushNotificationsAsync,
  unregisterForPushNotificationsAsync,
  schedulePushNotification,
} from "../Notification";
import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { FONTS, icons, images, lottiefiles } from "../constants";
import io from "socket.io-client";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";
import PagerView from "react-native-pager-view";

let socket;
export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      isRegistered: false,
      status: null,
      show_setting: false,
      image_list: [
        {
          id: 0,
          path: require("../assets/images/image1.jpg"),
        },
        {
          id: 1,
          path: require("../assets/images/image2.jpg"),
        },
        {
          id: 2,
          path: require("../assets/images/image3.png"),
        },
        {
          id: 3,
          path: require("../assets/images/wp7823331-anime-transparent-wallpapers.png"),
        },
        {
          id: 4,
          path: require("../assets/images/IMG_20220602_204713.jpg"),
        },
        {
          id: 5,
          path: require("../assets/images/IMG_20220606_235039.jpg"),
        },
        {
          id: 6,
          path: require("../assets/images/IMG_20220606_235423.jpg"),
        },
        {
          id: 7,
          path: {uri: 'https://mfiles.alphacoders.com/781/781524.jpg'},
        },
      ],
      image_background: require("../assets/images/image3.png"),
      numberOfPage: 0,
      network_state: true,
      number_pass: 23051998,
      job_information: {},
      changePage: true
    };
  }

  componentDidMount() {
    this.gd();
    socket = io("https://nam-cu.herokuapp.com/web_app");
    socket.on("all_data", (data) => {
      this.setState({
        isLoading: false,
        data: [...data],
      });
    });

    socket.on("sensor_status", async (data) => {
      await schedulePushNotification(
        data.sensor_name,
        data.sensor_status === "true" ? "Connected" : "Disconnected"
      );
    });

    socket.on("board_status", async (data) => {
      await schedulePushNotification(
        data.board_name,
        data.board_status === true ? "Connected" : "Disconnected"
      );
    });
    registerForPushNotificationsAsync();
    this.getData();
    const network_status = Network.getNetworkStateAsync();

    if (network_status.isConnected === false) {
      this.setState({
        network_state: false,
      });
      schedulePushNotification("Ngắt kết nối", "No internet");
    }

    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.gd();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  scrollToTop = (id) => {
    this.state.data.map((item) => {
      if (item.id == id) {
        this[id].scrollTo({ x: 0, y: 0 });
      }
    });
  };

  storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@background_id", value.toString());
    } catch (e) {
      // saving error
    }
  };

  gd = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@job_information");
      this.setState({
        job_information: jsonValue != null ? JSON.parse(jsonValue) : {
          Error: 'No data'
        },
      });
    } catch (e) {
      // error reading value
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@background_id");
      if (value !== null) {
        this.state.image_list.map((item) => {
          if (item.id === parseInt(value)) {
            this.setState({
              image_background: item.path,
            });
          }
        });
      }
    } catch (e) {
      // error reading value
    }
  };

  render() {

    const detele_card = (id) => {
      socket.emit("delete", id);
    };

    const card = this.state.data.map((item) => {
      return (
        <ScrollView
          key={item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={[
            styles.card_container,
            // { display: this.state.numberOfPage === 1 ? "flex" : "none" },
          ]}
          ref={(scroller) => {
            this[item.id] = scroller;
          }}
          onScroll={async () => {
            return new Promise((res, rej) => {
              this._timeout = setTimeout(() => {
                this.scrollToTop(item.id);
              }, 2000);
            });
          }}
        >
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              this.props.navigation.navigate("Detail", {
                socket: socket,
                data: item,
              });
            }}
          >
            <View style={styles.view_left}>
              <View
                style={[
                  styles.cycle,
                  { backgroundColor: item.connected ? "#3312FF" : "white" },
                ]}
              ></View>
              <Text
                style={{
                  fontSize: 24,
                  marginLeft: 8,
                  marginBottom: 5,
                }}
              >
                {item.name}
              </Text>
            </View>
            <View style={styles.view_right}>
              <Image
                source={icons.right_arrow}
                style={{
                  resizeMode: "contain",
                  width: 18,
                  height: 18,
                  tintColor: "#00000080",
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.delete}
            onPress={() => {
              Alert.alert("Delete item", "Do you want delete item", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "OK", onPress: () => detele_card(item.id) },
              ]);
            }}
          >
            <Image
              source={icons.recycle}
              style={{
                resizeMode: "contain",
                width: 30,
                height: 30,
                tintColor: "white",
              }}
            ></Image>
          </TouchableOpacity>
        </ScrollView>
      );
    });

    const renderJobInformation = () => {
      const data = { ...this.state.job_information };
      let elementArray = [];

      for (var key in data) {
        if (
          data.hasOwnProperty(key) &&
          data[key] !== "" &&
          typeof data[key] !== "object"
        ) {
          elementArray.push(
            <View
              key={key}
              style={{
                alignItems: "center",
                marginTop: 10,
                justifyContent: "center",
                backgroundColor: "green",
                borderRadius: 20,
                padding: 10
              }}
            >
              <Text style={{ color: "#ffffff70" }}>{key}</Text>
              <Text style={{ color: "white" }}>{data[key]}</Text>
            </View>
          );
        } else {
          // console.log(data[key])
        }
      }

      return elementArray;
    };

    const renderMachineNeedHandle = () => {
      if (this.state.job_information["machinelist"]) {
        const data = [...this.state.job_information["machinelist"]];

        return data.map((item, index) => {
          return (
            <ScrollView showsVerticalScrollIndicator={false} key={index.toString()}>
              {renderAllElement(item)}
            </ScrollView>
          );
        });
      }
    };

    const renderAllElement = (data) => {
      let elementArray = [];

      for (var key in data) {
        if (
          data.hasOwnProperty(key) &&
          data[key] !== "" &&
          typeof data[key] !== "object"
        ) {
          elementArray.push(
            <View
              key={key}
              style={{
                alignItems: "center",
                marginTop: 10,
                justifyContent: "center",
                backgroundColor: "green",
                borderRadius: 20,
                padding: 10
              }}
            >
              <Text style={{ color: "#ffffff70" }}>{key}</Text>
              <Text style={{ color: "white" }}>{data[key]}</Text>
            </View>
          );
        }
      }

      return elementArray;
    };

    return (
      <View style={styles.container}>

        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height * 1.2,
            position: "absolute",
            zIndex: -1,
          }}
        >
          <ImageBackground
            source={this.state.image_background}
            style={{
              resizeMode: "cover",
              flex: 1,
            }}
          />
        </View>

        {this.state.show_setting && (
          <ScrollView
            style={styles.setting_view}
            showsVerticalScrollIndicator={false}
          >
            {this.state.image_list.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id.toString()}
                  style={{
                    width: 180,
                    height: 110,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                  onPress={() => {
                    this.storeData(item.id);
                    this.setState({
                      image_background: item.path,
                    });
                  }}
                >
                  <Image
                    source={item.path}
                    style={{
                      resizeMode: "cover",
                      width: 180,
                      height: 110,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        <View style={styles.header}>

          <LinearGradient
            colors={["#1DDE7D", "#72DFC5"]}
            start={{ x: 0.5, y: 0.0 }}
            style={styles.background_icon}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "100%",
                paddingLeft: 20,
                paddingRight: 10,
              }}
              onPress={() => {
                this.props.navigation.navigate("Register", {
                  socket: socket,
                  data: this.state.data,
                });
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 14 }}
              >
                ADD
              </Text>
              <Image source={icons.add_icon} style={styles.icon} />
            </TouchableOpacity>
          </LinearGradient>

          <View style={{ flexDirection: "row" }}>

            <LinearGradient
              colors={["#1A73E9", "#6C92F4"]}
              start={{ x: 0.5, y: 0.0 }}
              style={[styles.setting_icon]}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Search");
                }}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image source={icons.search} style={styles.icon} />
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={["#1A73E9", "#6C92F4"]}
              start={{ x: 0.5, y: 0.0 }}
              style={[
                styles.setting_icon,
                { display: this.state.network_state ? "none" : "flex" },
              ]}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image source={icons.network_poor} style={styles.icon} />
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={["#1A73E9", "#6C92F4"]}
              start={{ x: 0.5, y: 0.0 }}
              style={styles.setting_icon}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
                onPress={() => {
                  if (this.state.numberOfPage >= 2) {
                    this.setState({
                      numberOfPage: 0,
                    });
                  } else {
                    this.setState({
                      numberOfPage: this.state.numberOfPage + 1,
                    });
                  }
                }}
              >
                {this.state.numberOfPage === 0 && <Image source={icons.ic} resizeMode='contain' style={{width: 50, height: 50}}/>}
                {this.state.numberOfPage !== 0 && <Text style={{ fontSize: 20, color: "white" }}>{this.state.numberOfPage}</Text>}

              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={["#1A73E9", "#6C92F4"]}
              start={{ x: 0.5, y: 0.0 }}
              style={styles.setting_icon}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
                onPress={() => {
                  this.setState({
                    show_setting: !this.state.show_setting,
                  });
                }}
              >
                <Image source={icons.setting_icon} style={styles.icon} />
              </TouchableOpacity>
            </LinearGradient>

          </View>
        </View>

        {this.state.numberOfPage === 2 && (
          <View style={{alignItems: 'flex-end', marginTop: 5}}>
            <TouchableOpacity onPress={() => {this.setState({changePage: !this.state.changePage})}}>
              <LinearGradient colors={["#1A73E9", "#6C92F4"]} style={{width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={icons.exchange} resizeMode="contain" style={{width: 25, height: 25, tintColor: 'white'}}/>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
        
        {this.state.numberOfPage === 1 && (
          <View style={styles.body_1}>
            {this.state.isLoading === false ? (
              card
            ) : (
              <LottieView
                source={lottiefiles.loading}
                autoPlay
                loop
                style={{
                  width: 400,
                  height: 400,
                }}
              />
            )}
          </View>
        )}

        {this.state.numberOfPage === 2 && this.state.changePage && (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.body_2}
          >
            {renderJobInformation()}
          </ScrollView>
        )}

        {this.state.numberOfPage === 2 && this.state.changePage === false && (
          <PagerView initialPage={0} style={{ flex: 1 }}>
            {renderMachineNeedHandle()}
          </PagerView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: 50,
    paddingHorizontal: 30,
    // backgroundColor: "#FEEBEB",
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    tintColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  background_icon: {
    width: 97,
    height: 40,
    flexDirection: "row",
    backgroundColor: "green",
    borderRadius: 20,
  },
  setting_icon: {
    width: 40,
    height: 40,
    backgroundColor: "green",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    overflow: 'hidden'
  },
  body_1: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  body_2: {
    flex: 1
  },
  card_container: {
    width: Dimensions.get("window").width - 60,
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 25,
    marginTop: 10,
    overflow: "hidden",
  },
  card: {
    width: Dimensions.get("window").width - 60,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  delete: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  view_left: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cycle: {
    width: 10,
    height: 10,

    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3312FF",
  },
  view_right: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    //backgroundColor: 'blue'
  },
  setting_view: {
    position: "absolute",
    top: 50,
    left: 120,
    width: 200,
    height: 380,
    backgroundColor: "white",
    zIndex: 1000,
    borderRadius: 10,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  boldText: {
    color: "white",
  },
});

export default HomeScreen;
