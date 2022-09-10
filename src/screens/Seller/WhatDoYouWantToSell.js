import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {Colors, Images, Metrix, NavigationService} from '../../config';
import Header from '../../components/Header';
import {useSelector} from 'react-redux';

const WhatDoYouWantToSell = () => {
  const user = useSelector(state => state.AuthReducer.user);
  return (
    <ImageBackground source={Images.DogBack} style={styles.mainContainer}>
      <View>
        <Header />
        <View style={styles.container}>
          {/* <Text
            style={{
              color: Colors.white,
              fontWeight: 'bold',
              fontSize: Metrix.customFontSize(24),
              textAlign: 'center'
            }}>
            What Do You Want To Sell?
          </Text> */}
          <View
            style={{
              marginVertical: Metrix.VerticalSize(10),
              width: '80%',
            }}>
            <TouchableOpacity
              onPress={() => NavigationService.navigate('SellPet')}
              style={{
                backgroundColor: Colors.logoGreen,
                ...styles.detailComp,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: 'bold',
                  fontSize: Metrix.customFontSize(20),
                }}>
                Pet
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: Metrix.VerticalSize(10),
              width: '80%',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (
                  user?.shopIdentifier === 'null' ||
                  user?.shopIdentifier === null
                ) {
                  NavigationService.navigate('CreateShop');
                } else {
                  NavigationService.navigate('AddProduct');
                }
              }}
              style={{
                backgroundColor: Colors.backgroundBlue,
                ...styles.detailComp,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: 'bold',
                  fontSize: Metrix.customFontSize(20),
                }}>
                Pet Mall
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(35),
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(420),
  },
  detailComp: {
    // backgroundColor: Colors.white,
    // height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    paddingHorizontal: Metrix.HorizontalSize(20),
    paddingVertical: Metrix.HorizontalSize(10),
    marginVertical: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default WhatDoYouWantToSell;
