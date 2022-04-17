import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { FONTS, COLORS, SIZES, images, icons, lottiefiles } from '../constants';
import LottieView from 'lottie-react-native'
export default class ValueComponent extends React.Component {
	render() {
		const { index, name, totalValue, time, value, before_value, unit, icon, valueState, surplusValue, navigation } = this.props;
		return(
			<TouchableOpacity
            activeOpacity={1}
            // onPress={() => navigation.navigate('Detail', {
            //   value,
            //   name,
            //   unit,
            //   totalValue,
            // })}
				    style={{
				      backgroundColor: '#ffffff50',
				      borderWidth: 2,
				      borderColor: '#ffffff50',
				      borderRadius: SIZES.radius,
				      width: 160,
				      paddingVertical: SIZES.padding,
				      paddingHorizontal: SIZES.padding,
				      margin: 5
				    }}
				  >
				    <View
				      style={{
				        flexDirection: 'row',
				        alignItems: 'center'
				      }}
				    >
				      <Image
				        source={icon}
				        resizeMode='contain'
				        style={{
				          height: 18,
				          width: 18,
				          tintColor: 'white'
				        }}
				      /> 
				      <View
				        style={{
				          marginLeft: SIZES.base
				        }}
				      >
				        <Text style={{...FONTS.h3, color: '#fff'}}>{name}</Text>
				        <Text style={{...FONTS.h4, color: '#fff'}}>{time}</Text>
				      </View>
				    </View>
				    <View style={{flexDirection: 'row', alignItems: 'center'}}>
				      <Text style={{...FONTS.h2, color: '#fff'}}>{value}{value < 10000 ? unit : null}</Text>
				      
				    </View>
				    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
				      <Text style={{color: COLORS.white, ...FONTS.h4}}>{before_value}{unit} | {surplusValue > 0 ? `+${surplusValue}${unit}` : `${surplusValue}${unit}`}</Text>
				      {
				        valueState === "UP" ? <View
				          style={{
				            transform: [
				              {
				                translateY: 5
				              }
				            ]
				          }}
				        >
				        <LottieView
    	            source={lottiefiles.upState}
    	            autoPlay
                  loop
                  style={{
                    width: 50,
                    height: 50
                  }}
                />
                </View> : <View
                  style={{
                    transform: [
                      {
                        rotate: '180deg'
                      },
                      {
                        translateY: 5
                      }
                    ]
                  }}
                >
                  <LottieView
    	            source={lottiefiles.upState}
    	            autoPlay
                  loop
                  style={{
                    width: 50,
                    height: 50
                  }}
                />
              </View>
				      }
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
		backgroundColor: 'blue',
		opacity: 1,
		overflow: 'hidden',
	},
	header: {
		height: '30%',
		width: 150,
		backgroundColor: 'blue'
	},
	content: {
		height: '70%',
		width: 150,
		backgroundColor: 'yellow'
	},
	title: {
		fontSize: 10,
		fontWeight: 'bold'
	},
	text: {
		fontSize: 20,
		fontWeight: '200'
	}
})
