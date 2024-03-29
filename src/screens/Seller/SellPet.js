import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, createRef} from 'react';
import {Colors, CommonStyles, Metrix, NavigationService} from '../../config';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import DataBaseMiddleware from '../../redux/Middlewares/DataBaseMiddleware';
import Toast from 'react-native-toast-message';
import CustomModal from '../../components/CustomModal';
import PickerButton from '../../components/PickerButton';
import TextInputComp from '../../components/TextInputComp';
import GetLocation from 'react-native-get-location';
import ImageCropPicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

const actionSheetRef = createRef();
const actionSheetRefRemove = createRef();

const SellPet = props => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [petName, setPetName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isTopEnabled, setIsTopEnabled] = useState(false);
  const [isTopTenEnabled, setIsTopTenEnabled] = useState(false);
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const toggleSwitch = () => setIsTopEnabled(previousState => !previousState);
  const toggleTenSwitch = () =>
    setIsTopTenEnabled(previousState => !previousState);
  const [pictures, setPictures] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedPicIdex, setSelectedPicIndex] = useState();

  const user = useSelector(state => state.AuthReducer.user);

  const openPicker = () => {
    if (pictures.length >= 5) {
      Toast.show({
        type: 'success',
        text1: 'Alert',
        text2: 'You can add upto 5 images.',
        position: 'bottom',
      });
    } else {
      ImageCropPicker.openPicker({
        mediaType: 'photo',
        cropping: false,
        // compressImageQuality,
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
          // setProfilePic(file)
          pictures.push(file);
          setRefresh(!refresh);
        })
        .catch(err => {
          console.warn('Error', err);
        });
    }
  };

  const onLaunchCamera = () => {
    if (pictures.length >= 5) {
      Toast.show({
        type: 'success',
        text1: 'Alert',
        text2: 'You can add upto 5 images.',
        position: 'bottom',
      });
    } else {
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
          pictures.push(file);
          setRefresh(!refresh);
        })
        .catch(err => {
          console.warn('Error', err);
        });
    }
  };

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        setLat(location.latitude);
        setLong(location.longitude);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  const getAllCategories = () => {
    dispatch(
      DataBaseMiddleware.GetCategories({
        callback: res => {
          if (res.status == 200) {
            setCategoryData(res.data);
          } else {
            Toast.show({
              type: 'success',
              text1: 'Alert',
              text2: 'Something went wrong',
              position: 'bottom',
            });
          }
        },
      }),
    );
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const postAd = () => {
    if (pictures?.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Pictures are required',
        position: 'bottom',
      });
      return;
    }
    if (!selectedCategory) {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Please select category',
        position: 'bottom',
      });
      return;
    }
    if (petName.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Pet Name is required',
        position: 'bottom',
      });
      return;
    }
    if (breed.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Breed is required',
        position: 'bottom',
      });
      return;
    }
    if (age.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Age is required',
        position: 'bottom',
      });
      return;
    }
    if (weight.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Weight is required',
        position: 'bottom',
      });
      return;
    }
    if (price.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Price is required',
        position: 'bottom',
      });
      return;
    }
    if (description.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Please write a short Description',
        position: 'bottom',
      });
      return;
    }
    dispatch(
      DataBaseMiddleware.PostPetAd({
        name: petName,
        category: selectedCategory,
        breed: breed,
        age: age,
        description: description,
        weight: weight,
        price: price,
        lat: lat,
        lng: long,
        topPet: isTopEnabled,
        topTen: isTopTenEnabled,
        seller_id: user.id,
        seller_name: user.firstName + user.lastName,
        seller_number: user.phoneNumber,
        seller_picture: user.profilePicture,
        pet_pictures: pictures,
        city: user.city,
        callback: res => {
          if (res.status == 200) {
            Alert.alert(
              'Congratulations!',
              'We have successfully received your request. Our team will review it shortly.',
              [
                {
                  onPress: () => NavigationService.resetStack('BottomTabs'),
                  text: 'Okay',
                },
              ],
            );

            Toast.show({
              type: 'success',
              text1: 'Alert',
              text2: 'Ad Posted Successfully',
              position: 'bottom',
            });
            NavigationService.goBack();
          } else {
            Toast.show({
              type: 'error',
              text1: 'Alert',
              text2: 'Something went wrong',
              position: 'bottom',
            });
          }
        },
      }),
    );
  };

  const RemovePic = () => {
    pictures.splice(selectedPicIdex, 1);
    setPictures([...pictures]);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          actionSheetRefRemove.current?.show();
          setSelectedPicIndex(index);
        }}
        style={{
          width: Metrix.HorizontalSize(70),
          height: Metrix.HorizontalSize(70),
          borderRadius: 10,
          marginRight: 10,
          marginVertical: Metrix.VerticalSize(10),
        }}>
        <Image
          source={{uri: item.uri}}
          style={{
            resizeMode: 'stretch',
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}
        />
      </TouchableOpacity>
    );
  };

  console.warn('user', isTopTenEnabled);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text
        style={{
          color: Colors.black,
          fontWeight: 'bold',
          fontSize: Metrix.customFontSize(20),
        }}>
        Sell Your Pet
      </Text>
      <Text
        style={{
          ...CommonStyles.textStyles.intro,
          marginVertical: Metrix.VerticalSize(10),
        }}>
        Post the ad and allow the buyer to contact you directly on your phone or
        via chat. We won't take any cut from your money, but we will review your
        ad before posting it live.
      </Text>
      <View style={styles.view}>
        <View style={{marginBottom: Metrix.VerticalSize(20)}}>
          <Text style={{...styles.textInputText}}>Add Pictures</Text>
          {/* {pictures.map(val => {
            return (
              <TouchableOpacity
                style={{
                  width: Metrix.HorizontalSize(70),
                  height: Metrix.HorizontalSize(70),
                  borderRadius: 10,
                }}>
                <Image
                  source={{uri: val.uri}}
                  style={{resizeMode: 'stretch', width: '100%', height: '100%', borderRadius: 10}}
                />
              </TouchableOpacity>
            );
          })} */}
          <View
            style={{
              flexDirection: 'row',
              marginVertical: Metrix.VerticalSize(5),
            }}>
            {pictures.length ? (
              <FlatList
                data={pictures}
                // contentContainerStyle={{alignSelf: 'flex-start'}}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                // extraData={refresh}
                // horizontal={true}
                scrollEnabled={false}
                keyExtractor={index => index.toString()}
                renderItem={renderItem}
                ListFooterComponent={() => {
                  return (
                    <TouchableOpacity
                      style={styles.picturesBox}
                      onPress={() => {
                        actionSheetRef.current?.show();
                      }}>
                      <Entypo name="plus" color={Colors.white} size={70} />
                    </TouchableOpacity>
                  );
                }}
              />
            ) : (
              <TouchableOpacity
                style={styles.picturesBox}
                onPress={() => {
                  actionSheetRef.current?.show();
                }}>
                <Entypo name="camera" color={Colors.white} size={40} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{height: 50}}>
          <PickerButton
            onPress={() => setModal(true)}
            value={
              selectedCategory == '' ? 'Select Category' : selectedCategory
            }
            placeholder="Select Category"
          />
        </View>
        <View style={{marginVertical: Metrix.VerticalSize(0)}}>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(30),
            }}>
            <Text style={styles.textInputText}>Pet Name</Text>
            <TextInputComp
              value={petName}
              onChange={text => setPetName(text)}
              placeholder={'Enter Here'}
              // type={'email-address'}
            />
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(30),
            }}>
            <Text style={styles.textInputText}>Breed</Text>
            <TextInputComp
              value={breed}
              onChange={text => setBreed(text)}
              placeholder={'Enter Here'}
              // type={'email-address'}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                height: Metrix.VerticalSize(50),
                marginVertical: Metrix.VerticalSize(30),
                width: '48%',
              }}>
              <Text style={styles.textInputText}>Pet Age</Text>
              <TextInputComp
                value={age}
                onChange={text => setAge(text)}
                placeholder={'2 Years'}
                // type={'email-address'}
              />
            </View>
            <View
              style={{
                height: Metrix.VerticalSize(50),
                marginVertical: Metrix.VerticalSize(30),
                width: '48%',
              }}>
              <Text style={styles.textInputText}>Pet Weight</Text>
              <TextInputComp
                value={weight}
                onChange={text => setWeight(text)}
                placeholder={'5 kg'}
                // type={'email-address'}
              />
            </View>
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(30),
            }}>
            <Text style={styles.textInputText}>Price</Text>
            <TextInputComp
              value={price}
              onChange={text => setPrice(text)}
              placeholder={'Enter Here'}
              type={'number-pad'}
            />
          </View>
          <View
            style={{
              // height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(30),
            }}>
            <Text style={styles.textInputText}>Description</Text>
            <TextInputComp
              value={description}
              onChange={text => setDescription(text)}
              placeholder={'Enter Here'}
              // type={'email-address'}
              multiline={true}
              propStyles={{
                height: Metrix.VerticalSize(150),
                paddingVertical: 10,
              }}
            />
          </View>
        </View>

        <View style={{marginVertical: Metrix.VerticalSize(10)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: Metrix.VerticalSize(10),
            }}>
            <Text style={{color: Colors.black, ...styles.textInputText}}>
              Add you ad in Top Pets
            </Text>
            <Switch
              trackColor={{false: '#767577', true: Colors.logoGreen}}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isTopEnabled}
            />
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: Metrix.VerticalSize(10),
            }}>
            <Text style={{color: Colors.black, ...styles.textInputText}}>
              Add you ad in Top 10 Pets
            </Text>
            <Switch
              trackColor={{false: '#767577', true: Colors.logoGreen}}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTenSwitch}
              value={isTopTenEnabled}
            />
          </View> */}
          <View
            style={{
              marginVertical: Metrix.VerticalSize(15),
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                postAd();
              }}
              style={{
                backgroundColor: Colors.backgroundBlue,
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
                Post Ad
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomModal
          data={categoryData}
          onCancel={() => setModal(false)}
          show={modal}
          onSelect={item => {
            setModal(false);
            setSelectedCategory(item.name);
          }}
          type="object"
        />
      </View>
      <ActionSheet
        ref={actionSheetRef}
        title={'Select Pet Picture'}
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
      <ActionSheet
        ref={actionSheetRefRemove}
        title={'Remove Picture'}
        options={['Remove', 'Cancel']}
        cancelButtonIndex={2}
        onPress={index => {
          if (index == 0) {
            RemovePic();
          } else if (index == 1) {
            // actionSheetRefRemove.current?.show();
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
    paddingHorizontal: Metrix.HorizontalSize(30),
  },
  view: {
    marginTop: Metrix.VerticalSize(20),
  },
  textInputText: {
    color: Colors.black,
    fontSize: Metrix.customFontSize(14),
    fontWeight: 'bold',
    marginBottom: Metrix.VerticalSize(5),
    // fontFamily: 'Poppins-Regular',
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
    // marginVertical: 35,
    // alignItems: 'center',
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
  picturesBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: Colors.backgroundBlue,
    // marginVertical: Metrix.VerticalSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SellPet;
