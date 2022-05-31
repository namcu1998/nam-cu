import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { ChartComponent } from "../components";
import ChangeScreenOrientation from "../ChangeScreenOrientation";
export class ChartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data_props: this.props.route.params.data,
      labels: [],
      data: [],
    };
  }

  componentDidMount() {
    ChangeScreenOrientation('LANDSCAPE_RIGHT');
    if (this.state.data_props.data) {
      let new_labels = [];
      let new_data = [];
      let error = false;

      this.state.data_props.data.map((item) => {
        new_labels.push(item.update_time);
        new_data.push(item.current_value);
      });

      new_data.map(item => {
        if (item === null) error = true;
      }) 

      error === false && this.setState({
        isLoading: false,
        labels: new_labels,
        data: new_data,
      });
    }
  }

  componentWillUnmount() {
  }

  render() {
    // console.log(this.state.data_props);
    return (
      <View style={styles.container}>
        {this.state.isLoading === false ? (
            <ChartComponent
              chartName={this.state.data_props.name}
              labels={this.state.labels}
              data1={this.state.data}
              chartStyle="line"
              unit={this.state.data_props.unit}
            />
          ) : (
            <Text style={{color: 'white', fontSize: 24}}>Không có dữ liệu</Text>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "#292929",
    alignItems: "center",
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
});

export default ChartScreen;
