import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React from 'react';
import {Colors, Images, Metrix, NavigationService} from '../config';
import {Img_url} from '../config/ApiCaller';
import FastImage from 'react-native-fast-image';

const CardComp = ({item}) => {
  return (
    <TouchableOpacity
      onPress={() => NavigationService.navigate('PetDetail', {data: item})}
      style={{
        borderRadius: 20,
        height: Metrix.VerticalSize(220),
        width: Metrix.HorizontalSize(150),
        padding: 5,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        marginVertical: 8,
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}>
      <FastImage
        source={{
          uri: item.pet_pictures ? Img_url + item.pet_pictures[0] : item.image,
          priority: FastImage.priority.high,
        }}
        style={{
          borderRadius: 15,
          height: Metrix.VerticalSize(130),
          width: Metrix.HorizontalSize(140),
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{paddingHorizontal: 5, paddingVertical: 10}}>
        <Text
          style={{
            color: Colors.black,
            fontSize: Metrix.customFontSize(17),
            fontWeight: 'bold',
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: Colors.placeholderGray,
            // fontSize: Metrix.customFontSize(17),
            marginVertical: 3,
            fontWeight: 'bold',
          }}>
          {item.breed}
        </Text>
        <Text
          style={{
            color: Colors.primary,
            // fontSize: Metrix.customFontSize(17),
            fontWeight: 'bold',
          }}>
          Rs.{item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardComp;
