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
import {Colors, Metrix, NavigationService} from '../../config';
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
import {AuthAction} from '../../redux/Actions';

const actionSheetRef = createRef();
const actionSheetRefRemove = createRef();

const CreateShopTwo = props => {
  const dispatch = useDispatch();
  const [shopName, setShopName] = useState('');
  const [pictures, setPictures] = useState();
  const user = useSelector(state => state.AuthReducer.user);

  const openPicker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      cropping: false,
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
        setPictures(file);
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
        setPictures(file);
      })
      .catch(err => {
        console.warn('Error', err);
      });
  };
console.warn('user', user);
  const createShop = () => {
    dispatch(
      DataBaseMiddleware.CreateShop({
        userId: user.id,
        file: pictures,
        shopName: shopName,
        callback: res => {
          console.warn('res', res);
          if (res?.email) {
            dispatch(AuthAction.Signin(res));
            NavigationService.navigate('AddProduct');
          }
        },
      }),
    );
  };

  const RemovePic = () => {
    setPictures();
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
        Lets Create A Shop
      </Text>
      <View style={styles.view}>
        <View style={{marginBottom: Metrix.VerticalSize(20)}}>
          <Text style={{...styles.textInputText, fontWeight: 'bold'}}>
            Add a banner image for your shop
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: Metrix.VerticalSize(5),
            }}>
            {/* {pictures.length ? (
              <FlatList
                data={pictures}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                // extraData={refresh}
                // horizontal={true}
                scrollEnabled={false}
                keyExtractor={index => index.toString()}
                renderItem={renderItem}
              />
            ) : (
              <TouchableOpacity
                style={styles.picturesBox}
                onPress={() => {
                  actionSheetRef.current?.show();
                }}>
                <FontAwesome5 name="plus" color={Colors.white} size={40} />
              </TouchableOpacity>
            )} */}
            {pictures ? (
              <TouchableOpacity
                onPress={() => {
                  actionSheetRefRemove.current?.show();
                }}
                style={{
                  width: '100%',
                  height: Metrix.HorizontalSize(150),
                  borderRadius: 10,
                  marginRight: 10,
                  marginVertical: Metrix.VerticalSize(10),
                }}>
                <Image
                  source={{uri: pictures.uri}}
                  style={{
                    resizeMode: 'stretch',
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
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
              // height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(20),
            }}>
            <Text style={styles.textInputText}>Shop Name</Text>
            <TextInputComp
              value={shopName}
              onChange={text => setShopName(text)}
              placeholder={'Enter Here'}
              // type={'email-address'}
            />
          </View>
        </View>

        <View style={{marginVertical: Metrix.VerticalSize(10)}}>
          <View
            style={{
              marginVertical: Metrix.VerticalSize(15),
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => createShop()}
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
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    // fontFamily: 'Poppins-Regular',
    fontWeight: 'bold',
    marginBottom: Metrix.VerticalSize(10)
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

export default CreateShopTwo;
