import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors, Images, Metrix, NavigationService} from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import TextInputComp from '../../components/TextInputComp';
import {SliderBox} from 'react-native-image-slider-box';
import {Img_url} from '../../config/ApiCaller';

const SellDetail = props => {
  const data = props.route.params.data;
  const [about, setAbout] = useState(data.description);
  const [imagesArray, setImagesArray] = useState([]);
  const [width, setWidth] = useState();

  data.pet_pictures.map(val => {
    imagesArray.push(Img_url + val);
  });

  const onLayout = e => {
    setWidth(e.nativeEvent.layout.width);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageView} onLayout={(e) => onLayout(e)}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backButton}>
          <Ionicons
            name={'md-chevron-back-outline'}
            color={Colors.black}
            size={Metrix.customFontSize(25)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.editButton}>
          <FontAwesome
            name={'edit'}
            color={Colors.black}
            size={Metrix.customFontSize(25)}
          />
        </TouchableOpacity>
        {data.pet_pictures ? (
          <SliderBox
            images={imagesArray}
            sliderBoxHeight={300}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            parentWidth={width}
            dotColor={Colors.primary}
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
          />
        ) : (
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
              {data.productName}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Entypo name={'location'} size={25} color={Colors.primary} />
              <Text
                style={{marginLeft: 10, color: Colors.primary, marginTop: 5}}>
                {data.city}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <FontAwesome
              name={'edit'}
              color={Colors.placeholderGray}
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginVertical: Metrix.VerticalSize(10)}}>
          <View style={{backgroundColor: Colors.white, ...styles.detailComp}}>
            <Text style={{...styles.textStyle, color: Colors.placeholderGray}}>
              Price:
            </Text>
            <Text style={{...styles.textStyle, color: Colors.black}}>
              {data.price}
            </Text>
          </View>
          {data?.mallItem ? (
            <View style={{backgroundColor: Colors.white, ...styles.detailComp}}>
              <Text
                style={{...styles.textStyle, color: Colors.placeholderGray}}>
                Delivery Time:
              </Text>
              <Text style={{...styles.textStyle, color: Colors.black}}>
                {data.deliveryTime}
              </Text>
            </View>
          ) : (
            <View style={{backgroundColor: Colors.white, ...styles.detailComp}}>
              <Text
                style={{...styles.textStyle, color: Colors.placeholderGray}}>
                Breed:
              </Text>
              <Text style={{...styles.textStyle, color: Colors.black}}>
                {data.breed}
              </Text>
            </View>
          )}
          <View style={{backgroundColor: Colors.white, ...styles.detailComp}}>
            <Text style={{...styles.textStyle, color: Colors.placeholderGray}}>
              Number:
            </Text>
            <Text style={{...styles.textStyle, color: Colors.black}}>
              {data.seller_number}
            </Text>
          </View>
        </View>
        {/* Description ===============> */}
        <View style={{marginVertical: Metrix.VerticalSize(10)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{fontWeight: 'bold', fontSize: Metrix.customFontSize(20)}}>
              About:
            </Text>
            <FontAwesome
              name={'edit'}
              color={Colors.placeholderGray}
              size={25}
            />
          </View>
          <View style={{height: Metrix.VerticalSize(150)}}>
            <TextInputComp
              value={about}
              onChange={text => setAbout(text)}
              placeholder={data.about}
              multi={true}
            />
          </View>
        </View>
        <View style={{marginVertical: Metrix.VerticalSize(10)}}>
          <View style={{marginVertical: Metrix.VerticalSize(10)}}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.green,
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
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  editButton: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: Metrix.HorizontalSize(35),
    height: Metrix.VerticalSize(35),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 999,
    top: 50,
    right: 0,
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
  textStyle: {
    fontWeight: 'bold',
    fontSize: Metrix.customFontSize(20),
  },
});

export default SellDetail;
