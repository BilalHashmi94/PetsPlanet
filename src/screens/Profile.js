import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {Button, Header, TextInputComp} from '../components';
import {Colors, Images, Metrix, NavigationService} from '../config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Img_url} from '../config/ApiCaller';
import {AuthAction} from '../redux/Actions';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.AuthReducer.user);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.secondView}>
          <Text style={styles.welcomeText}>Profile</Text>
        </View>
        <View style={{marginVertical: 10, ...styles.profileView}}>
          <View style={styles.imageStyle}>
            {user?.profilePicture ? (
              <Image
                source={{uri: Img_url + user.profilePicture}}
                style={{
                  resizeMode: 'stretch',
                  ...styles.imageStyle,
                }}
              />
            ) 
            // : profilePic ? (
            //   <Image
            //     source={{uri: profilePic.uri}}
            //     style={{
            //       resizeMode: 'stretch',
            //       ...styles.imageStyle,
            //     }}
            //   />
            // ) 
            : (
              <Image
                source={Images.avatar}
                style={{
                  resizeMode: 'stretch',
                  ...styles.imageStyle,
                }}
              />
            )}
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: Metrix.HorizontalSize(10),
            }}>
            <Text
              style={{
                fontSize: Metrix.customFontSize(18),
                // fontFamily: 'Poppins-SemiBold',
                fontWeight: 'bold',
                color: Colors.black,
              }}>
              {user?.firstName} {user?.lastName}
            </Text>
          </View>
        </View>
        <View style={{marginTop: Metrix.VerticalSize(30)}}>
          <View>
            <View style={styles.line} />
            <TouchableOpacity
              onPress={() => NavigationService.navigate('EditProfile')}
              style={{
                ...styles.profileView,
                marginVertical: Metrix.VerticalSize(20),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: Metrix.customFontSize(18),
                  // fontFamily: 'Poppins-SemiBold',
                  fontWeight: 'bold',
                  color: Colors.black,
                }}>
                Edit Profile
              </Text>
              {/* <AntDesign name={'arrowright'} size={Metrix.customFontSize(19)} /> */}
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
          <View>
            {/* <View style={styles.line} /> */}
            <TouchableOpacity
              onPress={() => NavigationService.navigate('SellersList')}
              style={{
                ...styles.profileView,
                marginVertical: Metrix.VerticalSize(20),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: Metrix.customFontSize(18),
                  // fontFamily: 'Poppins-SemiBold',
                  fontWeight: 'bold',
                  color: Colors.black,
                }}>
                Seller's List
              </Text>
              {/* <AntDesign name={'arrowright'} size={Metrix.customFontSize(19)} /> */}
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
          <View>
            {/* <View style={styles.line} /> */}
            <TouchableOpacity
              onPress={() => NavigationService.navigate('WhatDoYouWantToSell')}
              style={{
                ...styles.profileView,
                marginVertical: Metrix.VerticalSize(20),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: Metrix.customFontSize(18),
                  // fontFamily: 'Poppins-SemiBold',
                  fontWeight: 'bold',
                  color: Colors.black,
                }}>
                Become a Seller
              </Text>
              {/* <AntDesign name={'arrowright'} size={Metrix.customFontSize(19)} /> */}
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
          <View>
            {/* <View style={styles.line} /> */}
            <TouchableOpacity
              style={{
                ...styles.profileView,
                marginVertical: Metrix.VerticalSize(20),
                justifyContent: 'space-between',
              }}>
              <Text
                onPress={() => NavigationService.navigate('TermsAndConditions')}
                style={{
                  fontSize: Metrix.customFontSize(18),
                  // fontFamily: 'Poppins-SemiBold',
                  fontWeight: 'bold',
                  color: Colors.black,
                }}>
                Terms And Conditions
              </Text>
              {/* <AntDesign name={'arrowright'} size={Metrix.customFontSize(19)} /> */}
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
          <View>
            {/* <View style={styles.line} /> */}
            <TouchableOpacity
              onPress={() => NavigationService.navigate('PrivacyPolicy')}
              style={{
                ...styles.profileView,
                marginVertical: Metrix.VerticalSize(20),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: Metrix.customFontSize(18),
                  // fontFamily: 'Poppins-SemiBold',
                  fontWeight: 'bold',
                  color: Colors.black,
                }}>
                Privacy Policy
              </Text>
              {/* <AntDesign name={'arrowright'} size={Metrix.customFontSize(19)} /> */}
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
          <View>
            {/* <View style={styles.line} /> */}
            <TouchableOpacity
              onPress={() => NavigationService.navigate('ContactUs')}
              style={{
                ...styles.profileView,
                marginVertical: Metrix.VerticalSize(20),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: Metrix.customFontSize(18),
                  // fontFamily: 'Poppins-SemiBold',
                  fontWeight: 'bold',
                  color: Colors.black,
                }}>
                Contact Us
              </Text>
              {/* <AntDesign name={'arrowright'} size={Metrix.customFontSize(19)} /> */}
            </TouchableOpacity>
            <View style={styles.line} />
          </View>
        </View>
        <View
          style={{
            marginVertical: Metrix.VerticalSize(35),
          }}>
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('SignIn');
              dispatch(AuthAction.Signout());
            }}
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
              Log Out
            </Text>
          </TouchableOpacity>
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
  profileView: {
    flexDirection: 'row',
  },
  imageStyle: {
    width: Metrix.HorizontalSize(61),
    height: Metrix.VerticalSize(61),
    borderRadius: 61 / 2,
  },
  line: {
    borderWidth: 1,
    width: '100%',
    borderColor: Colors.placeholderGray,
  },
  modalCenteredView: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalOne: {
    height: Metrix.VerticalSize(240),
    backgroundColor: Colors.black,
    borderTopLeftRadius: 39,
    borderTopRightRadius: 39,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTwo: {
    // height: Metrix.VerticalSize(640),
    paddingBottom: 50,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 39,
    borderTopRightRadius: 39,
    padding: 35,
    // alignItems: 'center',
    // justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  secondView: {
    marginTop: Metrix.VerticalSize(30),
  },
  welcomeText: {
    color: Colors.black,
    fontSize: Metrix.customFontSize(25),
    fontWeight: 'bold',
    marginBottom: 10,
    // fontFamily: 'Poppins-Black',
  },
  signinText: {
    color: Colors.textGray,
    fontSize: Metrix.customFontSize(14),
    // fontFamily: 'Poppins-Medium',
  },
  textInputView: {
    height: Metrix.VerticalSize(50),
    marginVertical: Metrix.VerticalSize(10),
  },
  textInputText: {
    color: Colors.textDarkGray,
    fontSize: Metrix.customFontSize(14),
    // fontFamily: 'Poppins-Regular',
  },
  resetText: {
    color: Colors.black,
    fontSize: Metrix.customFontSize(14),
    // fontFamily: 'Poppins-SemiBold',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Profile;
