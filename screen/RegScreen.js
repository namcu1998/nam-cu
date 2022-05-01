import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
class RegScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}> Register </Text>
        <View style={styles.input_container}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Board name</Text>
          <TextInput placeholder='Board name' style={styles.input} />
        </View>
        <View style={styles.input_container}> 
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Board space name</Text>
          <TextInput placeholder='Board space name' style={styles.input} />
        </View>
        <LinearGradient
          colors={['#92c25770', '#4ea0f2']}
          start={{x:1, y:0.5}}
          style={styles.button}
        >
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{fontWeight: 'bold'}}
            >CREATE</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '100%',
    height: 30,
    borderBottomWidth: 1,
    borderColor: '#00000070'
  },
  input_container: {
    width: '100%',
    marginTop: 10
  },
  button:{
    width: '100%',
    height: 50,
    borderRadius: 25,
    marginTop: 10
  }
})

export default RegScreen;
