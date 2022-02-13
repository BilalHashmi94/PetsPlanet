import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors, Images, Metrix} from '../config';
import SearchHeader from '../components/SearchHeader';
import {ScrollView} from 'react-native-gesture-handler';

const Shop = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.horizontal}>
          <SearchHeader />
        </View>
        <View
          style={{
            ...styles.horizontal,
            alignItems: 'center',
            justifyContent: 'center',
            // marginVertical: Metrix.VerticalSize(10),
          }}>
          <Image
            source={Images.mall}
            style={{
              resizeMode: 'contain',
              width: Metrix.HorizontalSize(250),
              height: Metrix.VerticalSize(100),
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  horizontal: {
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
});

export default Shop;
