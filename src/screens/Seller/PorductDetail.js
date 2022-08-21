import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors, Images, Metrix, NavigationService} from '../../config';
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

const PetDetail = props => {
  const propdata = props.route.params.data;
  const [data, setData] = useState(propdata);
  const [selectedImage, setSelectedImage] = useState(propdata);
  const [mediaModal, setMediaModal] = useState(false);
  const user = useSelector(state => state.AuthReducer.user);
  const [petLiked, setPetLiked] = useState(false);
  const [width, setWidth] = useState();
  const [imagesArray, setImagesArray] = useState([]);

  const onLayout = e => {
    setWidth(e.nativeEvent.layout.width);
  };

  //   data?.pet_pictures.map(val => {
  //     imagesArray.push(Img_url + val);
  //   });

  const dispatch = useDispatch();

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
        {data?.pet_pictures ? (
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
              style={{fontWeight: 'bold', fontSize: Metrix.customFontSize(25)}}>
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
        </View>
        <View style={{marginVertical: Metrix.VerticalSize(10)}}>
          <View style={styles.detailComp}>
            <Text style={{...styles.textStyle, color: Colors.placeholderGray}}>
              Breed:
            </Text>
            <Text style={{...styles.textStyle, color: Colors.black}}>
              {data.breed}
            </Text>
          </View>
          <View style={styles.detailComp}>
            <Text style={{...styles.textStyle, color: Colors.placeholderGray}}>
              Age:
            </Text>
            <Text style={{...styles.textStyle, color: Colors.black}}>
              {data.age}
            </Text>
          </View>
          <View style={styles.detailComp}>
            <Text style={{...styles.textStyle, color: Colors.placeholderGray}}>
              Weight:
            </Text>
            <Text style={{...styles.textStyle, color: Colors.black}}>
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
        <View style={{marginVertical: Metrix.VerticalSize(10)}}>
          <View style={styles.detailComp}>
            <View style={{flexDirection: 'row'}}>
              {data.seller_picture ? (
                <Image
                  source={{uri: Img_url + data.seller_picture}}
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
                style={{
                  marginLeft: 10,
                  width: 40,
                  height: 40,
                  borderRadius: 40 / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.primary,
                }}>
                <AntDesign name={'message1'} color={Colors.white} size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
            <Image
              source={{uri: imagesArray[selectedImage]}}
              style={{resizeMode: 'contain', width: '100%', height: '100%'}}
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
