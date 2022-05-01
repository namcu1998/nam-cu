import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { Header } from "@rneui/themed";
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from "../constants";

export class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <LinearGradient
            colors={['#1A73E9', '#6C92F4']}
            start={{ x: 0.5, y:0.0 }}
            style={styles.background_icon}
          >
          <TouchableOpacity 
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              paddingLeft: 20,
              paddingRight: 10
            }}
            onPress={() => {this.props.navigation.navigate('Register')}}
          >
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>ADD</Text>
            <Image 
              source={icons.add_icon}
              style={styles.icon}
            />
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={styles.body}>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold'
          }}>HomeScreen</Text>
          <View style={styles.card}>
            <View style={styles.view_left}>
              <View style={styles.cycle}>
              </View>
             <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 8}}>Room 1</Text>
            </View>
            <View style={styles.view_right}>
              <Image
                source={icons.right_arrow}
                style={{
                  resizeMode: 'contain',
                  width: 18,
                  height: 18,
                  tintColor: '#00000080'
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingTop: 50,
    paddingHorizontal: 30,
    backgroundColor: '#FEEBEB'
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    tintColor: "#fff"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  background_icon: {
    width: 97,
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'green',
    borderRadius: 20
  },
  body: {
    marginTop: 20,
    alignItems: 'center'
  },
  card: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 10
  },
  view_left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cycle: {
    width: 10,
    height: 10,
    backgroundColor: '#3312FF',
    borderRadius: 20,
  },
  view_right: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    //backgroundColor: 'blue'
  }
})

export default HomeScreen;
