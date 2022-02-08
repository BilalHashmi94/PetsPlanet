import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors, Metrix} from '../config';

const PetDetail = props => {
  const data = props.route.params.data;

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: 350,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
        }}>
        <View style={{position: 'absolute', top: 50, left: 20, zIndex: 9999}}>
          <Text>back</Text>
        </View>
        <Image
          source={{uri: data.image}}
          style={{
            width: '100%',
            height: 300,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.back,
    // paddingHorizontal: Metrix.HorizontalSize(20),
  },
});

export default PetDetail;
