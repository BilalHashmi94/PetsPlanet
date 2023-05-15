import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TextInputComp from '../../components/TextInputComp';
import {Colors, Metrix, NavigationService} from '../../config';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.secondView}>
          <Text style={styles.welcomeText}>Contact Us</Text>
        </View>
        <View>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <View style={styles.button}>
              <Feather name={'mail'} color={Colors.white} size={20} />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Text>info@petsplanet.com</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <View style={styles.button}>
              <Feather name={'phone-call'} color={Colors.white} size={20} />
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Text>0331-2285347</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.sendMessage}>
          <View
            style={{
              height: Metrix.VerticalSize(60),
              marginVertical: Metrix.VerticalSize(10),
            }}>
            <TextInputComp
              value={name}
              onChange={text => setName(text)}
              placeholder={'Name: '}
              backgroundColor={'#F6F6F6'}
            />
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(60),
              marginVertical: Metrix.VerticalSize(10),
            }}>
            <TextInputComp
              value={email}
              onChange={text => setEmail(text)}
              placeholder={'Email: '}
              backgroundColor={'#F6F6F6'}
            />
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(60),
              marginVertical: Metrix.VerticalSize(10),
            }}>
            <TextInputComp
              value={message}
              onChange={text => setMessage(text)}
              placeholder={'Message: '}
              backgroundColor={'#F6F6F6'}
            />
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(60),
              marginVertical: Metrix.VerticalSize(20),
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.logoGreen,
                ...styles.detailComp,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: 'bold',
                  fontSize: Metrix.customFontSize(20),
                }}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  welcomeText: {
    color: Colors.black,
    fontSize: Metrix.customFontSize(25),
    fontWeight: 'bold',
    marginBottom: 10,
    // fontFamily: 'Poppins-Black',
  },
  secondView: {
    marginVertical: Metrix.VerticalSize(10),
  },
  button: {
    height: Metrix.VerticalSize(43),
    width: Metrix.HorizontalSize(43),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

    marginVertical: Metrix.VerticalSize(10),
  },
  sendMessage: {
    // height: Metrix.VerticalSize(401),
    width: '100%',
    backgroundColor: '#F6F6F6',
    padding: 10,
    borderRadius: 8,
    marginVertical: Metrix.VerticalSize(15),
  },
  detailComp: {
    // backgroundColor: Colors.white,
    // height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    paddingHorizontal: Metrix.HorizontalSize(20),
    paddingVertical: Metrix.HorizontalSize(10),
    marginVertical: 5,
    alignItems: 'center',
    // justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ContactUs;
