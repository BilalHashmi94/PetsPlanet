import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Metrix, NavigationService} from '../../config';
import Header from '../../components/Header';

const WhatDoYouWantToSell = () => {
  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.container}>
        <Text
          style={{
            color: Colors.black,
            fontWeight: 'bold',
            fontSize: Metrix.customFontSize(20),
          }}>
          What Do You Want To Sell?
        </Text>
        <View
          style={{
            marginVertical: Metrix.VerticalSize(35),
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
            marginVertical: Metrix.VerticalSize(5),
            width: '80%',
          }}>
          <TouchableOpacity
            //   onPress={() => NavigationService.navigate('SignIn')}
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
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(35),
  },
  container: {
      flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

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
