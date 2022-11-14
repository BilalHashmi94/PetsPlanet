import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, CommonStyles, Metrix, NavigationService} from '../config';

const Header = ({title}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        marginTop: Metrix.VerticalSize(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={() => NavigationService.goBack()}
        style={{
          // backgroundColor: Colors.white,
          // //   padding: 10,
          // borderRadius: 10,
          // width: Metrix.HorizontalSize(30),
          // height: Metrix.VerticalSize(30),
          // alignItems: 'center',
          // justifyContent: 'center',
        }}>
        <Ionicons
          name={'md-chevron-back-outline'}
          color={Colors.black}
          size={Metrix.customFontSize(30)}
        />
      </TouchableOpacity>
      <View>
        <Text style={CommonStyles.textStyles.heading}>{title}</Text>
      </View>
      <View></View>
    </View>
  );
};

export default Header;
