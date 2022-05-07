import React, {createRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TextInputComp from '../../components/TextInputComp';
import {Colors, Images, Metrix, NavigationService} from '../../config';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from '../../components/Header';
import ActionSheet from 'react-native-actionsheet';
import {useSelector} from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Img_url } from '../../config/ApiCaller';

const actionSheetRef = createRef();

const EditProfile = () => {
  const user = useSelector(state => state.AuthReducer.user);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [profilePic, setProfilePic] = useState(null);
  const [imageObj, setImageObj] = useState(null);

  const openPicker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      cropping: true,
    })
      .then(photo => {
        console.log('success', photo.path);
        let arr = photo.path.split('/');
        let name = photo.path.split('/')[arr.length - 1];
        let file = {
          name,
          uri: photo.path,
          type: photo.mime,
        };
        // this.setState({profilePicture: file});
        setProfilePic(file);
      })
      .catch(err => {
        console.warn('Error', err);
      });
  };

  const onLaunchCamera = () => {
    ImageCropPicker.openCamera({
      cropping: false,
      mediaType: 'photo',
    })
      .then(photo => {
        console.log('success', photo);
        let name = photo.path.split('/');
        name = name[name.length - 1];
        let file = {
          name,
          uri: photo.path,
          type: photo.mime,
        };
        // this.setState({profilePicture: file});
      })
      .catch(err => {
        console.warn('Error', err);
      });
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={{flex: 1}}>
        <View style={styles.profilePicView}>
          <View style={styles.imageStyle}>
            {user.profilePicture ? (
              <Image
                source={{uri: Img_url + user.profilePicture}}
                style={{
                  resizeMode: 'stretch',
                  ...styles.imageStyle,
                }}
              />
            ) : profilePic ? (
              <Image
                source={{uri: profilePic.uri}}
                style={{
                  resizeMode: 'stretch',
                  ...styles.imageStyle,
                }}
              />
            ) : (
              <Image
                source={Images.avatar}
                style={{
                  resizeMode: 'stretch',
                  ...styles.imageStyle,
                }}
              />
            )}
            <TouchableOpacity
              style={styles.changeDP}
              onPress={() => {
                actionSheetRef.current?.show();
              }}>
              <FontAwesome5
                name={'pencil-alt'}
                color={Colors.white}
                size={Metrix.customFontSize(10)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: Metrix.VerticalSize(10),
            }}>
            <View style={{width: '48%'}}>
              <Text
                style={{
                  // fontFamily: 'Poppins-Regular',
                  color: '#656565',
                  fontWeight: 'bold',
                }}>
                First Name
              </Text>
              <TextInputComp
                value={firstName}
                onChange={text => setFirstName(text)}
                placeholder={user.firstName}
              />
            </View>
            <View style={{width: '48%'}}>
              <Text
                style={{
                  // fontFamily: 'Poppins-Regular',
                  color: '#656565',
                  fontWeight: 'bold',
                }}>
                Last Name
              </Text>
              <TextInputComp
                value={lastName}
                onChange={text => setLastName(text)}
                placeholder={user.lastName}
              />
            </View>
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(40),
            }}>
            <Text
              style={{
                // fontFamily: 'Poppins-Regular',
                color: '#656565',
                fontWeight: 'bold',
              }}>
              Email Address
            </Text>
            <TextInputComp
              value={email}
              onChange={text => setEmail(text)}
              placeholder={user.email}
            />
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              marginTop: Metrix.VerticalSize(10),
              marginBottom: Metrix.VerticalSize(30),
            }}>
            <Text
              style={{
                // fontFamily: 'Poppins-Regular',
                color: '#656565',
                fontWeight: 'bold',
              }}>
              Phone Number
            </Text>
            <TextInputComp
              value={email}
              onChange={text => setEmail(text)}
              placeholder={user.phoneNumber}
            />
          </View>
        </View>
        <TouchableOpacity
        // onPress={() => NavigationService.navigate('ChangePassword')}
        >
          <Text
            style={{
              // fontFamily: 'Poppins-Regular',
              color: '#656565',
              textDecorationLine: 'underline',
            }}>
            Change Password
          </Text>
        </TouchableOpacity>
        <View style={{marginVertical: Metrix.VerticalSize(25)}}>
          <View
            style={{
              height: Metrix.VerticalSize(60),
              marginVertical: Metrix.VerticalSize(10),
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
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(60),
              marginVertical: Metrix.VerticalSize(10),
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
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ActionSheet
        ref={actionSheetRef}
        title={'Select Profile Picture'}
        options={['Camera', 'Photos', 'Cancel']}
        cancelButtonIndex={2}
        onPress={index => {
          if (index == 0) {
            onLaunchCamera();
          } else if (index == 1) {
            openPicker();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(35),
  },
  profilePicView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Metrix.VerticalSize(30),
  },
  imageStyle: {
    width: Metrix.HorizontalSize(98),
    height: Metrix.VerticalSize(98),
    borderRadius: 98 / 2,
  },
  changeDP: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    height: Metrix.VerticalSize(22),
    width: Metrix.HorizontalSize(22),
    borderRadius: 22 / 2,
    position: 'absolute',
    bottom: 5,
    right: 0,
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

export default EditProfile;
