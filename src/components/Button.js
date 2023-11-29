import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {Colors, CommonStyles, Metrix} from '../config';

const Button = ({
  onPress = () => {},
  title,
  backColor,
  border,
  propStyle,
  textStyle,
  disabled = false,
  isLoading = false,
}) => {
  // console.warn('disabled===', disabled);
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        // flex: 1,
        backgroundColor: backColor ? backColor : Colors.logoGreen,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 103,
        width: '100%',
        height: Metrix.VerticalSize(50),
        // marginTop: Metrix.VerticalSize(40),
        ...propStyle,
      }}>
      {!isLoading ? (
        <Text style={{...CommonStyles.textStyles.buttonText, ...textStyle}}>
          {title}
        </Text>
      ) : (
        <ActivityIndicator size={'small'} color={Colors.white} />
      )}
    </TouchableOpacity>
  );
};

export default Button;
