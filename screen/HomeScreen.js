import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { Header } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "../constants";
import io from "socket.io-client";

let socket;

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
    };
  }

  componentDidMount() {
    socket = io("https://nam-cu.herokuapp.com/web_app");

    socket.on("all_data", (data) => {
      this.setState({
        isLoading: false,
        data: [...data],
      });
    });
  }

  render() {

    const card = this.state.data.map((item) => {
      return (
        <TouchableOpacity
          key={item.id.toString()}
          style={styles.card}
          onPress={() => {
            this.props.navigation.navigate("Detail", {
              socket: socket,
              data: item
            });
          }}
        >
          <View style={styles.view_left}>
            <View style={[styles.cycle, {backgroundColor: item.connected ? '#3312FF': 'white'}]}></View>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 8, marginBottom: 5 }}>
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
      );
    });
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <LinearGradient
            colors={["#1A73E9", "#6C92F4"]}
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
                  data: this.state.data
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
        </View>
        <View style={styles.body}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            HomeScreen
          </Text>
          {this.state.isLoading === false && card}
        </View>
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
    backgroundColor: "#FEEBEB",
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    tintColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  background_icon: {
    width: 97,
    height: 40,
    flexDirection: "row",
    backgroundColor: "green",
    borderRadius: 20,
  },
  body: {
    marginTop: 20,
    alignItems: "center",
  },
  card: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: 'center'
  },
  view_left: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  cycle: {
    width: 10,
    height: 10,

    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3312FF'
  },
  view_right: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    //backgroundColor: 'blue'
  },
});

export default HomeScreen;
