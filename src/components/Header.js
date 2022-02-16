import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, Metrix, NavigationService} from '../config';

const Header = () => {
  return (
    <View style={{width: '100%', height: 50, marginTop: Metrix.VerticalSize(20)}}>
      <TouchableOpacity
        onPress={() => NavigationService.goBack()}
        style={{
          backgroundColor: Colors.logoDarkGreen,
        //   padding: 10,
          borderRadius: 10,
          width: Metrix.HorizontalSize(30),
          height: Metrix.VerticalSize(30),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons
          name={'md-chevron-back-outline'}
          color={Colors.white}
          size={Metrix.customFontSize(25)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
