import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { FONTS, COLORS, SIZES, images, icons } from "../constants";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";

export default class ChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      visible: false,
      _value: 0,
    };
  }

  async removeToolBar() {
    this.myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({
          ...this.state,
          visible: false,
        });
      }, 2000);
    });
  }

  render() {
    const { chartName, labels, data1, chartStyle, unit } = this.props;

    let data;
    const chartConfig = {
      backgroundColor: "#292929",
      backgroundGradientFrom: "#292929",
      backgroundGradientTo: "#292929",
      decimalPlaces: 10, // optional, defaults to 2dp
      color: (opacity = 1) => "#00ccff",
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      barPercentage: 0.3,
      propsForDots: {
        r: "2",
        strokeWidth: "2",
        stroke: "#ffa726",
      },
    };
    if (true) {
      data = {
        labels: [...labels],
        datasets: [
          {
            data: [...data1],
          },
        ],
      };
    }
    //console.log(this.state)

    return (
      <View style={{ backgroundColor: "#292929", alignItems: "center" }}>
        <ScrollView horizontal>
          <LineChart
            data={data}
            width={1000} // from react-native
            height={390}
            chartConfig={chartConfig}
            //  segments={20}
            formatYLabel={(value) => {
              const newValue = value.split(".")[0];
              return newValue.length < 3 ? `${newValue}${unit}` : newValue;
            }}
            bezier
            style={{
              marginTop: 8,
              borderRadius: 16,
            }}
            fromZero={true}
            fillShadowGradient="#ff5200"
            onDataPointClick={(data) => {
              const { x, y, visible, _value } = this.state;
              let isSamePoint = x === data.x && y === data.y;
              isSamePoint
                ? this.setState({
                    x: data.x,
                    y: data.y,
                    visible: !this.state.visible,
                    _value: data.index,
                  })
                : this.setState({
                    x: data.x,
                    y: data.y,
                    visible: true,
                    _value: data.index,
                  });
              // this.removeToolBar();
            }}
            decorator={() => {
              const { x, y, _value, visible } = this.state;
              const upData = data.datasets[0].data[_value];
              const date = data.labels[_value];
              return visible ? (
                <View>
                  <Svg>
                    <Rect
                      x={x - 70}
                      y={y + 30}
                      width="150"
                      height="70"
                      rx="10"
                      fill="white"
                    />
                    <TextSVG
                      x={x - 5}
                      y={y + 60}
                      fill="none"
                      stroke="purple"
                      fontSize="20"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {upData}
                      {unit}
                    </TextSVG>
                    <TextSVG
                      x={x + 5}
                      y={y + 82}
                      fill="none"
                      stroke="purple"
                      fontSize="20"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {date}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
          />
        </ScrollView>
      </View>
    );
  }
}
