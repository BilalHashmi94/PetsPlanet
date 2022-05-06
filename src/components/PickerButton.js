import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Colors, Metrix} from '../config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PickerButton = ({
  onPress = () => {},
  value = '',
  value2 = '',
  placeholder = '',
  containerStyle = {},
}) => {
  return (
    <TouchableOpacity style={{...styles.button}} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          paddingRight: Metrix.HorizontalSize(15),
        }}>
        <Text style={value ? styles.text : styles.placeholder}>
          {value ? value : placeholder}
        </Text>
        {value2 ? (
          <Text style={(styles.text, {textAlign: 'right'})}>{value2}</Text>
        ) : null}
      </View>
      <MaterialIcons
        name="keyboard-arrow-down"
        color={Colors.darkGray}
        style={{fontSize: Metrix.FontExtraLarge}}
      />
    </TouchableOpacity>
  );
};

export default PickerButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(10),
    borderRadius: Metrix.VerticalSize(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.logoDarkGreen,
  },
  text: {
    color: Colors.text,
    // fontFamily: 'Inter-Regular',
    fontSize: Metrix.FontSmall,
    flex: 1,
  },
  placeholder: {
    color: Colors.placeholderGray,
    // fontFamily: 'Inter-Regular',
    fontSize: Metrix.FontSmall,
    flex: 1,
  },
});
