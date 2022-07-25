import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Colors, Metrix} from '../config';

const TextInputComp = ({
  onChange,
  placeholder,
  value,
  secure,
  type,
  secureWidth,
  names,
  verification,
  backgroundColor,
  multi,
  inputRef = () => {},
  send = () => {},
}) => {
  const [focus, setFocus] = useState(false);
  return (
    <TextInput
      style={{
        ...styles.input,
        borderBottomColor: focus ? Colors.logoGreen : Colors.placeholderGray,
        width: secureWidth ? '90%' : names ? '48%' : verification ? 50 : '100%',
        backgroundColor: backgroundColor ? backgroundColor : Colors.white,
        color: Colors.black
      }}
      ref={val => inputRef(val)}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={Colors.placeholderGray}
      onFocus={() => {setFocus(true); send(true)}}
      onBlur={() => {setFocus(false); send(false)}}
      secureTextEntry={secure}
      keyboardType={type}
      maxLength={verification ? 1 : 10000}
      multiline={multi ? multi : false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: '100%',
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(10),
    // fontFamily: 'Poppins-Regular',
    borderBottomWidth: 1,
  },
});

export default TextInputComp;
