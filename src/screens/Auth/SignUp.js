import React, {useState, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Button from '../../components/Button';
import TextInputComp from '../../components/TextInputComp';
import {Colors, Images, Metrix, NavigationService} from '../../config';
import Toast from 'react-native-toast-message';
import AuthMiddleware from '../../redux/Middlewares/AuthMiddleware';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ActionSheet from 'react-native-actionsheet';
import ImageCropPicker from 'react-native-image-crop-picker';

const actionSheetRef = createRef();

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const [secure, setSecure] = useState(true);
  const [secureCon, setSecureCon] = useState(true);
  const [profilePic, setProfilePic] = useState();

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
        setProfilePic(file)
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

  const Register = () => {
    if (!email) {
      Toast.show({
        type: 'success',
        text1: 'Alert',
        text2: 'Email is required',
        position: 'bottom',
      });
    } else if (!firstName) {
      Toast.show({
        type: 'success',
        text1: 'Alert',
        text2: 'First Name is required',
        position: 'bottom',
      });
    } else if (!lastName) {
      Toast.show({
        type: 'success',
        text1: 'Alert',
        text2: 'Last Name is required',
        position: 'bottom',
      });
    } else if (!password) {
      Toast.show({
        type: 'success',
        text1: 'Alert',
        text2: 'Password is required',
        position: 'bottom',
      });
    } else if (password != confirmPassword) {
      Toast.show({
        type: 'success',
        text1: 'Alert',
        text2: 'Password Mismatched',
        position: 'bottom',
      });
    } else {
      dispatch(
        AuthMiddleware.Register({
          email,
          password,
          firstName,
          lastName,
          phone,
          profilePic,
          callback: res => {
            console.warn(res);
            NavigationService.navigate('Login');
          },
        }),
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.secondView}>
        <Text style={styles.welcomeText}>Register Now</Text>
        <Text style={styles.signinText}>
          Please fill the details to get started
        </Text>
      </View>
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
      <View style={{marginVertical: Metrix.VerticalSize(30)}}>
        <View
          style={{
            height: Metrix.VerticalSize(50),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInputComp
            value={firstName}
            onChange={text => setFirstName(text)}
            placeholder={'First Name'}
            names={true}
          />
          <TextInputComp
            value={lastName}
            onChange={text => setLastName(text)}
            placeholder={'Last Name'}
            names={true}
          />
        </View>
        <View style={styles.textInputView}>
          <TextInputComp
            value={email}
            onChange={text => setEmail(text)}
            placeholder={'Email Address'}
            type={'email-address'}
          />
        </View>
        <View style={styles.textInputView}>
          <TextInputComp
            value={phone}
            onChange={text => setPhone(text)}
            placeholder={'Phone Number'}
            type={'number-pad'}
          />
        </View>
        <View style={{flexDirection: 'row', ...styles.textInputView}}>
          <TextInputComp
            value={password}
            onChange={text => setPassword(text)}
            placeholder={'Password'}
            secure={secure}
            secureWidth={true}
          />
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => setSecure(!secure)}>
            {secure ? (
              <Text
                style={{
                  marginVertical: 10,
                  ...styles.textInputText,
                }}>
                Show
              </Text>
            ) : (
              <Text
                style={{
                  marginVertical: 10,
                  ...styles.textInputText,
                }}>
                Hide
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', ...styles.textInputView}}>
          <TextInputComp
            value={confirmPassword}
            onChange={text => setConfirmPassword(text)}
            placeholder={'Confirm Password'}
            secure={secureCon}
            secureWidth={true}
          />
          <TouchableOpacity
            style={{alignSelf: 'flex-end'}}
            onPress={() => setSecureCon(!secureCon)}>
            {secureCon ? (
              <Text
                style={{
                  marginVertical: 10,
                  ...styles.textInputText,
                }}>
                Show
              </Text>
            ) : (
              <Text
                style={{
                  marginVertical: 10,
                  ...styles.textInputText,
                }}>
                Hide
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: Metrix.VerticalSize(60),
          marginVertical: Metrix.VerticalSize(20),
        }}>
        <Button
          color={Colors.black}
          onPress={() => Register()}
          textColor={Colors.white}
          title={'Submit'}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: Metrix.VerticalSize(10),
        }}>
        <Text style={styles.textInputText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => NavigationService.navigate('SignIn')}>
          <Text style={styles.resetText}>Login</Text>
        </TouchableOpacity>
      </View>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(35),
  },
  secondView: {
    marginTop: Metrix.VerticalSize(40),
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
  profilePicView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrix.VerticalSize(20),
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
});

export default SignUp;
