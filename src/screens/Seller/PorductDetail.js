import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  Colors,
  CommonStyles,
  Images,
  Metrix,
  NavigationService,
} from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {Img_url} from '../../config/ApiCaller';
import {SliderBox} from 'react-native-image-slider-box';
import {useDispatch, useSelector} from 'react-redux';
import DataBaseMiddleware from '../../redux/Middlewares/DataBaseMiddleware';
import Toast from 'react-native-toast-message';
import ReactNativeModal from 'react-native-modal';
import Button from '../../components/Button';
import ImageSlider from 'react-native-image-slider';
import FastImage from 'react-native-fast-image';
import {AuthAction} from '../../redux/Actions';

const PetDetail = props => {
  const propdata = props.route.params.data;
  const [data, setData] = useState(propdata);
  const [selectedImage, setSelectedImage] = useState(propdata);
  const [mediaModal, setMediaModal] = useState(false);
  const user = useSelector(state => state.AuthReducer.user);
  const [petLiked, setPetLiked] = useState(
    user ? (data?.isLiked?.includes(user.id) ? true : false) : false,
  );
  const [width, setWidth] = useState();
  const [imagesArray, setImagesArray] = useState([]);
  const [cartCount, setCartCount] = useState(1);
  const cartData = useSelector(state => state.AuthReducer.cartData);

  const onLayout = e => {
    setWidth(e.nativeEvent.layout.width);
  };

  propdata?.product_pictures.map(val => {
    imagesArray.push(Img_url + val);
  });

  const dispatch = useDispatch();

  const likeAd = () => {
    if (petLiked) {
      const body = data.isLiked.filter(val => !val.includes(user.id));
      const newData = {...data, isLiked: [...body]};
      console.log('body false', newData);
      dispatch(
        DataBaseMiddleware.PostProdAdLike({
          body: newData,
          callback: res => {
            if (petLiked && !res.isLiked.includes(user.id)) {
              setData({...data, ...res});
              setPetLiked(false);
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
    } else {
      const body = {...data, isLiked: [...data.isLiked, user.id]};
      console.log('body', body);
      dispatch(
        DataBaseMiddleware.PostProdAdLike({
          body: body,
          callback: res => {
            if (!petLiked && res.isLiked.includes(user.id)) {
              setData({...data, ...res});
              setPetLiked(true);
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
    }
  };

  // console.warn('data', imagesArray[selectedImage]);
  // console.warn('dat====a', data);

  return (
    <>
      <ScrollView style={styles.container} onLayout={e => onLayout(e)}>
        <View style={styles.imageView}>
          <TouchableOpacity
            onPress={() => NavigationService.goBack()}
            style={styles.backButton}>
            <Ionicons
              name={'md-chevron-back-outline'}
              color={Colors.black}
              size={Metrix.customFontSize(25)}
            />
          </TouchableOpacity>
          {imagesArray.length ? (
            <SliderBox
              images={imagesArray}
              sliderBoxHeight={300}
              onCurrentImagePressed={(index, image) => {
                // console.warn(`image ${index} pressed`)
                setSelectedImage(index);
                setMediaModal(true);
              }}
              parentWidth={width}
              dotColor={Colors.primary}
              inactiveDotColor="#90A4AE"
              paginationBoxVerticalPadding={20}
              autoplay
              circleLoop
            />
          ) : (
            // <View style={{width: '100%', height: Metrix.VerticalSize(300),}}>
            // <FastImage source={{uri: Img_url + data?.product_pictures[0], priority: FastImage.priority.high}} resizeMode={FastImage.resizeMode.cover} />
            // </View>
            <Image source={Images.avatar} style={styles.imageStyle} />
          )}
        </View>
        <View style={{paddingHorizontal: Metrix.HorizontalSize(25)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: Metrix.VerticalSize(20),
            }}>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: Metrix.customFontSize(25),
                }}>
                {data.name}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Entypo name={'location'} size={25} color={Colors.primary} />
                <Text
                  style={{marginLeft: 10, color: Colors.primary, marginTop: 5}}>
                  {data.city}
                </Text>
              </View>
            </View>
            {user ? (
              <TouchableOpacity onPress={() => likeAd()} style={{marginTop: 5}}>
                {petLiked ? (
                  // <View
                  //   style={{
                  //     width: 50,
                  //     height: 50,
                  //     borderRadius: 50 / 2,
                  //     backgroundColor: Colors.red,
                  //     alignItems: 'center',
                  //     justifyContent: 'center',
                  //   }}>
                  <FontAwesome name={'heart'} color={Colors.red} size={25} />
                ) : (
                  // </View>
                  <FontAwesome
                    name={'heart-o'}
                    color={Colors.placeholderGray}
                    size={25}
                  />
                )}
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={{marginVertical: Metrix.VerticalSize(10)}}>
            <View style={styles.detailComp}>
              <Text
                style={{...styles.textStyle, color: Colors.placeholderGray}}>
                Shop:
              </Text>
              <Text style={{...styles.textStyle, color: Colors.black}}>
                {data.shopName}
              </Text>
            </View>
            <View style={styles.detailComp}>
              <Text
                style={{...styles.textStyle, color: Colors.placeholderGray}}>
                price:
              </Text>
              <Text style={{...styles.textStyle, color: Colors.black}}>
                {data.price}
              </Text>
            </View>
          </View>
          {/* Description ===============> */}
          <View style={{marginVertical: Metrix.VerticalSize(10)}}>
            <Text
              style={{fontWeight: 'bold', fontSize: Metrix.customFontSize(20)}}>
              Description:
            </Text>
            <Text
              style={{
                color: Colors.darkGray,
                fontSize: Metrix.customFontSize(17),
                marginVertical: 10,
              }}>
              {data.description}
            </Text>
          </View>
          {/* Contact ==================>>>>>>>>>>>> */}

          {user ? (
            <View style={{marginVertical: Metrix.VerticalSize(10)}}>
              <View style={styles.detailComp}>
                <View style={{flexDirection: 'row'}}>
                  {data.seller_picture ? (
                    <FastImage
                      source={{uri: Img_url + data.seller_picture, priority: FastImage.priority.high}}
                      style={{
                        borderRadius: 10,
                        height: Metrix.VerticalSize(60),
                        width: Metrix.HorizontalSize(60),
                      }}
                    />
                  ) : (
                    <Image
                      source={Images.avatar}
                      style={{
                        borderRadius: 10,
                        height: Metrix.VerticalSize(60),
                        width: Metrix.HorizontalSize(60),
                      }}
                    />
                  )}
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: Metrix.customFontSize(16),
                      }}>
                      {data.seller_name}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: Metrix.customFontSize(14),
                        marginVertical: 2,
                      }}>
                      {data.shopName}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: Metrix.customFontSize(14),
                        color: Colors.placeholderGray,
                      }}>
                      Product Owner
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  {/* <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Feather
                      name={'phone-call'}
                      color={Colors.placeholderGray}
                      size={25}
                    />
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={{
                      marginLeft: 10,
                      width: 40,
                      height: 40,
                      borderRadius: 40 / 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Colors.primary,
                    }}>
                    <AntDesign
                      name={'message1'}
                      color={Colors.white}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <Button
              title={'Login to view phone number'}
              onPress={() => NavigationService.resetStack('SignIn')}
            />
          )}
        </View>
        <ReactNativeModal isVisible={mediaModal} style={{margin: 0}}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: Colors.black,
            }}>
            <TouchableOpacity
              onPress={() => setMediaModal(false)}
              style={{
                paddingTop: Metrix.VerticalSize(50),
                position: 'absolute',
                paddingHorizontal: Metrix.HorizontalSize(20),
                right: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                zIndex: 99999,
              }}>
              <View></View>
              <View></View>
              <AntDesign name="close" color={Colors.white} size={25} />
            </TouchableOpacity>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <FastImage
                source={{uri: imagesArray[selectedImage]}}
                style={{resizeMode: 'contain', width: '100%', height: '100%'}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
        </ReactNativeModal>
      </ScrollView>
      {/* {user ? (
        <View
          style={{
            width: '100%',
            height: Metrix.VerticalSize(60),
            position: 'absolute',
            zIndex: 999,
            bottom: 0,
            // backgroundColor: Colors.primary,
            // borderTopRightRadius: 20,
            // borderTopLeftRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: Metrix.HorizontalSize(20),
            borderTopWidth: 0.5,
            borderColor: Colors.placeholderGray,
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <AntDesign name="isv" size={25} color={Colors.primary} />
            <Text
              style={{...CommonStyles.textStyles.intro, color: Colors.primary}}>
              Shop
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '30%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (cartCount === 0) {
                  return;
                } else {
                  setCartCount(cartCount - 1);
                }
              }}>
              <FontAwesome name="minus" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <Text
              style={{...CommonStyles.textStyles.intro, color: Colors.primary}}>
              {cartCount}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setCartCount(cartCount + 1);
              }}>
              <FontAwesome name="plus" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <Button
            title={'Add To Cart'}
            propStyle={{width: 150, borderRadius: 10, height: 35}}
            textStyle={{fontSize: 14}}
            onPress={() => {
              let data = {
                data: propdata,
                quantity: cartCount,
              };
              console.warn('data', data);
              dispatch(AuthAction.Cart([...cartData, data]));
            }}
          />
        </View>
      ) : null} */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingHorizontal: Metrix.HorizontalSize(20),
  },
  backButton: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: Metrix.HorizontalSize(35),
    height: Metrix.VerticalSize(35),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 999,
    top: 50,
    marginHorizontal: 30,
  },
  imageView: {
    width: '100%',
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
  },
  imageStyle: {
    width: '100%',
    height: 300,
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
  },
  detailComp: {
    backgroundColor: Colors.white,
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
  textStyle: {
    fontWeight: 'bold',
    fontSize: Metrix.customFontSize(20),
  },
});

export default PetDetail;
