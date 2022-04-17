import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FONTS, COLORS, SIZES, images, icons } from '../constants';

export default class ContentComponent extends React.Component {
	render() {
	  const { name, unit, unit_name, value, icon } = this.props;
	  
	  return (
	      <View 
	        style={{
	          paddingTop: SIZES.padding, 
	          width: '45%',
	          //justtifyContent: 'center',
	          alignItems: 'center'
	          }}
          >
          <Image
            source={icon}
            resizeMode='contain'
            style={{
              width: 25,
              height: 25,
            }}
          />
          <Text style={{color: 'white'}}>{name}</Text>
          <Text style={{...FONTS.h2, color: 'white'}}>{value}{unit ? unit_name : ""}</Text>
         </View>
      );
    }
}