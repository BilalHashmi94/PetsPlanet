import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Colors,
  Metrix,
  Images,
  NavigationService,
  CommonStyles,
} from '../config';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import DataBaseMiddleware from '../redux/Middlewares/DataBaseMiddleware';
import {Img_url} from '../config/ApiCaller';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const QuantityComp = ({quantity}) => {
  const [cartCount, setCartCount] = useState(quantity);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '30%',
        alignItems: 'center',
        paddingHorizontal: Metrix.HorizontalSize(10),
      }}>
      <TouchableOpacity
        onPress={() => {
          if (cartCount === 0) {
            return;
          } else {
            setCartCount(cartCount - 1);
          }
        }}>
        <FontAwesome name="minus" size={15} color={Colors.primary} />
      </TouchableOpacity>
      <Text style={{...CommonStyles.textStyles.intro, color: Colors.primary}}>
        {cartCount}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setCartCount(cartCount + 1);
        }}>
        <FontAwesome name="plus" size={15} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const Cart = props => {
  const [favPets, setFavPets] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state => state.AuthReducer.user);
  const cartData = useSelector(state => state.AuthReducer.cartData);
  const [cartCount, setCartCount] = useState();

  // const GetAds = () => {
  //   dispatch(
  //     DataBaseMiddleware.GetSellersAds({
  //       seller_id: user.id,
  //       callback: res => {
  //         console.warn('res', res);
  //         setFavPets(res);
  //       },
  //     }),
  //   );
  // };

  // useEffect(() => {
  //   GetAds();
  // }, []);

  const renderContent = ({item}) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 80,
          marginVertical: 10
        }}>
        <View style={styles.detailComp}>
          <TouchableOpacity
            onPress={() => {
              if (item?.data?.pet_pictures) {
                NavigationService.navigate('SellDetail', {data: item.data});
              } else {
                NavigationService.navigate('PorductDetail', {data: item.data});
              }
            }}
            style={{flexDirection: 'row', width: '50%'}}>
            <Image
              source={{
                uri: item?.data?.pet_pictures
                  ? Img_url + item?.data?.pet_pictures[0]
                  : Img_url + item?.data?.product_pictures[0],
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
                {item.data.name}
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: Metrix.customFontSize(16),
                  color: Colors.darkGray,
                }}>
                {item.data.category}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {/* <Entypo name={'location-pin'} color={Colors.green} size={15} /> */}
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: Metrix.customFontSize(14),
                    color: Colors.blue,
                    // marginLeft: 5,
                  }}>
                  Rs. {item.data.price}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              height: '100%',
              alignItems: 'center',
            }}>
            <QuantityComp quantity={item.quantity} />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '20%',
                height: '100%',
              }}>
              <TouchableOpacity>
                <FontAwesome name="trash-o" size={25} color={Colors.red} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Cart'} />
      <FlatList
        style={{flex: 1}}
        data={cartData}
        showsVerticalScrollIndicator={false}
        keyExtractor={index => index.toString()}
        renderItem={(item, index) => renderContent(item, index)}
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
    // marginVertical: 5,
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
