import {
  FlatList,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import gStyle from './../styles';
import Header from '../../components/Header';
import {Colors, Images, Metrix} from '../../config';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputComp from '../../components/TextInputComp';
import IO from 'socket.io-client';
import {baseUrl, Img_url} from '../../config/ApiCaller';
import {useSelector} from 'react-redux';
import {log} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

export default function ChatListChat({route}) {
  const userData = route?.params?.item;
  const user = useSelector(state => state.AuthReducer.user);
  const [message, setMessage] = useState('');
  const messageList = useRef();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, isTypingText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [textM, setTextM] = useState('');
  console.log('userdsta', userData);
  const [messagesData, setMessageData] = useState(userData?.messages);
  console.log('user', user);

  const sendMesage = () => {
    if (message) {
      setMessageData([
        ...messagesData,
        {
          id: messagesData[messagesData?.length - 1].id + 1,
          message,
          messageTime: 'Just Now',
          myMessage: true,
          avatar: 'https://xsgames.co/randomusers/assets/avatars/male/66.jpg',
        },
      ]);
      setMessage('');
    }
  };

  const renderMessages = ({item}) => (
    <View style={{marginVertical: Metrix.VerticalSize(10)}}>
      <View
        style={{
          ...styles.messageContainer,
          alignSelf: item?.userID === user?.id ? 'flex-end' : 'flex-start',
          backgroundColor:
            item?.userID === user?.id ? Colors.primary : Colors.green,
        }}>
        <Text
          style={{
            ...styles.messageText,
            color: item?.userID === user?.id ? Colors.white : Colors.white,
          }}>
          {item?.text}
        </Text>
      </View>
      <Text
        style={{
          ...styles.messageTime,
          alignSelf: item?.userID === user?.id ? 'flex-end' : 'flex-start',
          marginLeft:
            item?.userID === user?.id
              ? Metrix.HorizontalSize(40)
              : Metrix.HorizontalSize(0),
          marginRight:
            item?.userID === user?.id
              ? Metrix.HorizontalSize(40)
              : Metrix.HorizontalSize(0),
        }}>
        {item?.userID === user?.id && '...'} {moment(item?.createdAt).format('hh:mm')}{' '}
        {!item?.userID === user?.id && '...'}
      </Text>
      <View
        style={{
          ...styles.imageContainer,
          top: Metrix.VerticalSize(32),
          alignSelf: item?.userID === user?.id ? 'flex-end' : 'flex-start',
          position: 'absolute',
          zIndex: 100,
        }}>
        <Image
          source={{uri: item.avatar}}
          resizeMode={'stretch'}
          style={styles.image}
        />
      </View>
    </View>
  );

  // useEffect(() => {
  //   if (messagesData?.length > 0) {
  //     setTimeout(() => {
  //       messageList.current.scrollToIndex({
  //         animated: true,
  //         index: messagesData?.length - 1,
  //         viewPosition: 0,
  //       });
  //     }, 500);
  //   }
  // }, [messagesData?.length]);

  // Socket IO

  const socket = IO(baseUrl, {
    forceNew: false,
  });

  console.log('messages=====>>>>>', message);
  console.log('messageData=====>>>>>', messagesData);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket.id', socket.id);
      console.log('socket.disconnected', socket.disconnected);
    });

    socket.on('message', message => {
      console.warn('scs', message, messagesData.length);
      messagesData.push(message);
      setMessageData([...messagesData]);
    });

    // socket.on('typing', callback => {
    //   console.log('text', callback);
    //   if (callback.id != userData.seller_id) {
    //     if (callback.istyping) {
    //       isTypingText('typing...');
    //     } else {
    //       isTypingText(null);
    //     }
    //   } else {
    //     isTypingText(null);
    //   }
    // });

    joinRoom();
    // console.log(userData.seller_name, isTyping);
    return () => {
      console.log('componentWillUnmount');
      // const {route} = props;
      // const data = route.params;
      let data = {
        id: userData.roomId,
        name: user.firstName,
      };
      socket.emit('leaveroom', data, callback => {});
    };
  }, []);

  const joinRoom = async () => {
    setLoading(true);
    // const {route} = props;
    // const data = route.params;
    let data = {
      id: userData.roomId,
      name: user.firstName,
      user1Id:
        userData.users[0] === user.id ? userData.users[0] : userData.users[1],
      user2Id:
        userData.users[0] != user.id ? userData.users[0] : userData.users[1],
    };
    await socket.emit('join', data, error => {});
    setTimeout(() => {
      setLoading(false);
      // loadMessages();
    }, 300);
  };

  const loadMessages = () => {
    // const { route } = props
    // const data = route.params
    let data = {
      id: userData.seller_id,
      name: userData.seller_name,
    };
    setLoading(true);
    socket.emit('loadmessages', data, callback => {
      if (callback.status) {
        setMessageData([...messagesData, callback.message]);
      }
      setLoading(false);
    });
  };

  const onSend = message => {
    var data = {
      text: message,
      room: userData.roomId,
      userID: user.id,
    };
    // data.room = userData.seller_id;

    socket.emit('send', data, callback => {
      console.log('messages on send', data, callback);
      // setMessageData([...messagesData, callback.message]);
    });
    setTextM('');
    Keyboard.dismiss();
  };

  return (
    <View style={gStyle.container}>
      {/* <Header /> */}
      <View
        style={{
          paddingVertical: Metrix.VerticalSize(20),
          paddingHorizontal: Metrix.HorizontalSize(20),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {userData?.userData[0]?.profilePicture ? (
            <FastImage
              source={{
                uri: Img_url + userData?.userData[0]?.profilePicture,
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
          <Text
            style={{
              ...gStyle.title,
              marginVertical: Metrix.VerticalSize(0),
              color: Colors.black,
              marginLeft: 10
            }}>
            {userData.userData[0].name}
          </Text>
        </View>
      </View>
      <View style={{height: 0.5, backgroundColor: Colors.placeholderGray}} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{flex: 1}}
        style={{
          marginBottom: Metrix.VerticalSize(10),
          marginTop: Metrix.VerticalSize(10),
          paddingHorizontal: Metrix.HorizontalSize(20),
        }}>
        <View style={{}}>
          <FlatList
            ref={ref => (messageList.current = ref)}
            data={messagesData}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderMessages}
            // initialScrollIndex={
            //   messagesData?.length > 0 ? messagesData?.length - 1 : null
            // }
            // // onScrollToIndexFailed={info => {
            // //   const wait = new Promise(resolve => setTimeout(resolve, 500));
            // //   wait.then(() => {
            // //     messageList.current?.scrollToIndex({
            // //       index: info.index,
            // //       animated: true,
            // //     });
            // //   });
            // // }}
            // onScrollToIndexFailed={({index, averageItemLength}) => {
            //   // Layout doesn't know the exact location of the requested element.
            //   // Falling back to calculating the destination manually
            //   messageList.current?.scrollToOffset({
            //     offset: index * averageItemLength,
            //     animated: true,
            //   });
            // }}
          />
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.plusBtn}>
          <Entypo
            color={Colors.secondary}
            name={'plus'}
            size={Metrix.customFontSize(25)}
          />
        </TouchableOpacity>
        <View style={{width: '70%'}}>
          <TextInputComp
            // style={styles.messageInput}
            value={textM}
            onChange={text => setTextM(text)}
            placeholder={'Enter your message'}
          />
        </View>
        <TouchableOpacity style={styles.plusBtn} onPress={() => onSend(textM)}>
          <Ionicons
            color={Colors.primary}
            name={'md-send-sharp'}
            size={Metrix.customFontSize(25)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: Metrix.HorizontalSize(25),
    paddingVertical: Metrix.VerticalSize(15),
  },
  messageText: {
    fontSize: Metrix.customFontSize(16),
    // fontFamily: fonts.Regular
  },
  messageTime: {
    color: Colors.secondary,
    // fontFamily: fonts.Regular,
    marginTop: Metrix.VerticalSize(3),
  },
  imageContainer: {
    height: Metrix.VerticalSize(42),
    backgroundColor: Colors.messageColor,
    borderRadius: 8,
    padding: 2,
    width: Metrix.VerticalSize(42),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  bottom: {
    borderTopWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Metrix.VerticalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(20),
    backgroundColor: Colors.white,
    borderColor: Colors.placeholderGray,
  },
  plusBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageInput: {
    backgroundColor: Colors.white,
    width: '100%',
    height: Metrix.VerticalSize(40),
    fontSize: Metrix.customFontSize(12),
    padding: 5,
    paddingLeft: Metrix.HorizontalSize(10),
    color: Colors.black,
    borderRadius: 2,
  },
});
