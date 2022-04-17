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
    const { chartName, labels, data1, data2, chartStyle, unit } = this.props;

    let data;
    const chartConfig = {
      backgroundColor: "#292929",
      backgroundGradientFrom: "#292929",
      backgroundGradientTo: "#292929",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => "#00ccff",
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      barPercentage: 0.3,
      propsForDots: {
        r: "0",
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
          {
            data: [...data2],
          },
        ],
      };
    }
    //console.log(this.state)

    const render_line_chart = () => {
      return (
        <View>
          <Text style={{ color: COLORS.white, ...FONTS.h1 }}>
            {" "}
            {chartName}{" "}
          </Text>
          <ScrollView horizontal>
            <LineChart
              data={data}
              width={Dimensions.get("window").width} // from react-native
              height={275}
              //yAxisLabel="$"
              //yAxisSuffix={unit}
              //yLabelsOffset={0}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={chartConfig}
              //verticalLabelRotation={0}
              segments={15}
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
                this.removeToolBar();
              }}
              decorator={() => {
                const { x, y, _value, visible } = this.state;
                const upData = data.datasets[0].data[_value];
                const downData = data.datasets[1].data[_value];
                return visible ? (
                  <View>
                    <Svg>
                      <Rect
                        x={x}
                        y={y - 500}
                        width="3"
                        height="1000"
                        fill="blue"
                      />
                      <TextSVG
                        x={x + 5}
                        y={y + 30}
                        fill="white"
                        fontSize="16"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {upData}
                        {unit}
                      </TextSVG>
                      {upData !== downData && (
                        <TextSVG
                          x={x + 5}
                          y={y + 50}
                          fill="white"
                          fontSize="16"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {downData}
                          {unit}
                        </TextSVG>
                      )}
                    </Svg>
                  </View>
                ) : null;
              }}
            />
          </ScrollView>
        </View>
      );
    };

    const render_bar_chart = () => {
      return (
        <View>
          <Text style={{ color: COLORS.white, ...FONTS.h1 }}>
            {" "}
            {chartName}{" "}
          </Text>
          <ScrollView horizontal>
            <BarChart
              data={data}
              width={Dimensions.get("window").width * 1} // from react-native
              height={220}
              //yAxisLabel="$"
              //yAxisSuffix={unit}
              yAxisInterval={10} // optional, defaults to 1
              chartConfig={chartConfig}
              bezier
              fromZero={true}
              showValuesOnTopOfBars={false}
              withInnerLines={false}
              showBarTops={true}
              style={{
                marginTop: 8,
                borderRadius: 16,
              }}
            />
          </ScrollView>
        </View>
      );
    };

    return chartStyle === "line" ? render_line_chart() : render_bar_chart();
  }
}
