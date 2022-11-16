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
import {useDispatch, useSelector} from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';
import {baseUrl, Img_url} from '../../config/ApiCaller';
import {AuthAction, LoaderAction} from '../../redux/Actions';
import Toast from 'react-native-toast-message';

const actionSheetRef = createRef();

const EditProfile = () => {
  const user = useSelector(state => state.AuthReducer.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phoneNumber);
  const [profilePic, setProfilePic] = useState();
  const [imageObj, setImageObj] = useState(null);
  const dispatch = useDispatch();

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

  const updateUser = () => {
    const formData = new FormData();
    if (profilePic) {
      formData.append('file', profilePic);
    } else {
      formData.append('profilePicture', user.profilePicture);
    }
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phoneNumber', phone);
    formData.append('city', user.city);

    formData.append('clinicName', user.clinicName);
    formData.append('addressLineOne', user.addressLineOne);
    formData.append('addressLineTwo', null);
    formData.append('town', user.town);
    formData.append('lat', user.lat);
    formData.append('lng', user.lng);
    formData.append('shopIdentifier', user.shopIdentifier);
    formData.append('userType', user.userType);
    formData.append('id', user.id);
    formData.append('token', user.token);

    console.log('formm', formData);
    dispatch(LoaderAction.LoaderTrue());
    let token = user.token;
    return new Promise((resolve, reject) => {
      console.log('fetch');
      fetch(`${baseUrl}users/update`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          console.log('respoccc', response);
          return response.json();
        })
        .then(response => {
          console.log('res', response);
          dispatch(LoaderAction.LoaderFalse());
          if (response) {
            // NavigationService.navigate('SignIn');
            let newUser = {...response, token: user.token};
            dispatch(AuthAction.Signin(newUser));
            dispatch(LoaderAction.LoaderFalse());
            Toast.show({
              type: 'success',
              text1: 'Alert',
              text2: 'Updated Successful',
              position: 'bottom',
            });
            NavigationService.navigate('BottomTabs', {screen: 'Home'});
          } else {
            Toast.show({
              type: 'success',
              text1: 'Alert',
              text2: 'Somthing went wrong! Please try again later',
              position: 'bottom',
            });
            dispatch(LoaderAction.LoaderFalse());
          }
        })
        .catch(e => {
          dispatch(LoaderAction.LoaderFalse());
          Toast.show({
            type: 'success',
            text1: 'Alert',
            text2: 'Somthing went wrong! Please try again later',
            position: 'bottom',
          });
          reject();
          console.log('Error', e);
        });
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.profilePicView}>
          <View style={styles.imageStyle}>
            {profilePic ? (
              <Image
                source={{uri: profilePic.uri}}
                style={{
                  resizeMode: 'stretch',
                  ...styles.imageStyle,
                }}
              />
            ) : user.profilePicture ? (
              <Image
                source={{uri: Img_url + user.profilePicture}}
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
              value={phone}
              onChange={text => setPhone(text)}
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
              onPress={() => updateUser()}
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
              }}
              onPress={() => NavigationService.goBack()}>
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

export default EditProfile;
