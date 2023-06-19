import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {Colors, Images, Metrix, NavigationService} from '../config';
import {Img_url} from '../config/ApiCaller';
import FastImage from 'react-native-fast-image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ShopComp = ({item}) => {
  return (
    <TouchableOpacity
      onPress={() => NavigationService.navigate('ShopStore', {data: item})}
      style={{
        borderRadius: 20,
        height: Metrix.VerticalSize(180),
        width: Metrix.HorizontalSize(320),
        // padding: 5,
        backgroundColor: Colors.black,
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
          uri: Img_url + item?.bannerImage,
          priority: FastImage.priority.high,
        }}
        style={{
          borderRadius: 15,
          height: '100%',
          width: '100%',
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'rgba(0,0,0, 0.5)',
          width: '100%',
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: Colors.white,
            fontSize: Metrix.customFontSize(17),
            fontWeight: 'bold',
          }}>
          {item.shopName}
        </Text>
        <Text
          style={{
            color: Colors.white,
            // fontSize: Metrix.customFontSize(17),
            marginVertical: 3,
            fontWeight: 'bold',
          }}>
          Products: {item.numberOfProducts}
        </Text>
        {/* <Text
          style={{
            color: Colors.primary,
            // fontSize: Metrix.customFontSize(17),
            fontWeight: 'bold',
          }}>
          Likes: {item.likes?.length}
        </Text> */}
      </View>
      <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 3,
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: Colors.white,
          margin: 10,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FontAwesome name={'heart'} color={Colors.red} size={20} />
        {/* <Text
          style={{
            color: Colors.primary,
            fontSize: Metrix.customFontSize(10),
            fontWeight: 'bold',
          }}>
          {item.likes?.length}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default ShopComp;
