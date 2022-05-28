import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {Colors, Images, Metrix} from '../config';
import SearchHeader from '../components/SearchHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {SliderBox} from 'react-native-image-slider-box';

const Shop = () => {
  const [width, setWidth] = useState();

  const onLayout = e => {
    setWidth(e.nativeEvent.layout.width);
  };
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          ...styles.horizontal,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: Metrix.VerticalSize(10),
          // backgroundColor: 'red',
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
      <View style={styles.horizontal}>
        <SearchHeader containerStyle={{marginTop: 0}} />
      </View>
      <View style={styles.bannerContainer}>
        <View style={styles.bannerView} onLayout={e => onLayout(e)}>
          <SliderBox
            images={[Images.acc1, Images.acc2, Images.acc3, Images.acc4]}
            sliderBoxHeight={150}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            parentWidth={width}
            dotColor={Colors.green}
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            resizeMode={'stretch'}
          />
        </View>
      </View>
    </ScrollView>
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
  bannerView: {
    width: '90%',
    height: 150,
  },
  bannerContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Metrix.VerticalSize(10),
  },
});

export default Shop;
