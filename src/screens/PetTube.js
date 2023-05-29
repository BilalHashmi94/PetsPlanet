import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {Colors, CommonStyles, Images, Metrix} from '../config';
import SearchHeader from '../components/SearchHeader';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const PetTube = () => {
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

  const renderItem = ({item}) => {
    return (
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
            {item?.title}
          </Text>
          <Text style={{...CommonStyles.textStyles.intro}}>
            {item?.videoBy}
          </Text>
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
              backgroundColor: 'rgb(255, 255 255)',
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
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '33%',
              borderRightWidth: 1,
              borderColor: Colors.lighGray,
              flexDirection: 'row',
            }}>
            <AntDesign name="like2" size={15} color={Colors.black} />
            <Text
              style={{
                marginLeft: Metrix.HorizontalSize(5),
                color: Colors.black,
                fontSize: Metrix.customFontSize(15),
                // fontWeight: 'bold',
              }}>
              Like
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '33%',
              borderRightWidth: 1,
              borderColor: Colors.lighGray,
            }}>
            <Text
              style={{
                // marginLeft: Metrix.HorizontalSize(5),
                color: Colors.black,
                fontSize: Metrix.customFontSize(15),
                // fontWeight: 'bold',
              }}>
              Comment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              width: '33%',
              flexDirection: 'row',
            }}>
            <SimpleLineIcons name="share-alt" size={15} color={Colors.black} />
            <Text
              style={{
                marginLeft: Metrix.HorizontalSize(10),
                color: Colors.black,
                fontSize: Metrix.customFontSize(15),
                // fontWeight: 'bold',
              }}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{...CommonStyles.container}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            ...CommonStyles.textStyles.heading,
            marginTop: Metrix.VerticalSize(10),
          }}>
          Pet Tube
        </Text>
        <SearchHeader />
        <View style={{marginBottom: Metrix.VerticalSize(80)}}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item, index) => renderItem(item)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default PetTube;
