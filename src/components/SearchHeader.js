import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors, CommonStyles, Metrix, NavigationService} from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchHeader = ({
  getSearch = text => {},
  back = false,
  containerStyle,
  name,
  top,
}) => {
  const [sendButton, setSendButton] = useState(false);
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);

  return (
    <>
      <View
        style={{
          marginTop: top ? 0 : Metrix.VerticalSize(30),
          marginBottom: Metrix.VerticalSize(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
          ...containerStyle,
          alignItems: 'center',
        }}>
        {/* {back ? (
        <TouchableOpacity
          onPress={() => {
            if (name === 'drList') {
              NavigationService.navigate('BottomTabs');
            } else {
              NavigationService.goBack();
            }
          }}
          style={styles.backButton}>
          <Ionicons
            name={'md-chevron-back-outline'}
            color={Colors.white}
            size={Metrix.customFontSize(25)}
          />
        </TouchableOpacity>
      ) : null} */}
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
        </View>
        {/* <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => getSearch(search)}>
          <AntDesign
            name={'search1'}
            color={
              sendButton || search ? Colors.logoGreen : Colors.placeholderGray
            }
            size={sendButton ? 40 : 40}
          />
        </TouchableOpacity>
      </View> */}
      </View>
      {sendButton ? (
        <View>
          <TouchableOpacity
            onPress={() => getSearch(search)}
            style={{
              width: '100%',
              height: Metrix.VerticalSize(40),
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.green,
              marginBottom: 20,
              marginTop: 10,
            }}>
            <Text
              style={{
                ...CommonStyles.textStyles.buttonText,
                fontWeight: 'bold',
              }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
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
