import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React from 'react';
import {Colors, CommonStyles, Images, Metrix} from '../../config';
import Header from '../../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';

const MyPetTube = () => {
  const data = [
    {
      id: 12,
      postId: 112,
      channelId: 31412,
      title: 'My Pet Video',
      videoBy: 'Saleem Vlogs',
      thumbnail: Images.petTube,
      likes: 22,
      comments: 11,
    },
    {
      id: 12,
      postId: 112,
      channelId: 31412,
      title: 'My Pet Video',
      videoBy: 'Saleem Vlogs',
      thumbnail: Images.petTube,
      likes: 22,
      comments: 11,
    },
    {
      id: 12,
      postId: 112,
      channelId: 31412,
      title: 'My Pet Video',
      videoBy: 'Saleem Vlogs',
      thumbnail: Images.petTube,
      likes: 22,
      comments: 11,
    },
    {
      id: 12,
      postId: 112,
      channelId: 31412,
      title: 'My Pet Video',
      videoBy: 'Saleem Vlogs',
      thumbnail: Images.petTube,
      likes: 22,
      comments: 11,
    },
  ];
  return (
    <View style={{...CommonStyles.container}}>
      <Header />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...CommonStyles.textStyles.heading,
            fontSize: Metrix.customFontSize(25),
          }}>
          My Pet Tube
        </Text>
        <TouchableOpacity>
          <AntDesign name="pluscircleo" size={30} color={Colors.themeBlue} />
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: Metrix.VerticalSize(10)}}>
        <Image
          source={Images.acc3}
          style={{
            width: '100%',
            height: Metrix.VerticalSize(180),
            resizeMode: 'stretch',
            borderWidth: 1,
          }}
        />
        <Text
          style={{
            ...CommonStyles.textStyles.semiHeading,
            marginTop: Metrix.VerticalSize(10),
          }}>
          Pet Lovers Paradise
        </Text>
        <Text style={{...CommonStyles.textStyles.intro}}>Saleem Bhai</Text>
        <View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item, index) => {
              return (
                <TouchableOpacity style={{marginVertical: Metrix.VerticalSize(10), height: Metrix.VerticalSize(250), flexDirection: 'row'}}>

                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default MyPetTube;
