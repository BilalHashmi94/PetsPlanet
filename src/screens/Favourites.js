import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Images, Metrix, NavigationService} from '../config';
import SearchHeader from '../components/SearchHeader';
import {ScrollView} from 'react-native-gesture-handler';
import CardComp from '../components/CardComp';
import {useDispatch, useSelector} from 'react-redux';
import DataBaseMiddleware from '../redux/Middlewares/DataBaseMiddleware';
import Toast from 'react-native-toast-message';
import ProductComp from '../components/ProductComp';

const Favourites = ({navigation}) => {
  const runSearch = text => {
    console.warn('search', text);
  };
  const [favPets, setFavPets] = useState([]);

  const user = useSelector(state => state.AuthReducer.user);
  const loader = useSelector(state => state.LoaderReducer.loading);

  const dispatch = useDispatch();

  const getFav = () => {
    dispatch(
      DataBaseMiddleware.GetFavorites({
        id: user.id,
        callback: res => {
          if (res) {
            // const data = res.filter(val => val.isLiked.includes(user.id));
            setFavPets(res);
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
    getFav();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFavPets([]);
      getFav();
    });
    return unsubscribe;
  }, [navigation]);

  const renderContent = ({item}) => {
    if (item?.product_pictures) {
      return <ProductComp item={item} />;
    } else {
      return <CardComp item={item} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* <SearchHeader getSearch={text => runSearch(text)} /> */}
      <View
        style={{
          marginBottom: Metrix.VerticalSize(10),
          marginTop: Metrix.VerticalSize(40),
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: Metrix.customFontSize(25),
            color: Colors.black,
          }}>
          Your Favourites
        </Text>
      </View>
      <View
        style={{
          marginTop: Metrix.VerticalSize(5),
          marginBottom: Metrix.VerticalSize(230),
        }}>
        <FlatList
          data={favPets}
          showsVerticalScrollIndicator={false}
          numColumns={2}
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
                  You Don't Have Any Favourites
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
});

export default Favourites;
