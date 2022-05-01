import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { ValueComponent, ContentComponent } from "../components";
import { icons } from "../constants";
import { LinearGradient } from "expo-linear-gradient";

export class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.route.params.data,
    };
  }

  componentDidMount() {
    this.props.route.params.socket.on("all_data", (data) => {
      data.map((item) => {
        if (this.state.data.id === item.id) this.setState({ data: item });
      });
    });
  }
  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{data.name}</Text>
        <LinearGradient colors={["#1A73E9", "#6C92F4"]} style={styles.header}>
          <Text style={{color: 'white'}} >ESP: {data.connected ? "Connected" : "Disconnected"}</Text>
          {data.sensor.map((item) => {
            return (
              <Text style={{color: 'white'}} key={item.id.toString()}>
                {item.name}: {item.connected ? "Connected" : "Disconnected"}
              </Text>
            );
          })}
        </LinearGradient>
        <View style={styles.informtion}>
          {data.sensor_board_information.map((item) => {
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
        <View style={styles.sensor_data}>
          {data.sensor.map((item) => {
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
            });
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: "center",
    marginHorizontal: 5,
  },
  informtion: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sensor_data: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
  },
});

export default DetailScreen;
