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
import ReactNativeModal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import {AuthAction} from '../../redux/Actions';
import {ToastError, ToastSuccess} from '../../config/Constants';

const actionSheetRef = createRef();
const actionSheetRefRemove = createRef();

const AddProduct = props => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isTopEnabled, setIsTopEnabled] = useState(false);
  const [limitModal, setLimitModal] = useState(false);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const toggleSwitch = () => setIsTopEnabled(previousState => !previousState);
  const [pictures, setPictures] = useState([]);
  const [selectedPicIdex, setSelectedPicIndex] = useState();

  const user = useSelector(state => state.AuthReducer.user);

  const seller_id = user?.id;
  const seller_name = user?.firstName + user?.lastName;
  const seller_number = user?.phoneNumber;
  const seller_picture = user?.profilePicture;
  const city = user.city;
  const shopIdentifier = user?.shopIdentifier;

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
        multiple: true,
      })
        .then(photo => {
          console.log('success', photo);
          photo.map(val => {
            let arr = val.path.split('/');
            let name = val.path.split('/')[arr.length - 1];
            let file = {
              name,
              uri: val.path,
              type: val.mime,
            };
            // this.setState({profilePicture: file});
            // setProfilePic(file)
            pictures.push(file);
            setPictures([...pictures]);
          });
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
        })
        .catch(err => {
          console.warn('Error', err);
        });
    }
  };

  // useEffect(() => {
  //   GetLocation.getCurrentPosition({
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //   })
  //     .then(location => {
  //       console.log(location);
  //       setLat(location.latitude);
  //       setLong(location.longitude);
  //     })
  //     .catch(error => {
  //       const {code, message} = error;
  //       console.warn(code, message);
  //     });
  // }, []);

  const getAllCategories = () => {
    dispatch(
      DataBaseMiddleware.GetShopCategories({
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
    if (name === '') {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Name is required',
        position: 'bottom',
      });
      return;
    }
    if (price === '') {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Price is required',
        position: 'bottom',
      });
      return;
    }
    if (selectedCategory === '') {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Please select category',
        position: 'bottom',
      });
      return;
    }
    if (description === '') {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Please write description',
        position: 'bottom',
      });
      return;
    }
    if (pictures.length < 1) {
      Toast.show({
        type: 'error',
        text1: 'Alert',
        text2: 'Product pictures are required',
        position: 'bottom',
      });
      return;
    }
    dispatch(
      DataBaseMiddleware.PostProductAd({
        name: name,
        category: selectedCategory,
        city: city,
        description: description,
        lat: lat,
        lng: long,
        isLiked: null,
        price: price,
        product_pictures: pictures,
        seller_id: seller_id,
        seller_name: seller_name,
        seller_number: seller_number,
        seller_picture: seller_picture,
        shopIdentifier: shopIdentifier,
        topPet: isTopEnabled,
        callback: res => {
          console.log('callback res', res);
          if (res.status === 280) {
            setLimitModal(true);
          } else if (res.status === 200) {
            dispatch(
              AuthAction.Signin({...user, currentAds: user?.currentAds + 1}),
            );
          }
        },
      }),
    );
  };

  const RemovePic = () => {
    pictures.splice(selectedPicIdex, 1);
    setPictures([...pictures]);
  };

  const BuyExtension = () => {
    let payload = {
      _id: user.id,
      limit: 5,
    };
    dispatch(
      DataBaseMiddleware.BuyExtension({
        body: payload,
        callback: res => {
          if (res) {
            console.log('res', res);
            dispatch(AuthAction.Signin(res));
            setLimitModal(false);
          } else {
            Toast.show(ToastError('Please Contact Our Support Team'));
          }
        },
      }),
    );
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

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text
        style={{
          color: Colors.black,
          fontWeight: 'bold',
          fontSize: Metrix.customFontSize(20),
        }}>
        Add Product
      </Text>
      <View style={styles.view}>
        <View style={{marginVertical: Metrix.VerticalSize(0)}}>
          <View
            style={{
              // height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(10),
            }}>
            <Text style={styles.textInputText}>Name</Text>
            <TextInputComp
              value={name}
              onChange={text => setName(text)}
              placeholder={'Enter Here'}
            />
          </View>
          <View
            style={{
              // height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(10),
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
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(20),
            }}>
            <PickerButton
              onPress={() => setModal(true)}
              value={
                selectedCategory == '' ? 'Select Category' : selectedCategory
              }
              placeholder="Select Category"
            />
          </View>
          <View
            style={{
              // height: Metrix.VerticalSize(50),
              marginBottom: Metrix.VerticalSize(10),
            }}>
            <Text style={styles.textInputText}>Description</Text>
            <TextInputComp
              value={description}
              onChange={text => setDescription(text)}
              placeholder={'Enter Here'}
              // type={'email-address'}
              multiline={true}
              propStyles={{height: 80}}
            />
          </View>
        </View>

        <View style={{marginVertical: Metrix.VerticalSize(20)}}>
          <Text style={{...styles.textInputText, fontWeight: 'bold'}}>
            Add Pictures of your Product {'\n'}
            <Text style={{color: Colors.darkGray, fontWeight: 'normal'}}>
              (You can add upto 5 photos)
            </Text>
          </Text>
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
                    <>
                      {pictures.length < 5 ? (
                        <TouchableOpacity
                          style={styles.picturesBox}
                          onPress={() => {
                            actionSheetRef.current?.show();
                          }}>
                          <Entypo name="plus" color={Colors.white} size={40} />
                        </TouchableOpacity>
                      ) : null}
                    </>
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

        <View style={{marginVertical: Metrix.VerticalSize(0)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: Metrix.VerticalSize(10),
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.black, ...styles.textInputText}}>
              Add your product in Top Products
            </Text>
            <Switch
              trackColor={{false: '#767577', true: Colors.logoGreen}}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isTopEnabled}
            />
          </View>
          <View
            style={{
              marginVertical: Metrix.VerticalSize(15),
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => postAd()}
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
                Post
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
      <ReactNativeModal
        isVisible={limitModal}
        style={{margin: 0, alignItems: 'center'}}>
        <View
          style={{
            width: '70%',
            // height: '100%',
            backgroundColor: Colors.white,
            padding: 10,
            // alignItems: 'center',
            borderRadius: 20,
          }}>
          <TouchableOpacity
            onPress={() => setLimitModal(false)}
            style={{
              // position: 'absolute',
              paddingHorizontal: Metrix.HorizontalSize(20),
              right: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 99999,
            }}>
            <View></View>
            <View></View>
            <AntDesign name="close" color={Colors.black} size={25} />
          </TouchableOpacity>
          <View
            style={{
              marginTop: Metrix.VerticalSize(10),
              alignItems: 'center',
              paddingHorizontal: Metrix.HorizontalSize(20),
            }}>
            <Text style={CommonStyles.textStyles.heading}>Hey!</Text>
          </View>
          <View
            style={{
              marginVertical: Metrix.VerticalSize(20),
              alignItems: 'center',
              paddingHorizontal: Metrix.HorizontalSize(20),
            }}>
            <Text
              style={{
                ...CommonStyles.textStyles.semiHeading,
                color: Colors.darkGray,
                textAlign: 'center',
              }}>
              Your ad reached its limit. You can extend you limit to 5 more ads
              just for Rs.1000.
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Button
              title={'Buy Now'}
              onPress={() => {
                // DeleteAdFunc();
                BuyExtension();
                // setLimitModal(false);
              }}
              propStyle={{borderRadius: 10}}
            />
          </View>
        </View>
      </ReactNativeModal>
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
    // fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    marginBottom: Metrix.VerticalSize(10),
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

export default AddProduct;
