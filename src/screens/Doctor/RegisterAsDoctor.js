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
import {LoaderAction} from '../../redux/Actions';
import {baseUrl} from '../../config/ApiCaller';
import SearchableDropDown from 'react-native-searchable-dropdown';
import Modal from 'react-native-modal';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import { Marker } from 'react-native-maps';

const actionSheetRef = createRef();

const RegisterAsDoctor = () => {
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
  const [city, setCity] = useState('');
  const [marTop, setMarTop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [region, setRegion] = useState();

  const cityData = [
    {name: 'Karachi'},
    {name: 'Lahore'},
    {name: 'Faisalabad'},
    {name: 'Rawalpindi'},
    {name: 'Gujranwala'},
    {name: 'Peshawar'},
    {name: 'Multan'},
    {name: 'Saidu Sharif'},
    {name: 'Hyderabad City'},
    {name: 'Islamabad'},
    {name: 'Quetta'},
    {name: 'Bahawalpur'},
    {name: 'Sargodha'},
    {name: 'Sialkot City'},
    {name: 'Sukkur'},
    {name: 'Larkana'},
    {name: 'Chiniot'},
    {name: 'Shekhupura'},
    {name: 'Jhang City'},
    {name: 'Dera Ghazi Khan'},
    {name: 'Gujrat'},
    {name: 'Rahimyar Khan'},
    {name: 'Kasur'},
    {name: 'Mardan'},
    {name: 'Mingaora'},
    {name: 'Nawabshah'},
    {name: 'Sahiwal'},
    {name: 'Mirpur Khas'},
    {name: 'Okara'},
    {name: 'Mandi Burewala'},
    {name: 'Jacobabad'},
    {name: 'Saddiqabad'},
    {name: 'Kohat'},
    {name: 'Muridke'},
    {name: 'Muzaffargarh'},
    {name: 'Khanpur'},
    {name: 'Gojra'},
    {name: 'Mandi Bahauddin'},
    {name: 'Abbottabad'},
    {name: 'Turbat'},
    {name: 'Dadu'},
    {name: 'Bahawalnagar'},
    {name: 'Khuzdar'},
    {name: 'Pakpattan'},
    {name: 'Tando Allahyar'},
    {name: 'Ahmadpur East'},
    {name: 'Vihari'},
    {name: 'Jaranwala'},
    {name: 'New Mirpur'},
    {name: 'Kamalia'},
    {name: 'Kot Addu'},
    {name: 'Nowshera'},
    {name: 'Swabi'},
    {name: 'Khushab'},
    {name: 'Dera Ismail Khan'},
    {name: 'Chaman'},
    {name: 'Charsadda'},
    {name: 'Kandhkot'},
    {name: 'Chishtian'},
    {name: 'Hasilpur'},
    {name: 'Attock Khurd'},
    {name: 'Muzaffarabad'},
    {name: 'Mianwali'},
    {name: 'Jalalpur Jattan'},
    {name: 'Bhakkar'},
    {name: 'Zhob'},
    {name: 'Dipalpur'},
    {name: 'Kharian'},
    {name: 'Mian Channun'},
    {name: 'Bhalwal'},
    {name: 'Jamshoro'},
    {name: 'Pattoki'},
    {name: 'Harunabad'},
    {name: 'Kahror Pakka'},
    {name: 'Toba Tek Singh'},
    {name: 'Samundri'},
    {name: 'Shakargarh'},
    {name: 'Sambrial'},
    {name: 'Shujaabad'},
    {name: 'Hujra Shah Muqim'},
    {name: 'Kabirwala'},
    {name: 'Mansehra'},
    {name: 'Lala Musa'},
    {name: 'Chunian'},
    {name: 'Nankana Sahib'},
    {name: 'Bannu'},
    {name: 'Pasrur'},
    {name: 'Timargara'},
    {name: 'Parachinar'},
    {name: 'Chenab Nagar'},
    {name: 'Gwadar'},
    {name: 'Abdul Hakim'},
    {name: 'Hassan Abdal'},
    {name: 'Tank'},
    {name: 'Hangu'},
    {name: 'Risalpur Cantonment'},
    {name: 'Karak'},
    {name: 'Kundian'},
    {name: 'Umarkot'},
    {name: 'Chitral'},
    {name: 'Dainyor'},
    {name: 'Kulachi'},
    {name: 'Kalat'},
    {name: 'Kotli'},
    {name: 'Gilgit'},
    {name: 'Narowal'},
    {name: 'Khairpur Mir’s'},
    {name: 'Khanewal'},
    {name: 'Jhelum'},
    {name: 'Haripur'},
    {name: 'Shikarpur'},
    {name: 'Rawala Kot'},
    {name: 'Hafizabad'},
    {name: 'Lodhran'},
    {name: 'Malakand'},
    {name: 'Attock City'},
    {name: 'Batgram'},
    {name: 'Matiari'},
    {name: 'Ghotki'},
    {name: 'Naushahro Firoz'},
    {name: 'Alpurai'},
    {name: 'Bagh'},
    {name: 'Daggar'},
    {name: 'Leiah'},
    {name: 'Tando Muhammad Khan'},
    {name: 'Chakwal'},
    {name: 'Badin'},
    {name: 'Lakki'},
    {name: 'Rajanpur'},
    {name: 'Dera Allahyar'},
    {name: 'Shahdad Kot'},
    {name: 'Pishin'},
    {name: 'Sanghar'},
    {name: 'Upper Dir'},
    {name: 'Thatta'},
    {name: 'Dera Murad Jamali'},
    {name: 'Kohlu'},
    {name: 'Mastung'},
    {name: 'Dasu'},
    {name: 'Athmuqam'},
    {name: 'Loralai'},
    {name: 'Barkhan'},
    {name: 'Musa Khel Bazar'},
    {name: 'Ziarat'},
    {name: 'Gandava'},
    {name: 'Sibi'},
    {name: 'Dera Bugti'},
    {name: 'Eidgah'},
    {name: 'Uthal'},
    {name: 'Khuzdar'},
    {name: 'Chilas'},
    {name: 'Panjgur'},
    {name: 'Gakuch'},
    {name: 'Qila Saifullah'},
    {name: 'Kharan'},
    {name: 'Aliabad'},
    {name: 'Awaran'},
    {name: 'Dalbandin'},
  ];

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
          name: name,
          uri: photo.path,
          type: photo.mime,
        };
        // this.setState({profilePicture: file});
        console.warn('file', file);
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

  const Register = async () => {
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
    } else if (!city) {
      Toast.show({
        type: 'success',
        text1: 'Alert',
        text2: 'City Field is Reqired',
        position: 'bottom',
      });
    } else {
      // dispatch(
      //   AuthMiddleware.Register({
      //     email,
      //     password,
      //     firstName,
      //     lastName,
      //     phone,
      //     profilePic,
      //     callback: res => {
      //       console.warn(res);
      //       NavigationService.navigate('Login');
      //     },
      //   }),
      // );
      const formData = new FormData();
      formData.append('file', profilePic);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('phoneNumber', phone);
      formData.append('city', city);
      console.log('formm', formData);
      dispatch(LoaderAction.LoaderTrue());
      return new Promise((resolve, reject) => {
        console.log('fetch');
        fetch(`${baseUrl}users/register`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => {
            console.log('respoccc', response);
            response.json();
            console.log('res', response);
            dispatch(LoaderAction.LoaderFalse());
            if (response?.status == 200) {
              NavigationService.navigate('SignIn');
              dispatch(LoaderAction.LoaderFalse());
              Toast.show({
                type: 'success',
                text1: 'Alert',
                text2: 'Registeration Successful',
                position: 'bottom',
              });
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
    }
  };

  // console.warn('city', city);

  return (
    <>
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
          <View style={styles.textInputView}>
            <TextInputComp
              value={phone}
              onChange={text => setPhone(text)}
              placeholder={'Clinic Name'}
            />
          </View>
          <View style={styles.textInputView}>
            <TextInputComp
              value={phone}
              onChange={text => setPhone(text)}
              placeholder={'Address Line One'}
            />
          </View>
          <View style={styles.textInputView}>
            <TextInputComp
              value={phone}
              onChange={text => setPhone(text)}
              placeholder={'Address Line Two (optional)'}
            />
          </View>
          <View style={styles.textInputView}>
            <TextInputComp
              value={phone}
              onChange={text => setPhone(text)}
              placeholder={'Town e.g North Nazimabad, Gulshan e Iqbal'}
            />
          </View>
          <View style={styles.textInputView}>
            {/* <TextInputComp
            value={city}
            onChange={text => setCity(text)}
            placeholder={'City'}
          /> */}

            <SearchableDropDown
              // multi={true}
              selectedItems={city}
              onItemSelect={item => {
                // const items = this.state.selectedItems;
                // items.push(item);
                // this.setState({selectedItems: items});
                setCity(item.name);
                setMarTop(false);
              }}
              containerStyle={{padding: 5}}
              onRemoveItem={(item, index) => {
                const items = this.state.selectedItems.filter(
                  sitem => sitem.id !== item.id,
                );
                this.setState({selectedItems: items});
              }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{color: '#222'}}
              itemsContainerStyle={{maxHeight: 140}}
              items={cityData}
              defaultIndex={0}
              chip={true}
              resetValue={false}
              textInputProps={{
                placeholder: 'City',
                underlineColorAndroid: 'transparent',
                // onFocus: () => setMarTop(true),
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                },
                onTextChange: text => {
                  setMarTop(true);
                  console.warn('mar', marTop);
                },
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              ...styles.textInputView,
              marginTop: marTop ? 140 : 10,
            }}>
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
            // flexDirection: 'row',
            // alignItems: 'center',
            // justifyContent: 'center',
            marginBottom: Metrix.VerticalSize(10),
            // paddingHorizontal: Metrix.HorizontalSize(20),
          }}>
          <Text style={styles.textInputText}>
            We recomend you to add your clinic's from one of the options below?{' '}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Metrix.VerticalSize(10),
            // paddingHorizontal: Metrix.HorizontalSize(20),
          }}
          onPress={() => setIsVisible(true)}>
          <Text style={styles.resetText}>
            Click Here to Select Location From Map!
          </Text>
        </TouchableOpacity>
        <View
          style={{
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Metrix.VerticalSize(10),
            // paddingHorizontal: Metrix.HorizontalSize(20),
          }}>
          <Text style={styles.resetText}>OR</Text>
        </View>
        <TouchableOpacity
          style={{
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Metrix.VerticalSize(10),
            // paddingHorizontal: Metrix.HorizontalSize(20),
          }}
          onPress={() => setIsVisible(true)}>
          <Text style={styles.resetText}>
            Click Here to Select Current Location!
          </Text>
        </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => NavigationService.navigate('SignIn')}>
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
      <Modal isVisible={isVisible}>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.white,
            width: '100%',
            height: '70%',
            position: 'absolute',
            bottom: 0,
          }}>
          {/* <Button title="Hide modal" onPress={() => setIsVisible(false)} /> */}
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{width: '100%', height: '100%'}}
            onRegionChangeComplete={(region) => setRegion(region)}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
          {/* <Marker
              draggable
              coordinate={this.state.x}
              onDragEnd={e => this.setState({x: e.nativeEvent.coordinate})}
            /> */}
          {/* </MapView> */}
        </View>
      </Modal>
    </>
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

export default RegisterAsDoctor;
