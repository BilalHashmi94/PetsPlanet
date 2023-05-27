import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, CommonStyles, Images, Metrix} from '../config';
import SearchHeader from '../components/SearchHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PetTube = () => {
  return (
    <View style={{...CommonStyles.container}}>
      <Text
        style={{
          ...CommonStyles.textStyles.heading,
          marginTop: Metrix.VerticalSize(10),
        }}>
        Pet Tube
      </Text>
      <SearchHeader />

      <View
        style={{
          width: '100%',
          height: 250,
          borderWidth: 0.5,
          borderColor: Colors.lighGray,
          marginVertical: Metrix.VerticalSize(10),
          //   padding: Metrix.VerticalSize(10),
        }}>
        <View
          style={{
            width: '100%',
            height: '20%',
            // borderWidth: 1,
            padding: 5,
          }}>
          <Text
            style={{
              ...CommonStyles.textStyles.semiHeading,
              color: Colors.logoGreen,
            }}>
            My First Pet Video
          </Text>
          <Text style={{...CommonStyles.textStyles.intro}}>Saleem Vlogs</Text>
        </View>
        {/* Video Section  */}
        <TouchableOpacity
          style={{
            width: '100%',
            height: '65%',
            // borderWidth: 1,
            // padding: 5,
            backgroundColor: 'black',
            // alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              zIndex: 9999,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome5
              name="play-circle"
              size={70}
              color={Colors.logoGreen}
            />
          </View>
          <Image
            source={Images.petTube}
            style={{resizeMode: 'cover', width: '100%', height: '100%'}}
            blurRadius={3}
          />
          <View
            style={{
              position: 'absolute',
            //   top: 0,
            //   right: 0,
            //   left: 0,
              bottom: 0,
              zIndex: 999999,
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: 20,
              backgroundColor: 'rgb(255, 255 255)'
            }}></View>
        </TouchableOpacity>

        {/* Last Section */}
        <View
          style={{
            width: '100%',
            height: '15%',
            borderTopWidth: 0.5,
            borderColor: Colors.lighGray,
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '33%',
              borderRightWidth: 1,
              borderColor: Colors.lighGray,
            }}>
            <Text>Like</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '33%',
              borderRightWidth: 1,
              borderColor: Colors.lighGray,
            }}>
            <Text>Comment</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '33%',
            }}>
            <Text>Share</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PetTube;
