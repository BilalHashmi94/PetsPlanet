import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, Metrix, NavigationService} from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchHeader = ({getSearch = text => {}, back = false, containerStyle}) => {
  const [sendButton, setSendButton] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <View
      style={{
        marginTop: Metrix.VerticalSize(30),
        marginBottom: Metrix.VerticalSize(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        ...containerStyle,
      }}>
      {back ? (
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backButton}>
          <Ionicons
            name={'md-chevron-back-outline'}
            color={Colors.white}
            size={Metrix.customFontSize(25)}
          />
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          paddingRight: Metrix.HorizontalSize(20),
          paddingLeft: Metrix.HorizontalSize(20),
          ...styles.searchBar,
          borderColor: sendButton ? Colors.logoGreen : Colors.placeholderGray,
          borderWidth: sendButton ? 2 : 1,
          width: back ? '85%' : '100%',
        }}>
        <TextInput
          value={search}
          style={{width: '90%', height: 40, color: Colors.black}}
          onChangeText={text => setSearch(text)}
          placeholder={'Search anything'}
          placeholderTextColor={Colors.placeholderGray}
          onFocus={() => setSendButton(true)}
          onBlur={() => setSendButton(false)}
        />
        <TouchableOpacity onPress={() => getSearch(search)}>
          <AntDesign
            name={'search1'}
            color={
              sendButton || search ? Colors.logoGreen : Colors.placeholderGray
            }
            size={sendButton ? 25 : 20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: Metrix.VerticalSize(52),
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: Colors.logoDarkGreen,
    borderRadius: 10,
    width: Metrix.HorizontalSize(35),
    height: Metrix.VerticalSize(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default SearchHeader;
