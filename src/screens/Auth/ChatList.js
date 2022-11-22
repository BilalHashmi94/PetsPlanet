import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CommonStyles, Metrix, NavigationService} from '../../config';
import {useDispatch, useSelector} from 'react-redux';
import DataBaseMiddleware from '../../redux/Middlewares/DataBaseMiddleware';
import Header from '../../components/Header';

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
                height: Metrix.VerticalSize(50),
                // alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Text>{item.userData[0].name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ChatList;
