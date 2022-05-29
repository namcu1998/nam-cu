import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FONTS, lottiefiles } from "../constants";
import LottieView from "lottie-react-native";
import Checkbox from 'expo-checkbox';

class RegScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      name: "",
      namespace: "",
      TIMERETURN: 2000,
      isShowDone: false,
      list_sensor: [
        {
          id: 1,
          name: "DHT11",
          isUsed: false
        },
        {
          id: 2,
          name: "BH1750",
          isUsed: false
        },
        {
          id: 3,
          name: "INA219B",
          isUsed: false
        },
        {
          id: 4,
          name: "CO2 VOC TVOC CCS811",
          isUsed: false
        },

      ]
    };

    this.setCheckBox = this.setCheckBox.bind(this);
  }

  returnHome = () => {
    return new Promise((res, rej) => {
      this.timeout = setTimeout(() => {
        this.props.navigation.goBack();
      }, this.state.TIMERETURN);
    });
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  setCheckBox(id) {
    let data = [...this.state.list_sensor];

    data.map(item => {

      if (item.id === id) {
        
        item.isUsed = !item.isUsed;

        return item;
      }

      return item;

    });

    this.setState({
      list_sensor: data,
    })
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.isShowDone && (
          <View style={styles.noti_box}>
            <LottieView
              source={lottiefiles.done}
              autoPlay
              style={{
                width: 200,
                height: 200,
              }}
            />
          </View>
        )}
        <View style={[styles.ic, {opacity: this.state.isShowDone ? 0.1 : 1}]}>
          <Text style={{ ...FONTS.Pacifico, fontSize: 30 }}> Register </Text>

          <View style={styles.input_container}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Board name</Text>
            <TextInput
              onChangeText={(text) => {
                this.setState({
                  name: text,
                });
              }}
              value={this.state.name}
              placeholder="Board name"
              style={styles.input}
            />
            {this.state.name === "" ? (
              <Text style={{ color: "red" }}>Enter name please</Text>
            ) : null}
          </View>

          <View style={styles.input_container}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Board space name
            </Text>
            <TextInput
              onChangeText={(text) => {
                let error_count = 0;
                this.props.route.params.data.map((item) => {
                  if (item.namespace === text) error_count++;
                });
                if (error_count !== 0)
                  this.setState({
                    error: true,
                  });
                else
                  this.setState({
                    error: false,
                  });
                this.setState({
                  namespace: text,
                });
              }}
              value={this.state.namespace}
              placeholder="Board space name"
              style={styles.input}
            />
            {this.state.error || this.state.namespace === "" ? (
              <Text style={{ color: "red" }}>
                Enter namespace please or namespace exist
              </Text>
            ) : null}
          </View>

          <View style={styles.input_container}>
              <Text style={{ fontSize: 20, fontWeight: "bold"}} >Choose Sensor</Text>

              <View style={styles.list_sensor}>
                {
                  this.state.list_sensor.map(item => {
                    return (
                      <LinearGradient
                        key={item.id.toString()}
                        style={styles.Checkbox}
                        colors={["#ffffff", "#ffffff"]}
                        start={{ x: 1, y: 0.5 }}
                      >

                        <Text style={{color: '#000000'}}>{item.name}</Text>

                        <Checkbox
                          style={{ marginLeft: 10}}
                          value={item.isUsed} 
                          color={item.isUsed ? 'blue' : 'red'}
                          onValueChange={() => {
                            this.setCheckBox(item.id)
                          }}
                        />

                      </LinearGradient>
                    );
                  })
                }
              </View>
          </View>

          <LinearGradient
            colors={["#92c25770", "#4ea0f2"]}
            start={{ x: 1, y: 0.5 }}
            style={styles.button}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                let error = 0;
                Object.entries(this.state).map(([key, value], i) => {
                  if (this.state[key] === "") {
                    error++;
                  }
                });
                if (error === 0 && this.state.error === false) {
                  this.props.route.params.socket.emit(
                    "add_new_board",
                    this.state
                  );
                  this.setState({
                    isShowDone: true,
                  });
                  this.returnHome();
                }
              }}
            >
              <Text style={FONTS.h1}>CREATE</Text>
            </TouchableOpacity>
          </LinearGradient>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  ic: {
    alignItems: "center",
    justifyContent: "center",

  },
  input: {
    width: "100%",
    height: 30,
    borderBottomWidth: 1,
    borderColor: "#00000070",
  },
  input_container: {
    width: "100%",
    marginTop: 10,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 25,
    marginTop: 10,
  },
  noti_box: {
    position: "absolute",
    top: Dimensions.get("window").height / 2,
    left: "50%",
    backgroundColor: "white",
    width: 200,
    height: 150,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    transform: [
      {
        translateX: -100,
      },
      {
        translateY: -75,
      },
    ],
    zIndex: 1000,
  },
  Checkbox: {
    flexDirection: 'row',
    backgroundColor: 'yellow',
    padding: 7,
    borderRadius: 17,
    marginTop: 10
  },
  list_sensor: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap'
  }
});

export default RegScreen;
