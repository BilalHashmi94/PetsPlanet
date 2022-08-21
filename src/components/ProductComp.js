import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React from 'react';
import {Colors, Images, Metrix, NavigationService} from '../config';
import {Img_url} from '../config/ApiCaller';

const ProductComp = ({item}) => {
  return (
    <TouchableOpacity
        onPress={() => NavigationService.navigate('PorductDetail', {data: item})}
      style={{
        borderRadius: 20,
        height: Metrix.VerticalSize(220),
        width: Metrix.HorizontalSize(150),
        padding: 5,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }}>
      <Image
        source={item?.productImages[0]}
        style={{
          borderRadius: 15,
          height: Metrix.VerticalSize(130),
          width: Metrix.HorizontalSize(140),
        }}
      />
      <View style={{paddingHorizontal: 5, paddingVertical: 10}}>
        <Text
          numberOfLines={1}
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
          {item.category}
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

export default ProductComp;
