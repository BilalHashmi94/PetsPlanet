import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Colors,
  CommonStyles,
  Images,
  Metrix,
  NavigationService,
} from '../config';
import SearchHeader from '../components/SearchHeader';
import {ScrollView} from 'react-native-gesture-handler';
import CardComp from '../components/CardComp';
import {useDispatch, useSelector} from 'react-redux';
import DataBaseMiddleware from '../redux/Middlewares/DataBaseMiddleware';
import Toast from 'react-native-toast-message';
import ProductComp from '../components/ProductComp';
import Button from '../components/Button';

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

  // useEffect(() => {
  //   if (user) {
  //     getFav();
  //   }
  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFavPets([]);
      if (user) {
        getFav();
      }
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
      {user ? (
        <>
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
              marginBottom: Metrix.VerticalSize(160),
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
        </>
      ) : (
        <View style={{marginTop: 180}}>
          <Text style={CommonStyles.textStyles.heading}>Login</Text>
          <Text
            style={{
              ...CommonStyles.textStyles.intro,
              color: Colors.placeholderGray,
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            Login to add you favourites and have access to many other features
          </Text>
          <Button
            title={'Login'}
            propStyle={{marginTop: 30}}
            onPress={() => NavigationService.resetStack('SignIn')}
          />
        </View>
      )}
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
