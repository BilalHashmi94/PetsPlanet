import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Metrix, Colors, Images, NavigationService} from '../config';

const OwnerCard = () => {
  return (
    <View style={{marginVertical: Metrix.VerticalSize(10)}}>
      <View style={styles.topCard}>
        <View style={styles.topView}>
          <View style={{padding: 20}}>
            <View style={{marginBottom: 20}}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: Metrix.customFontSize(17),
                }}>
                Find the best pet
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: Metrix.customFontSize(28),
                }}>
                in your city
              </Text>
            </View>
            <TouchableOpacity 
            onPress={() => NavigationService.navigate('LocationWise')}
            style={styles.button}>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: Metrix.customFontSize(17),
                  fontWeight: 'bold',
                }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: Metrix.HorizontalSize(20),
            }}>
            <Image
              source={Images.petOwner}
              style={{
                resizeMode: 'cover',
                height: Metrix.VerticalSize(150),
                width: Metrix.VerticalSize(100),
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topCard: {
    borderRadius: 25,
    height: Metrix.VerticalSize(180),
    width: '100%',
    backgroundColor: Colors.orange,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    backgroundColor: Colors.primary,
    paddingHorizontal: Metrix.HorizontalSize(10),
    paddingVertical: Metrix.VerticalSize(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Metrix.VerticalSize(10),
  },
});

export default OwnerCard;
