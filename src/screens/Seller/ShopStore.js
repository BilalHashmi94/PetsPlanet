import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {Colors, Images, Metrix, NavigationService} from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import ProductComp from '../../components/ProductComp';
import { Img_url } from '../../config/ApiCaller';

const ShopStore = props => {
  const data = props.route.params.data;
  const [width, setWidth] = useState();
  const [numProducts, setNumProducts] = useState('100');
  const [followers, setFollowers] = useState('100');
  const [likes, setLikes] = useState(data.likes);
  const [like, setLike] = useState(false);
  const [products, setProducts] = useState([
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

  const onLayout = e => {
    setWidth(e.nativeEvent.layout.width);
  };

  const renderContent = ({item}) => {
    return <ProductComp item={item} />;
  };

  const LikeStore = () => {
    setLike(!like);
    if (like === false) {
      let numLike = parseInt(likes);
      let total = numLike + 1;
      console.warn(total);
      setLikes(total);
    } else if (like === true) {
      let numLike = parseInt(likes);
      let total = numLike - 1;
      console.warn(total);
      setLikes(total);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageView} onLayout={e => onLayout(e)}>
        <TouchableOpacity
          onPress={() => NavigationService.goBack()}
          style={styles.backButton}>
          <Ionicons
            name={'md-chevron-back-outline'}
            color={Colors.black}
            size={Metrix.customFontSize(25)}
          />
        </TouchableOpacity>
        <Image source={{uri: Img_url + data.bannerImage}} style={styles.imageStyle} />
      </View>
      <View
        style={{
          paddingHorizontal: Metrix.HorizontalSize(20),
          marginVertical: Metrix.VerticalSize(20),
        }}>
        <View
          style={{
            marginVertical: Metrix.VerticalSize(5),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.textStyle}>{data.shopName}</Text>
          <TouchableOpacity onPress={() => LikeStore()}>
            <AntDesign
              name={like ? 'like1' : 'like2'}
              size={Metrix.customFontSize(25)}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginVertical: Metrix.VerticalSize(40),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>{data.numberOfProducts}</Text>
            <Text>Products</Text>
          </View>
          <View
            style={{
              marginHorizontal: Metrix.HorizontalSize(50),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <Text>100</Text>
            <Text>Followers</Text> */}
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>{likes}</Text>
            <Text>Likes</Text>
          </View>
        </View>

        <View>
          <View style={{marginBottom: Metrix.VerticalSize(20)}}>
            <Text style={styles.textStyle}>Products</Text>
          </View>
          <FlatList
            data={products}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            scrollEnabled={false}
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
                  You Don't Have Any Favourites
                </Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: Metrix.HorizontalSize(20)
    backgroundColor: Colors.white,
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
  editButton: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    width: Metrix.HorizontalSize(35),
    height: Metrix.VerticalSize(35),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 999,
    top: 50,
    right: 0,
    marginHorizontal: 30,
  },
  imageView: {
    width: '100%',
    // borderBottomRightRadius: 35,
    // borderBottomLeftRadius: 35,
  },
  imageStyle: {
    width: '100%',
    height: Metrix.VerticalSize(200),
    // borderBottomRightRadius: 35,
    // borderBottomLeftRadius: 35,
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
    fontSize: Metrix.customFontSize(20),
  },
});

export default ShopStore;
