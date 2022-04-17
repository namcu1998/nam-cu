import React from 'react';
import { View, Text, StyleSheet, Animated, Image, Easing, TouchableOpacity } from 'react-native';

export default class SwitchToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClick: this.props.isActive
    }
    this.animated1 = new Animated.Value(0);
    this.animated2 = new Animated.Value(0);
  }
  
  componentDidMount() {
    this.animate();
  }
  
  _handleEventClick() {
    this.setState({
      isClick: !this.state.isClick
    }, () => {
      this.animate();
    })
  }
  
  animate() {
    this.Animated = new Animated.Value(this.state.isClick ? -1 : 0);
    //this.animated2 = new Animated.Value(this.state.isClick ? -1 : 0);
    Animated.parallel([
      Animated.timing(this.animated1, {
        toValue: this.state.isClick ? 0 : 1,
        duration: 500,
        useNativeDriver: true
      }),
      
    ]).start()
  }
  
  render() {
    const move = this.animated1.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 30, 0]
    })
    const _move = this.animated1.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [-30, 0, -30]
    })
    const _move_ = this.animated1.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 30, 0]
    })
    
    //console.log(this.state.isClick)
    
    return (
      <TouchableOpacity
        onPress={() => {
          this._handleEventClick()
          this.props.onPress && this.props.onPress()
        }}
        activeOpacity={1}
      >
        <Animated.View style={[styles.container, {
          //backgroundColor: color
        }]}>
          <Animated.View
            style={[styles.backgroundView, {
              transform: [
                {
                  translateX: _move
                }
              ]
            }]}
          >
          </Animated.View>
          <Animated.View
            style={[styles.backgroundView1, {
              transform: [
                {
                  translateX: _move_
                }
              ]
            }]}
          >
          </Animated.View>
          <Animated.View style={[styles.point, {
            transform: [
              {
                translateX: move
              }
            ]
          }]}>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 60,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 5,
    overflow: 'hidden',
    
  },
  point: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'blue',
    zIndex: 2,
    
  },
  backgroundView: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    height: 30,
    borderRadius: 15,
    width: 60,
    zIndex: 1
  },
  backgroundView1: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'green',
    height: 30,
    borderRadius: 15,
    width: 60,
    zIndex: 0
  }
})