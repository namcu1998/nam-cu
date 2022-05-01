import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
class RegScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      name: "",
      namespace: ""
    };
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}> Register </Text>
        <View style={styles.input_container}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Board name</Text>
          <TextInput 
            onChangeText={(text) => {this.setState({
              name: text
            })}} 
            value={this.state.name}
            placeholder='Board name' 
            style={styles.input} 
          />
          {this.state.name === '' ? <Text style={{color: "red"}}>Enter name please</Text> : null}
        </View>
        <View style={styles.input_container}> 
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Board space name</Text>
          <TextInput
            onChangeText={(text) => {
              let error_count = 0
              this.props.route.params.data.map(item => {
                if (item.namespace === text) error_count++;
              })
              if (error_count !== 0) this.setState({
                error: true
              })
              else this.setState({
                error: false
              })
              this.setState({
                namespace: text
              })
          }}
            value={this.state.namespace}
            placeholder='Board space name'
            style={styles.input} 
          />
          {this.state.error || this.state.namespace === '' ? <Text style={{color: "red"}}>Enter namespace please or namespace exist</Text> : null}
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
            onPress={() => {
              let error = 0;
              Object.entries(this.state).map(([key, value], i) => {
                if (this.state[key] === '') {
                  error++;
                };
              })
              if (error === 0 && this.state.error === false) {
                this.props.route.params.socket.emit("add_new_board", this.state);
                this.props.navigation.goBack();
              }
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
