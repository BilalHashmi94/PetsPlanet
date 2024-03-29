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
import FastImage from 'react-native-fast-image';
import {useEffect} from 'react';

const PetDetail = props => {
  const propdata = props.route.params.data;
  const [data, setData] = useState(propdata);
  const [selectedImage, setSelectedImage] = useState(propdata);
  const [mediaModal, setMediaModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const user = useSelector(state => state.AuthReducer.user);
  const [petLiked, setPetLiked] = useState(
    user ? (data?.isLiked?.includes(user.id) ? true : false) : false,
  );
  const [width, setWidth] = useState();
  const [imagesArray, setImagesArray] = useState([]);

  const onLayout = e => {
    setWidth(e.nativeEvent.layout.width);
  };

  useEffect(() => {
    data.pet_pictures.map(val => {
      imagesArray.push(Img_url + val);
    });
  }, []);

  const dispatch = useDispatch();
  console.warn('data', data);

  const likeAd = () => {
    if (petLiked) {
      const body = data.isLiked.filter(val => !val.includes(user.id));
      const newData = {...data, isLiked: [...body]};
      console.log('body false', newData);
      dispatch(
        DataBaseMiddleware.PostPetAdLike({
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
        DataBaseMiddleware.PostPetAdLike({
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

  const DeleteAdFunc = () => {
    let payload = {
      _id: data._id,
    };
    dispatch(
      DataBaseMiddleware.DeleteAd({
        body: payload,
        callback: res => {
          console.warn('resss', res);
          if (res === 'success') {
            setDeleteModal(false);
            NavigationService.resetStack('BottomTabs');
            Toast.show({
              text1: 'Ad Deleted Successfully',
              type: 'success',
              position: 'bottom',
            });
          }
        },
      }),
    );
  };

  return (
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
        {data.pet_pictures ? (
          // <View style={{width: width, height: 300, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, backgroundColor: 'black'}}>
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
            style={{
              width: width,
              height: 300,
              // borderBottomRightRadius: 30,
              // borderBottomLeftRadius: 30,
              backgroundColor: 'black',
            }}
          />
        ) : (
          // </View>
          // <Image source={{uri: Img_url + data.pet_pictures[0]}} style={{width: '100%', height:}}/>
          <Image
            source={{
              uri: Images.avatar,
            }}
            style={styles.imageStyle}
          />
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
              style={{fontWeight: 'bold', fontSize: Metrix.customFontSize(25)}}>
              {data.name}
            </Text>
            {data.approved === false ? (
              <Text
                style={{
                  fontSize: Metrix.customFontSize(12),
                  color: 'green',
                }}>
                Your ad is under review it'll be live once reviewed
              </Text>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 0,
                alignItems: 'center',
              }}>
              <FontAwesome name={'paw'} size={15} color={Colors.petOrange} />
              <Text
                style={{
                  marginLeft: 10,
                  color: Colors.petOrange,
                  marginTop: 5,
                  fontFamily: 'Lato-Italic',
                }}>
                {data.breed}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
              }}>
              <Entypo name={'location'} size={15} color={Colors.primary} />
              <Text
                style={{
                  marginLeft: 10,
                  color: Colors.primary,
                  marginTop: 5,
                  fontFamily: 'Lato-Italic',
                }}>
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
        <View
          style={{
            marginVertical: Metrix.VerticalSize(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={styles.detailComp1}>
            <Text
              style={{
                ...styles.textStyle,
                color: '#FFBC11',
                fontWeight: 'bold',
              }}>
              Price:
            </Text>
            <Text
              style={{...styles.textStyle, color: Colors.black}}
              numberOfLines={1}>
              {data.price}
            </Text>
          </View>
          <View style={{...styles.detailComp1}}>
            <Text
              style={{
                ...styles.textStyle,
                color: '#FFBC11',
                fontWeight: 'bold',
              }}>
              Age:
            </Text>
            <Text
              style={{...styles.textStyle, color: Colors.black}}
              numberOfLines={1}>
              {data.age}
            </Text>
          </View>
          <View style={styles.detailComp1}>
            <Text
              style={{
                ...styles.textStyle,
                color: '#FFBC11',
                fontWeight: 'bold',
              }}>
              Weight:
            </Text>
            <Text
              style={{...styles.textStyle, color: Colors.black}}
              numberOfLines={1}>
              {data.weight}
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
          user?.id === data.seller_id ? (
            <View>
              <Button
                title={'Delete Ad'}
                backColor={Colors.red}
                onPress={() => setDeleteModal(true)}
              />
            </View>
          ) : (
            <View style={{marginVertical: Metrix.VerticalSize(10)}}>
              <View style={styles.detailComp}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{
                      uri: data.seller_picture
                        ? Img_url + data.seller_picture
                        : Images.avatar,
                    }}
                    style={{
                      borderRadius: 10,
                      height: Metrix.VerticalSize(60),
                      width: Metrix.HorizontalSize(60),
                    }}
                  />
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
                      {data.seller_number}
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: Metrix.customFontSize(14),
                        color: Colors.placeholderGray,
                      }}>
                      Pet Owner
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
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
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      NavigationService.navigate('Chat', {item: data})
                    }
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
          )
        ) : (
          <Button
            title={'Contact Seller'}
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
      <ReactNativeModal
        isVisible={deleteModal}
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
            onPress={() => setDeleteModal(false)}
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
            <Text style={CommonStyles.textStyles.heading}>Warning</Text>
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
              Are you sure you want to delete this ad
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Button
              title={'Delete '}
              backColor={Colors.red}
              onPress={() => {
                DeleteAdFunc();
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
    // height: Metrix.VerticalSize(100),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    paddingHorizontal: Metrix.HorizontalSize(20),
    paddingVertical: Metrix.VerticalSize(10),
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
  detailComp1: {
    backgroundColor: 'rgba(255, 188, 17, 0.1)',
    height: Metrix.VerticalSize(100),
    width: '30%',
    justifyContent: 'center',
    // width: Metrix.HorizontalSize(109),
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    borderRadius: 15,
    paddingHorizontal: Metrix.HorizontalSize(10),
    paddingVertical: Metrix.VerticalSize(10),
    marginVertical: 5,
    alignItems: 'center',
    // justifyContent: 'center',
    // shadowColor: Colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
  },
  textStyle: {
    // fontWeight: 'bold',
    fontSize: Metrix.customFontSize(20),
  },
});

export default PetDetail;
