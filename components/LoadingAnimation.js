import React from 'react';
import { View, Text, Animated, Easing, TouchableOpacity } from 'react-native';
import { images } from '../constants';

export default class LoadingAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleX: true,
    }
    this.animatedValue1 = new Animated.Value(0)
    this.animatedValue2 = new Animated.Value(-1)
    //this.handleEventClick = this.handleEventClick.bind(this)
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.animate();
    }, this.props.delay)
    
    //console.log('render')
  }
  
  handleEventClick() {
    this.setState({
      scaleX: !this.state.scaleX,
    })
    this.animateScale()
  }
  
  animateScale() {
    this.animatedValue2 = new Animated.Value(this.state.scaleX ? -1 : 0)
    Animated.timing(this.animatedValue2, {
      toValue: this.state.scaleX ? 0 : 1,
      useNativeDriver: true,
      duration: 500
    }).start()
  }
  
  animate() {
    //this.animatedValue1 = new Animated.Value(-1);
    Animated.timing(
        this.animatedValue1,
        {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }
      ).start(() => {
          Animated.timing(
            this.animatedValue1,
            {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true
            }
          ).start(() => this.animate())
      })
      
    
  
      
      
    /*
    Animated.parallel([
      this.createAnimation(this.animatedValue1, 1000, Easing.ease),
      this.createAnimation(this.animatedValue2, 1000, Easing.ease),
    ]).start(() => this.animate())
    */
  }
  
  render() {
    const { image, x, y, size } = this.props;
    const move = this.animatedValue1.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 10, -10]
    })
    const scale = this.animatedValue2.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [-1, 1, -1]
    })
    
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.handleEventClick()}
        style={{
          position: 'absolute',
          top: x,
          left: y,
          zIndex: 0,
          transform: [
            {
              translateY: -50
            },
            {
              translateX: -80
            }
          ]
        }}
      >
        <Animated.Image
          source={image}
          resizeMode='contain'
          style={{
            width: size,
            height: size,
            transform: [
              {
                translateY: move
              },
              {
                scaleX: scale
              }
            ]
          }}
        />
      </TouchableOpacity>
      );
}
}