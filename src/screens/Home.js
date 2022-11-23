import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Colors, Images, Metrix, NavigationService} from '../config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OwnerCard from '../components/OwnerCard';
import CardComp from '../components/CardComp';
import {ScrollView} from 'react-native-gesture-handler';
import DoctorCard from '../components/DoctorCard';
import DataBaseMiddleware from '../redux/Middlewares/DataBaseMiddleware';
import {useDispatch, useSelector} from 'react-redux';

const Home = ({navigation}) => {
  const categoryData = [
    {
      id: 1,
      name: 'Cat',
      image: Images.cat,
      color: 'pink',
    },
    {
      id: 2,
      name: 'Dog',
      image: Images.dog,
      color: 'lightblue',
    },
    {
      id: 3,
      name: 'Rabbit',
      image: Images.rabbit,
      color: 'lightgreen',
    },
    {
      id: 4,
      name: 'Bird',
      image: Images.bird,
      color: 'yellow',
    },
    {
      id: 5,
      name: 'Turtle',
      image: Images.turtle,
      color: 'tomato',
    },
  ];
  const [favPets, setFavPets] = useState();
  const dispatch = useDispatch();

  const getTopPets = () => {
    dispatch(
      DataBaseMiddleware.GetAllTopPets({
        callback: res => {
          let arr = [];
          arr.push(...res);
          const data = arr.filter(val => val.topTen == true);
          console.warn(data);
          setFavPets(data);
        },
      }),
    );
  };
  const cartData = useSelector(state => state.AuthReducer.cartData);

  // console.warn('cart', cartData?.length);

  useEffect(() => {
    getTopPets();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTopPets();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          NavigationService.navigate('CategorySearch', {data: item})
        }
        style={{marginHorizontal: 10}}>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: item.color,
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
          }}>
          <Image
            source={item.image}
            style={{
              resizeMode: 'contain',
              width: Metrix.HorizontalSize(50),
              height: Metrix.VerticalSize(50),
            }}
          />
        </View>
        <View
          style={{
            marginVertical: Metrix.VerticalSize(10),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: Colors.primary, fontWeight: 'bold'}}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = ({item}) => {
    return <CardComp item={item} />;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{marginVertical: Metrix.VerticalSize(0), ...styles.topView}}>
        <View>
          <Image
            source={Images.logo}
            style={{
              resizeMode: 'contain',
              width: Metrix.HorizontalSize(100),
              height: Metrix.VerticalSize(80),
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: Metrix.VerticalSize(20),
          }}>
          {/* <TouchableOpacity>
            <Feather
              name="search"
              color={Colors.logoDarkGreen}
              size={Metrix.customFontSize(28)}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{marginLeft: 20, paddingTop: 5, paddingRight: 5}}
            onPress={() => NavigationService.navigate('ChatList')}>
            <AntDesign
              name="shoppingcart"
              color={Colors.logoDarkGreen}
              size={Metrix.customFontSize(38)}
            />
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: Colors.red,
                borderRadius: 20 / 2,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: 0,
                top: 0,
              }}>
              <Text style={{color: Colors.white}}>
                {cartData?.length > 0 ? `${cartData?.length}` : '0'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <OwnerCard />
      <View style={{marginVertical: Metrix.VerticalSize(10)}}>
        <View style={{marginBottom: 15, ...styles.topView}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: Metrix.customFontSize(18),
              color: Colors.black,
            }}>
            Categories
          </Text>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('AllCategories')}>
            <Text
              style={{
                color: Colors.primary,
                textDecorationLine: 'underline',
                marginTop: 5,
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={categoryData}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={index => index.toString()}
          renderItem={item => renderItem(item)}
        />
      </View>
      <View style={{marginVertical: Metrix.VerticalSize(5)}}>
        <View style={{marginBottom: 15, ...styles.topView}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: Metrix.customFontSize(18),
              color: Colors.black,
            }}>
            Everyone is talking about
          </Text>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('TopPets')}>
            <Text
              style={{
                color: Colors.primary,
                textDecorationLine: 'underline',
                marginTop: 5,
              }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={favPets}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={index => index.toString()}
          renderItem={item => renderContent(item)}
        />
      </View>
      <View style={{marginBottom: Metrix.VerticalSize(90)}}>
        <DoctorCard />
      </View>
    </ScrollView>
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

export default Home;
