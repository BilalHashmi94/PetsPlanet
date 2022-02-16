import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors, Metrix, Images, NavigationService} from '../../config';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../components/Header';

const SellersList = props => {
  const favPets = [
    {
      id: 1,
      productName: 'Cat Food',
      sellerName: 'Ibrahim',
      image: 'https://picsum.photos/200/300',
      location: 'North Nazimabad',
      number: '03311111111',
      price: '455',
      deliveryTime: '1 Day',
      category: 'Food',
      about: 'This is a grate Food',
    },
    {
      id: 2,
      productName: 'Dog Food',
      image: 'https://picsum.photos/200/300',
      location: 'North Nazimabad',
      about: 'This is a grate Food',
      number: '03311111111',
      price: '455',
      deliveryTime: '1 Day',
      category: 'Food',
      about: 'This is a grate Food',
    },
    {
      id: 3,
      productName: 'Turtle Food',
      image: 'https://picsum.photos/200/300',
      location: 'North Nazimabad',
      about: 'This is a grate Food',
      number: '03311111111',
      price: '455',
      deliveryTime: '1 Day',
      category: 'Food',
      about: 'This is a grate Food',
    },
    {
      id: 1,
      productName: 'Cat Food',
      image: 'https://picsum.photos/200/300',
      location: 'North Nazimabad',
      about: 'This is a grate Food',
      number: '03311111111',
      price: '455',
      deliveryTime: '1 Day',
      category: 'Food',
      about: 'This is a grate Food',
    },
    {
      id: 2,
      productName: 'Dog Food',
      image: 'https://picsum.photos/200/300',
      location: 'North Nazimabad',
      about: 'This is a grate Food',
      number: '03311111111',
      price: '455',
      deliveryTime: '1 Day',
      category: 'Food',
      about: 'This is a grate Food',
    },
    {
      id: 3,
      productName: 'Turtle Food',
      image: 'https://picsum.photos/200/300',
      location: 'North Nazimabad',
      about: 'This is a grate Food',
      number: '03311111111',
      price: '455',
      deliveryTime: '1 Day',
      category: 'Food',
      about: 'This is a grate Food',
    },
    {
      id: 1,
      productName: 'Cat Food',
      image: 'https://picsum.photos/200/300',
      location: 'North Nazimabad',
      about: 'This is a grate Food',
      number: '03311111111',
      price: '455',
      deliveryTime: '1 Day',
      category: 'Food',
      about: 'This is a grate Food',
    },
    {
      id: 2,
      productName: 'Dog Food',
      image: 'https://picsum.photos/200/300',
      location: 'North Nazimabad',
      about: 'This is a grate Food',
      number: '03311111111',
      price: '455',
      deliveryTime: '1 Day',
      category: 'Food',
      about: 'This is a grate Food',
    },
    {
      id: 3,
      productName: 'Turtle Food',
      image: 'https://picsum.photos/200/300',
      location: 'North Nazimabad',
      about: 'This is a grate Food',
      number: '03311111111',
      price: '455',
      deliveryTime: '1 Day',
      category: 'Food',
      about: 'This is a grate Food',
    },
  ];

  const renderContent = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => NavigationService.navigate('SellDetail', {data: item})}
        style={{
          marginVertical: Metrix.VerticalSize(10),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.detailComp}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: item.image}}
              style={{
                borderRadius: 10,
                height: Metrix.VerticalSize(60),
                width: Metrix.HorizontalSize(60),
              }}
            />
            <View style={{marginLeft: 10, justifyContent: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: Metrix.customFontSize(16),
                }}>
                {item.productName}
              </Text>
              <View style={{flexDirection: 'row', marginVertical: 3}}>
                <Entypo name={'back-in-time'} color={Colors.red} size={15} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: Metrix.customFontSize(14),
                    marginLeft: 5,
                  }}>
                  Delivery Time:
                </Text>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: Metrix.customFontSize(14),
                    marginLeft: 5,
                    color: Colors.blue
                  }}>
                  {item.deliveryTime}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                {/* <Entypo name={'location-pin'} color={Colors.green} size={15} /> */}
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: Metrix.customFontSize(14),
                    color: Colors.blue,
                    marginLeft: 5,
                  }}>
                  Rs. {item.price}
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
      <Header />
      <View
        style={{
          marginBottom: Metrix.VerticalSize(10),
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: Metrix.customFontSize(25),
            color: Colors.black,
          }}>
          My List
        </Text>
      </View>
      <View
        style={{
          marginTop: Metrix.VerticalSize(5),
        }}>
        <FlatList
          data={favPets}
          showsVerticalScrollIndicator={false}
          keyExtractor={index => index.toString()}
          renderItem={item => renderContent(item)}
          ListEmptyComponent={() => (
            <View
              style={{
                marginVertical: Metrix.VerticalSize(10),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: Colors.black}}>
                You Don't Have Any Products To Sell.
              </Text>
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

export default SellersList;
