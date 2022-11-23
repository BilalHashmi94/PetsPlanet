import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonStyles, Images, Metrix, NavigationService} from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import DataBaseMiddleware from '../../redux/Middlewares/DataBaseMiddleware';
import Header from '../../components/Header';
import FastImage from 'react-native-fast-image';
import {Img_url} from '../../config/ApiCaller';

const ChatList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.AuthReducer.user);
  const [data, setData] = useState([]);

  const GetMyChats = () => {
    dispatch(
      DataBaseMiddleware.GetMyChats({
        id: user?.id,
        callback: res => {
          setData(res);
          console.log('res', res);
        },
      }),
    );
  };

  useEffect(() => {
    GetMyChats();
  }, []);
  return (
    <View style={CommonStyles.container}>
      <Header />
      <Text style={{...CommonStyles.textStyles.heading}}>My Chats</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate('ChatListChat', {item: item})
              }
              style={{
                marginVertical: 20,
                backgroundColor: 'pink',
                height: Metrix.VerticalSize(80),
                // alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  {item?.userData[0]?.profilePicture ? (
                    <FastImage
                      source={{
                        uri: Img_url + item?.userData[0]?.profilePicture,
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50 / 2,
                        backgroundColor: Colors.black,
                      }}
                    />
                  ) : (
                    <FastImage
                      source={Images.avatar}
                      resizeMode={FastImage.resizeMode.contain}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50 / 2,
                      }}
                    />
                  )}
                  <View style={{marginLeft: 10, marginVertical: 5}}>
                    <Text style={CommonStyles.textStyles.semiHeading}>
                      {item.userData[0].name}
                    </Text>
                    <Text
                      style={{
                        ...CommonStyles.textStyles.intro,
                        fontStyle: 'italic',
                      }}>
                      {item?.messages[item.messages.length - 1]?.userID ===
                      user.id
                        ? 'You'
                        : item?.userData[0].name}
                      : {item.messages[item.messages.length - 1].text}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ChatList;
