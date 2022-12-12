import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import SearchHeader from '../../components/SearchHeader';
import {Colors, Metrix, Images, NavigationService} from '../../config';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AuthMiddleware from '../../redux/Middlewares/AuthMiddleware';
import {useDispatch, useSelector} from 'react-redux';
import {Img_url} from '../../config/ApiCaller';
import FastImage from 'react-native-fast-image';

const DoctorsList = props => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.AuthReducer.user);
  const loader = useSelector(state => state.LoaderReducer.loading);
  const [data, setData] = useState([]);

  useEffect(() => {
    getDoc();
  }, []);
  console.warn('user', user);

  const getDoc = () => {
    dispatch(
      AuthMiddleware.GetDoctors({
        city: user?.city,
        callback: res => {
          setData(res);
          console.warn(res);
        },
      }),
    );
  };

  const renderContent = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => NavigationService.navigate('DoctorDetail', {data: item})}
        style={{
          marginVertical: Metrix.VerticalSize(10),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.detailComp}>
          <View style={{flexDirection: 'row'}}>
            {item?.profilePicture ? (
              <FastImage
                source={{uri: Img_url + item?.profilePicture, priority: FastImage.priority.high,}}
                style={{
                  borderRadius: 10,
                  height: Metrix.VerticalSize(60),
                  width: Metrix.HorizontalSize(60),
                }}
                resizeMode={FastImage.resizeMode.cover}
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
            <View style={{marginLeft: 10, justifyContent: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: Metrix.customFontSize(16),
                  color: Colors.black,
                }}>
                Dr {item.firstName} {item.lastName}
              </Text>
              <View style={{flexDirection: 'row', marginVertical: 3}}>
                <Entypo name={'back-in-time'} color={Colors.red} size={15} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: Metrix.customFontSize(14),
                    marginLeft: 5,
                    color: Colors.black,
                  }}>
                  {item?.openAt} - {item?.closeAt}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Entypo name={'location-pin'} color={Colors.green} size={15} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: Metrix.customFontSize(14),
                    color: Colors.placeholderGray,
                    marginLeft: 5,
                  }}>
                  {item.town}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SearchHeader back={true} name={'drList'}/>
      <View
        style={{
          marginBottom: Metrix.VerticalSize(10),
          marginTop: Metrix.VerticalSize(20),
          flexDirection: 'row',
          //   justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: Metrix.customFontSize(25),
            color: Colors.black,
          }}>
          All vets in
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: Metrix.customFontSize(25),
            color: Colors.primary,
            marginLeft: 10,
          }}>
          {user?.city}
        </Text>
      </View>
      <View
        style={{
          marginTop: Metrix.VerticalSize(5),
          marginBottom: Metrix.VerticalSize(150),
        }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          //   numColumns={2}
          keyExtractor={index => index.toString()}
          renderItem={item => renderContent(item)}
          ListEmptyComponent={() => (
            <View
              style={{
                marginVertical: Metrix.VerticalSize(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {!loader ? (
                <Text style={{color: Colors.black}}>
                  Sorry! No Doctors Found In Your Area. Press to See The List Of
                  All Doctors
                </Text>
              ) : null}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailComp: {
    backgroundColor: Colors.white,
    width: '99%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    paddingHorizontal: Metrix.HorizontalSize(10),
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

export default DoctorsList;
