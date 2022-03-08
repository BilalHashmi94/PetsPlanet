import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Metrix} from '../config';

const Button = ({onPress, title, color, textColor, border}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        borderWidth: border ? 1 : 0,
        borderColor: '#fff',
      }}>
      <Text
        style={{
          color: textColor,
          // fontFamily: border ? 'Poppins-SemiBold' : 'Poppins-Regular',
          fontSize: border
            ? Metrix.customFontSize(19)
            : Metrix.customFontSize(14),
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
