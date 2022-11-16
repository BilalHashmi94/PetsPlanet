import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import gStyle from './../styles';
import Header from '../../components/Header';
import {Colors, Metrix} from '../../config';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputComp from '../../components/TextInputComp';

export default function Chat({route}) {
  const userData = route?.params?.item;
  const [message, setMessage] = useState('');
  const messageList = useRef();
  const [messagesData, setMessageData] = useState([
    {
      id: '1',
      message: 'Hi!',
      messageTime: '3 mins ago',
      myMessage: false,
      avatar: userData?.avatar,
    },
    {
      id: '2',
      message: 'Hey Sam! Good to see you!',
      messageTime: '5 mins ago',
      myMessage: true,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/66.jpg',
    },
    {
      id: '3',
      message: "How's it going?",
      messageTime: '5 mins ago',
      myMessage: false,
      avatar: userData?.avatar,
    },
    {
      id: '4',
      message: 'Yeah, good. Working a lot. And you?',
      messageTime: '5 mins ago',
      myMessage: true,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/66.jpg',
    },
    {
      id: '5',
      message: 'Hi!',
      messageTime: '3 mins ago',
      myMessage: false,
      avatar: userData?.avatar,
    },
    {
      id: '6',
      message: 'Hey Sam! Good to see you!',
      messageTime: '5 mins ago',
      myMessage: true,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/66.jpg',
    },
    {
      id: '7',
      message: "How's it going?",
      messageTime: '5 mins ago',
      myMessage: false,
      avatar: userData?.avatar,
    },
    {
      id: '8',
      message: 'Yeah, good. Working a lot. And you?',
      messageTime: '5 mins ago',
      myMessage: true,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/66.jpg',
    },
    {
      id: '9',
      message: 'Hi!',
      messageTime: '3 mins ago',
      myMessage: false,
      avatar: userData?.avatar,
    },
    {
      id: '10',
      message: 'Hey Sam! Good to see you!',
      messageTime: '5 mins ago',
      myMessage: true,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/66.jpg',
    },
    {
      id: '11',
      message: "How's it going?",
      messageTime: '5 mins ago',
      myMessage: false,
      avatar: userData?.avatar,
    },
    {
      id: '12',
      message: 'Yeah, good. Working a lot. And you?',
      messageTime: '5 mins ago',
      myMessage: true,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/66.jpg',
    },
  ]);

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
          alignSelf: item?.myMessage ? 'flex-end' : 'flex-start',
          backgroundColor: item?.myMessage ? Colors.primary : Colors.green,
        }}>
        <Text
          style={{
            ...styles.messageText,
            color: item?.myMessage ? Colors.white : Colors.black,
          }}>
          {item?.message}
        </Text>
      </View>
      <Text
        style={{
          ...styles.messageTime,
          alignSelf: item?.myMessage ? 'flex-end' : 'flex-start',
          marginLeft: !item?.myMessage
            ? Metrix.HorizontalSize(40)
            : Metrix.HorizontalSize(0),
          marginRight: item?.myMessage
            ? Metrix.HorizontalSize(40)
            : Metrix.HorizontalSize(0),
        }}>
        {item?.myMessage && '...'} {item?.messageTime}{' '}
        {!item?.myMessage && '...'}
      </Text>
      <View
        style={{
          ...styles.imageContainer,
          top: Metrix.VerticalSize(32),
          alignSelf: item?.myMessage ? 'flex-end' : 'flex-start',
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

  useEffect(() => {
    setTimeout(() => {
      messageList.current.scrollToIndex({
        animated: true,
        index: messagesData?.length - 1,
        viewPosition: 0,
      });
    }, 500);
  }, [messagesData?.length]);

  return (
    <View style={gStyle.container}>
      {/* <Header /> */}
      <View
        style={{
          paddingVertical: Metrix.VerticalSize(20),
          paddingHorizontal: Metrix.HorizontalSize(20),
        }}>
        <Text style={{...gStyle.title, marginVertical: Metrix.VerticalSize(0)}}>
          {userData?.seller_name}
        </Text>
        <Text
          style={{
            ...gStyle.title,
            marginVertical: Metrix.VerticalSize(0),
            fontSize: Metrix.customFontSize(14),
          }}>
          {userData?.shopName}
        </Text>
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
            keyExtractor={item => item?.id}
            showsVerticalScrollIndicator={false}
            renderItem={renderMessages}
            initialScrollIndex={messagesData?.length - 1}
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
            value={message}
            onChange={text => setMessage(text)}
            placeholder={'Enter your message'}
          />
        </View>
        <TouchableOpacity style={styles.plusBtn} onPress={sendMesage}>
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
    fontSize: Metrix.customFontSize(12),
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
