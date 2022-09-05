import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Colors, Images, Metrix, NavigationService} from '../../config';
import Header from '../../components/Header';
import Swiper from 'react-native-swiper';
import CommonStyles from '../../config/CommonStyles';
import Button from '../../components/Button';

const CreateShop = () => {
  const swiperData = [
    {
      image: Images.sell1,
      title: 'Wanna Sell? Its Easy!',
      desc: 'Lets Create You A shop',
    },
    {
      image: Images.sell3,
      title: 'Create a shop',
      desc: 'Evey seller must have a shop, which should contain a banner, so that we can show all the listing of your products to the buyer',
    },
    {
      image: Images.sell2,
      title: 'Free Ads',
      desc: 'We dont charge for your products you can sell for as much as you want and get the full payment. But First 5 ads will be free after that you have to pay Rs.1000 for every 5 ads.',
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        {/* <Header /> */}
        <View style={styles.swiperContainer}>
          <Swiper style={styles.wrapper} showsButtons={false}>
            {swiperData.map(val => {
              return (
                <View style={styles.slide1}>
                  <Image
                    source={val.image}
                    style={{
                      resizeMode: 'contain',
                      width: '100%',
                      height: Metrix.VerticalSize(186),
                      marginTop: Metrix.VerticalSize(124),
                    }}
                  />
                  <View
                    style={{
                      marginTop: Metrix.VerticalSize(126),
                      marginBottom: Metrix.VerticalSize(10),
                    }}>
                    <Text style={CommonStyles.textStyles.heading}>
                      {val.title}
                    </Text>
                  </View>
                  <Text
                    style={{
                      ...CommonStyles.textStyles.intro,
                      textAlign: 'center',
                    }}>
                    {val.desc}
                  </Text>
                </View>
              );
            })}
          </Swiper>
        </View>
        <View>
          <Button
            title={'Get Started'}
            onPress={() => NavigationService.navigate('CreateShopTwo')}
          />
        </View>
        {/* <View
          style={{
            ...CommonStyles.center,
            marginVertical: Metrix.VerticalSize(20),
            flexDirection: 'row',
          }}>
          <Text style={CommonStyles.textStyles.intro}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('Signup')}>
            <Text
              style={{...CommonStyles.textStyles.intro, color: Colors.primary}}>
              {' '}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(35),
  },
  swiperContainer: {
    height: '85%',
    width: '100%',
    backgroundColor: Colors.white,
  },
  wrapper: {},
  slide1: {
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

export default CreateShop;
