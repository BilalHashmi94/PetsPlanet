import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Images, Metrix, NavigationService} from '../config';
import SearchHeader from '../components/SearchHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {SliderBox} from 'react-native-image-slider-box';
import CardComp from '../components/CardComp';
import ProductComp from '../components/ProductComp';
import ShopComp from '../components/ShopComp';
import {useDispatch} from 'react-redux';
import DataBaseMiddleware from '../redux/Middlewares/DataBaseMiddleware';
import {useEffect} from 'react';

const Shop = props => {
  const [width, setWidth] = useState();
  const dispatch = useDispatch();
  const [topSeller, setTopSeller] = useState([]);
  const [topSelling, setTopSellign] = useState([
    {
      id: 2,
      name: 'Cat Food',
      category: 'Cat',
      price: '1000',
      deliveryTime: '2 Days',
      aboutProduct: 'jkbbjaisbcioancuas bsiuas cjsc cnias casnciuascnjas c',
      productImages: [Images.dog, Images.turtle],
      shopName: 'AzherBhai Shop',
      shopId: 1,
      comments: [
        {
          userName: 'John',
          comment: 'Very Nice Product',
        },
      ],
    },
  ]);
  const categoryData = [
    {
      id: 5,
      name: 'Cat',
      image: Images.cat,
      color: 'gold',
    },
    {
      id: 5,
      name: 'Dog',
      image: Images.dog,
      color: 'tomato',
    },
    {
      id: 5,
      name: 'Fish',
      image: Images.turtle,
      color: 'lightblue',
    },
    {
      id: 1,
      name: 'Food',
      image: Images.cat,
      color: 'pink',
    },
    {
      id: 2,
      name: 'Accesories',
      image: Images.dog,
      color: 'lightblue',
    },
    {
      id: 3,
      name: 'Houses',
      image: Images.rabbit,
      color: 'lightgreen',
    },
    {
      id: 4,
      name: 'Cages',
      image: Images.bird,
      color: 'yellow',
    },
    {
      id: 5,
      name: 'Clothings',
      image: Images.turtle,
      color: 'tomato',
    },
    {
      id: 5,
      name: 'Toys',
      image: Images.turtle,
      color: 'tomato',
    },
  ];

  const onLayout = e => {
    setWidth(e.nativeEvent.layout.width);
  };

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
            shadowColor: '#000',
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
    return <ProductComp item={item} />;
  };

  const renderShopComp = ({item}) => {
    return <ShopComp item={item} />;
  };

  useEffect(() => {
    GetTopShops();
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      GetTopShops();
    });
    return unsubscribe;
  }, [props.navigation]);

  const GetTopShops = () => {
    dispatch(
      DataBaseMiddleware.GetTopShops({
        callback: res => {
          if (res) {
            setTopSeller(res);
          }
        },
      }),
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          ...styles.horizontal,
          alignItems: 'center',
          justifyContent: 'center',
          // marginVertical: Metrix.VerticalSize(0),
          // backgroundColor: 'red',
        }}>
        <Image
          source={Images.mall}
          style={{
            resizeMode: 'contain',
            width: Metrix.HorizontalSize(250),
            height: Metrix.VerticalSize(100),
          }}
        />
      </View>
      <View style={styles.horizontal}>
        <SearchHeader containerStyle={{marginTop: 0}} />
      </View>
      <View style={styles.bannerContainer}>
        <View style={styles.bannerView} onLayout={e => onLayout(e)}>
          <SliderBox
            images={[Images.acc1, Images.acc2, Images.acc3, Images.acc4]}
            sliderBoxHeight={150}
            onCurrentImagePressed={index =>
              console.warn(`image ${index} pressed`)
            }
            parentWidth={width}
            dotColor={Colors.green}
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            resizeMode={'stretch'}
          />
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: Metrix.HorizontalSize(20),
          marginBottom: Metrix.VerticalSize(80),
        }}>
        {/* Categories */}

        <View
          style={{
            marginVertical: Metrix.VerticalSize(10),
          }}>
          <View style={{marginBottom: 15, ...styles.topView}}>
            <Text
              style={{fontWeight: 'bold', fontSize: Metrix.customFontSize(18)}}>
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

        {/* Top Selling Products */}

        <View style={{marginVertical: Metrix.VerticalSize(5)}}>
          <View style={{marginBottom: 15, ...styles.topView}}>
            <Text
              style={{fontWeight: 'bold', fontSize: Metrix.customFontSize(18)}}>
              Top Selling Products
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
            data={topSelling}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={index => index.toString()}
            renderItem={item => renderContent(item)}
          />
        </View>

        {/* Top Sellers */}

        <View style={{marginVertical: Metrix.VerticalSize(5)}}>
          <View style={{marginBottom: 15, ...styles.topView}}>
            <Text
              style={{fontWeight: 'bold', fontSize: Metrix.customFontSize(18)}}>
              Top Sellers
            </Text>
            <TouchableOpacity
              onPress={() => NavigationService.navigate('AllShops')}>
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
            data={topSeller}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={index => index.toString()}
            renderItem={item => renderShopComp(item)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  horizontal: {
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
  bannerView: {
    width: '90%',
    height: 150,
  },
  bannerContainer: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Metrix.VerticalSize(10),
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Shop;
