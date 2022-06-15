import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { FONTS, COLORS, SIZES, images, icons, lottiefiles } from "../constants";
import LottieView from "lottie-react-native";
export default class ValueComponent extends React.Component {
  render() {
    const {
      index,
      name,
      totalValue,
      time,
      value,
      before_value,
      unit,
      icon,
      valueState,
      surplusValue,
      navigation,
      onPress
    } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onPress()}
        style={{
          backgroundColor: "white",
          borderColor: "white",
          borderRadius: SIZES.radius,
          borderWidth: 0,
          width: 300,
          paddingVertical: SIZES.padding / 2,
          paddingHorizontal: SIZES.padding / 2,
          margin: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: '100%',
            // backgroundColor: 'blue'
          }}
        >
          <View
            style={{
              flex: 0.3,
            }}
          >
            <Image
              source={icon}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
                // tintColor: "white",
              }}
            />
          </View>
          <View
            style={{
              // flex: 0.7,
            }}
          >
            <Text style={{ ...FONTS.h3, color: "#000" }}>{name}</Text>
            <Text style={{ ...FONTS.h4, color: "#000" }}>{time}</Text>
          </View>
        </View>
        <View
          style={{
            paddingTop: SIZES.padding,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ ...FONTS.vndi01, fontSize: 40 , color: "#000" }}>
            {value}
            {value < 10000 ? unit : null}
          </Text>
        </View>
        <View
          style={{
            paddingTop: SIZES.padding,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: COLORS.black, ...FONTS.h4 }}>
            {before_value}
            {unit} |{" "}
            {surplusValue > 0
              ? `+${surplusValue}${unit}`
              : `${surplusValue}${unit}`}
          </Text>
          {valueState === "UP" ? (
            <View
              style={{
                transform: [
                  {
                    translateY: 1,
                  },
                ],
              }}
            >
              <LottieView
                source={lottiefiles.going_up}
                autoPlay
                colorFilters={[
                  {
                    keypath: "loop",
                    color: "red",
                  },
                ]}
                loop
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                transform: [
                  {
                    rotateZ: "180deg",
                  },
                  {
                    translateY: -1,
                  },
                ],
              }}
            >
              <LottieView
                source={lottiefiles.going_up}
                autoPlay
                loop
                style={{
                  width: 50,
                  height: 50,
                }}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const Style = StyleSheet.create({
  container: {
    height: 150,
    width: 150,
    borderRadius: 20,
    backgroundColor: "blue",
    opacity: 1,
    overflow: "hidden",
  },
  header: {
    height: "30%",
    width: 150,
    backgroundColor: "blue",
  },
  content: {
    height: "70%",
    width: 150,
    backgroundColor: "yellow",
  },
  title: {
    fontSize: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "200",
  },
});
