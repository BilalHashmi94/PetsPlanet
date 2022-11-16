import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import SearchHeader from '../../components/SearchHeader';
import {Colors, Metrix, Images, NavigationService} from '../../config';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import DataBaseMiddleware from '../../redux/Middlewares/DataBaseMiddleware';
import Toast from 'react-native-toast-message';

const AllCategories = () => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState([]);

  const getAllCategories = () => {
    dispatch(
      DataBaseMiddleware.GetCategories({
        callback: res => {
          if(res.status == 200){
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

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          NavigationService.navigate('CategorySearch', {data: item})
        }
        style={styles.back}>
        <View style={{flexDirection: 'row'}}>
          <View style={{backgroundColor: item.color, ...styles.view}}>
            <Image
              source={item.name == 'Cat' ? Images.cat : item.name == 'Dog' ? Images.dog : item.name == 'Turtle' ? Images.turtle : item.name == 'Bird' ? Images.bird : item.name == 'Rabbit' ? Images.rabbit : item.image}
              style={{
                resizeMode: 'contain',
                width: Metrix.HorizontalSize(30),
                height: Metrix.VerticalSize(30),
              }}
            />
          </View>
          <View
            style={{
              marginVertical: Metrix.VerticalSize(10),
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            }}>
            <Text
              style={{
                color: Colors.primary,
                fontWeight: 'bold',
                fontSize: Metrix.customFontSize(20),
              }}>
              {item.name}
            </Text>
          </View>
        </View>
        <View>
          <Entypo name="arrow-long-right" color={Colors.primary} size={25} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <SearchHeader back={true} />
      <View
        style={{
          marginBottom: Metrix.VerticalSize(10),
          marginTop: Metrix.VerticalSize(20),
        }}>
        <Text style={{fontWeight: 'bold', fontSize: Metrix.customFontSize(25)}}>
          All Categories
        </Text>
      </View>
      <FlatList
        data={categoryData}
        showsVerticalScrollIndicator={false}
        // horizontal={true}
        keyExtractor={index => index.toString()}
        renderItem={item => renderItem(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(20),
    flex: 1,
  },
  view: {
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  back: {
    width: '97%',
    marginVertical: Metrix.VerticalSize(10),
    marginHorizontal: Metrix.HorizontalSize(5),
    backgroundColor: Colors.white,
    paddingVertical: 5,
    borderRadius: 20,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default AllCategories;
