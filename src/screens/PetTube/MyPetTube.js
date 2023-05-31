import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  Colors,
  CommonStyles,
  Images,
  Metrix,
  NavigationService,
} from '../../config';
import Header from '../../components/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          marginVertical: Metrix.VerticalSize(10),
          height: Metrix.VerticalSize(150),
          flexDirection: 'row',
          width: '100%',
          backgroundColor: '#FAF9F6',
          // borderWidth: 0.5,
          // borderColor: Colors.textGray,
          padding: 5,
        }}>
        <View
          style={{
            width: '45%',
            height: '100%',
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
            source={item.thumbnail}
            style={{
              resizeMode: 'stretch',
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View
          style={{
            width: '55%',
            height: '100%',
            marginLeft: Metrix.HorizontalSize(10),
          }}>
          <Text
            style={{
              ...CommonStyles.textStyles.textInputText,
              color: Colors.logoGreen,
              fontWeight: 'bold',
            }}>
            {item.title}
          </Text>

          <Text
            style={{
              color: Colors.black,
              ...CommonStyles.textStyles.intro,
              fontWeight: 'bold',
              marginVertical: Metrix.VerticalSize(5),
            }}>
            {item.videoBy}
          </Text>
          <Text
            style={{
              color: Colors.black,
              ...CommonStyles.textStyles.textInputText,
              fontWeight: 'bold',
            }}>
            Likes:{' '}
            <Text
              style={{
                color: Colors.black,
                ...CommonStyles.textStyles.intro,
                fontWeight: 'bold',
              }}>
              {item.likes}
            </Text>
          </Text>
          <Text
            style={{
              color: Colors.black,
              ...CommonStyles.textStyles.textInputText,
              fontWeight: 'bold',
              marginVertical: Metrix.VerticalSize(5),
            }}>
            Comments:{' '}
            <Text
              style={{
                color: Colors.black,
                ...CommonStyles.textStyles.intro,
                fontWeight: 'bold',
              }}>
              {item.comments}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{...CommonStyles.container}}>
      <Header />
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}>
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
          <TouchableOpacity
            onPress={() => NavigationService.navigate('CreateChannel')}>
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
              renderItem={(item, index) => renderItem(item)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyPetTube;
