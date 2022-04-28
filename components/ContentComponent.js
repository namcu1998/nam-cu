import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FONTS, COLORS, SIZES, images, icons } from '../constants';

export default class ContentComponent extends React.Component {
	render() {
	  const { name, unit, unit_name, value, icon } = this.props;
	  
	  return (
	      <View 
	        style={{
	          padding: SIZES.padding / 2, 
	          width: '45%',
	          //justtifyContent: 'center',
	          alignItems: 'center',
            backgroundColor: "white",
            borderRadius: SIZES.padding / 2,
            margin: SIZES.padding / 3
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
          <Text style={{color: 'black'}}>{name}</Text>
          <Text style={{...FONTS.h2, color: 'black'}}>{value}{unit ? unit_name : ""}</Text>
         </View>
      );
    }
}