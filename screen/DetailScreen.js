import { Text, View, StyleSheet, ScrollView, Dimensions, Button } from "react-native";
import React, { Component } from "react";
import { ValueComponent, ContentComponent } from "../components";
import { icons } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import ChangeScreenOrientation from "../ChangeScreenOrientation";
import { ChartComponent } from "../components";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryGroup, VictoryAxis, VictoryVoronoiContainer } from "victory-native";

export class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.route.params.data,
      displayMode: true
    };
  }

  componentDidMount() {
    this.props.route.params.socket.on("all_data", (data) => {
      data.map((item) => {
        if (this.state.data.id === item.id) this.setState({ data: item });
      });
    });

    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      ChangeScreenOrientation("PORTRAIT_UP");
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { data } = this.state;

    const gotoChartScreen = (value) => {
      this.props.navigation.navigate("Chart", {
        data: value,
      });
    };

    const renderData = (data) => {
      return data.data.map((item2, index2) => {
        return (
          this.state.displayMode ? <View
            key={item2.id.toString()}
            style={{
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
          <ValueComponent
            index={index2}
            name={item2.name}
            totalValue={100}
            time={item2.update_time}
            unit={item2.unit}
            valueState={item2.state_value}
            surplusValue={item2.current_value - item2.before_value}
            value={item2.current_value}
            before_value={item2.before_value}
            icon={icons[item2.id]}
            onPress={() => {
              gotoChartScreen(data.sensor[index].data[index2]);
            }}
          /> 
          </View> : <View key={item2.id.toString()}>
            <VictoryChart 
              domain={{y: [0, item2.current_value + 10]}}
              animate={{ duration: 500 }}
              theme={VictoryTheme.material}
            >
              <VictoryGroup 
                data={item2.data}
                x="update_time"
                y="current_value"
                labels={({ datum }) => `${datum.current_value}${item2.unit}`}
              >
                <VictoryLine/>
                <VictoryAxis dependentAxis={true} />
              </VictoryGroup>
              </VictoryChart>
          </View>
        );
      });
    };

    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{data.name}</Text>
        <LinearGradient colors={["#1A73E9", "#6C92F4"]} style={styles.header}>
          <Text style={{ color: "white" }}>
            ESP: {data.connected ? "Connected" : "Disconnected"}
          </Text>
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
          {data.sensor.map((item, index) => {
            return (
              <View
                key={item.id.toString()}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                
                <LinearGradient colors={["#1A73E9", "#6C92F4"]} style={styles.header}>
                  <Text
                    style={{
                      color: 'white'
                    }}
                  >
                    {item.name}: {item.connected === true ? "Connected" : "Disconnected"}
                  </Text>
                </LinearGradient>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: 10
                  }}
                >
                  <Button
                    onPress={() => {
                      this.setState({
                        displayMode: !this.state.displayMode
                      })
                    }}
                    title={this.state.displayMode ? 'Chart' : 'Value'}
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                  />
                </View>
                {renderData(item)}
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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
    elevation: 2
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
