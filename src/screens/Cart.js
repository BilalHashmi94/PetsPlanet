import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors, Metrix, Images, NavigationService} from '../config';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import DataBaseMiddleware from '../redux/Middlewares/DataBaseMiddleware';
import {Img_url} from '../config/ApiCaller';

const Cart = props => {
  const [favPets, setFavPets] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.AuthReducer.user);

  console.warn(user);

  const GetAds = () => {
    dispatch(
      DataBaseMiddleware.GetSellersAds({
        seller_id: user.id,
        callback: res => {
          console.warn('res', res);
          setFavPets(res);
        },
      }),
    );
  };

  useEffect(() => {
    GetAds();
  }, []);

  const renderContent = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item?.pet_pictures) {
            NavigationService.navigate('SellDetail', {data: item});
          } else {
            NavigationService.navigate('PorductDetail', {data: item});
          }
        }}
        style={{
          marginVertical: Metrix.VerticalSize(10),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.detailComp}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{
                uri: item?.pet_pictures
                  ? Img_url + item?.pet_pictures[0]
                  : Img_url + item?.product_pictures[0],
              }}
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
                {item.name}
              </Text>
              {item.mallItem ? (
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
                      color: Colors.blue,
                    }}>
                    {item.deliveryTime}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: Metrix.customFontSize(16),
                    color: Colors.darkGray,
                  }}>
                  {item.category}
                </Text>
              )}
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
          flex: 1,
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

export default Cart;
