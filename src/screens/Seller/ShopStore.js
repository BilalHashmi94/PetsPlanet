import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  Colors,
  CommonStyles,
  Images,
  Metrix,
  NavigationService,
} from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import ProductComp from '../../components/ProductComp';
import {Img_url} from '../../config/ApiCaller';
import DataBaseMiddleware from '../../redux/Middlewares/DataBaseMiddleware';
import {useDispatch, useSelector} from 'react-redux';
import ProgressCircle from 'react-native-progress-circle';

const ShopStore = props => {
  const [data, setData] = useState(props.route.params.data);
  const user = useSelector(state => state.AuthReducer.user);
  const [width, setWidth] = useState();
  const [numProducts, setNumProducts] = useState('100');
  const [followers, setFollowers] = useState('100');
  const [likes, setLikes] = useState(data?.likes?.length);
  const [like, setLike] = useState(
    user ? (data?.likes?.includes(user?.id) ? true : false) : false,
  );
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  let percentage = 0;
  let likesPercent = 0;

  const onLayout = e => {
    setWidth(e.nativeEvent.layout.width);
  };

  const renderContent = ({item}) => {
    return <ProductComp item={item} />;
  };
  console.log('data', data);

  percentage = (data.numberOfProducts / 100) * 100;
  likesPercent = (likes / 100) * 100;
  useEffect(() => {
    GetProducts();
  }, []);

  const GetProducts = () => {
    dispatch(
      DataBaseMiddleware.GetProductOfShop({
        name: data.id,
        callback: res => {
          setProducts(res);
        },
      }),
    );
  };
  const likeShop = () => {
    setLike(!like);
    dispatch(
      DataBaseMiddleware.likeShop({
        shopId: data?.id,
        userId: user?.id,
        callback: res => {
          // setData(res);
          if (like === false) {
            setLikes(likes + 1);
          } else {
            setLikes(likes - 1);
          }
        },
      }),
    );
  };
  // console.warn(user);

  const LikeStore = () => {
    setLike(!like);
    // if (like === false) {
    //   let numLike = parseInt(likes);
    //   let total = numLike + 1;
    //   console.warn(total);
    //   setLikes(total);
    // } else if (like === true) {
    //   let numLike = parseInt(likes);
    //   let total = numLike - 1;
    //   console.warn(total);
    //   setLikes(total);
    // }
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
        <Image
          source={{uri: Img_url + data.bannerImage}}
          style={styles.imageStyle}
        />
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
          {user ? (
            <TouchableOpacity
              onPress={() => likeShop()}
              style={{alignItems: 'center'}}>
              <AntDesign
                name={like ? 'like1' : 'like2'}
                size={Metrix.customFontSize(25)}
              />
              <Text style={{textAlign: 'center'}}>
                {likes} {likes === 1 ? 'like' : 'likes'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{...CommonStyles.textStyles.semiHeading}}>About</Text>
          <Text style={{...CommonStyles.textStyles.intro}}>
            We deeply value our product and greatly appreciate your feedback. We
            approach the app's development and enhancement as if it were our own
            product, and we remain committed to continuous improvement in the
            future.
          </Text>
        </View>
        {/* <View
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
            <ProgressCircle
              percent={percentage}
              radius={40}
              borderWidth={8}
              color={Colors.green}
              shadowColor="#999"
              bgColor="#fff">
              <Text style={{fontSize: 18}}>{percentage + '%'}</Text>
            </ProgressCircle>
            <Text
              style={{
                ...CommonStyles.textStyles.semiHeading,
                marginTop: Metrix.VerticalSize(10),
              }}>
              Products
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: Metrix.HorizontalSize(50),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ProgressCircle
              percent={likesPercent}
              radius={40}
              borderWidth={8}
              color={Colors.green}
              shadowColor="#999"
              bgColor="#fff">
              <Text style={{fontSize: 18}}>{likesPercent + '%'}</Text>
            </ProgressCircle>

            <Text
              style={{
                ...CommonStyles.textStyles.semiHeading,
                marginTop: Metrix.VerticalSize(10),
              }}>
              Likes
            </Text>
          </View>
        </View> */}

        <View>
          <View style={{marginBottom: Metrix.VerticalSize(20)}}>
            <Text style={{...CommonStyles.textStyles.semiHeading}}>Products</Text>
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

export default ShopStore;
