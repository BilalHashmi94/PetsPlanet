import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Images, Metrix, NavigationService} from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import {Img_url} from '../../config/ApiCaller';

const DoctorDetail = props => {
  const data = props.route.params.data;
  const [petLiked, setPetLiked] = useState(false);

  const openGps = (lat, lng) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${data?.lat},${data?.lng}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container}>
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
        <Image
          source={{uri: Img_url + data.clinicImage}}
          style={styles.imageStyle}
        />
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
              Dr {data.firstName} {data.lastName}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Entypo name={'location'} size={25} color={Colors.primary} />
              <Text
                style={{marginLeft: 10, color: Colors.primary, marginTop: 5}}>
                {data.town}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome
              name={'star'}
              color={Colors.placeholderGray}
              size={25}
            />
            <FontAwesome
              name={'star'}
              color={Colors.placeholderGray}
              size={25}
            />
            <FontAwesome name={'star'} color={'tomato'} size={25} />
            <FontAwesome name={'star'} color={'tomato'} size={25} />
            <FontAwesome name={'star'} color={'tomato'} size={25} />
          </View>
        </View>
        <View style={{marginVertical: Metrix.VerticalSize(10)}}>
          <View style={{backgroundColor: Colors.white, ...styles.detailComp}}>
            <Text style={{...styles.textStyle, color: Colors.placeholderGray}}>
              Clinic Name:
            </Text>
            <Text style={{...styles.textStyle, color: Colors.black}}>
              {data.clinicName}
            </Text>
          </View>
          <View style={{backgroundColor: Colors.white, ...styles.detailComp}}>
            <Text style={{...styles.textStyle, color: Colors.placeholderGray}}>
              Time:
            </Text>
            <Text style={{...styles.textStyle, color: Colors.black}}>
              {data.openAt} - {data.closeAt}
            </Text>
          </View>
          <View style={{backgroundColor: Colors.white, ...styles.detailComp}}>
            <Text style={{...styles.textStyle, color: Colors.placeholderGray}}>
              Location:
            </Text>
            <TouchableOpacity onPress={() => openGps()}>
              <Text
                style={{
                  ...styles.textStyle,
                  color: Colors.blue,
                  textDecorationLine: 'underline',
                }}>
                Open in maps
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Description ===============> */}
        <View style={{marginVertical: Metrix.VerticalSize(10)}}>
          <Text
            style={{fontWeight: 'bold', fontSize: Metrix.customFontSize(20)}}>
            About:
          </Text>
          <Text
            style={{
              color: Colors.darkGray,
              fontSize: Metrix.customFontSize(17),
              marginVertical: 10,
            }}>
            {data.aboutClinic}
          </Text>
        </View>
        {/* Contact ==================>>>>>>>>>>>> */}
        <View style={{marginVertical: Metrix.VerticalSize(10)}}>
          <View style={{backgroundColor: Colors.white, ...styles.detailComp}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={Images.avatar}
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
                  {data.firstName}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: Metrix.customFontSize(16),
                    marginVertical: 2,
                  }}>
                  {data.lastName}
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: Metrix.customFontSize(14),
                    color: Colors.placeholderGray,
                  }}>
                  {data.phoneNumber}
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
          {/* Rate Modal ============>>>>>>>>>>>>>>>>> */}
          {/* <View style={{marginVertical: Metrix.VerticalSize(10)}}>
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
                Rate Me
              </Text>
            </TouchableOpacity>
          </View> */}
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
    fontSize: Metrix.customFontSize(16),
  },
});

export default DoctorDetail;
