import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import SearchHeader from '../../components/SearchHeader';
import {Colors, Metrix} from '../../config';
import {useDispatch} from 'react-redux';
import DataBaseMiddleware from '../../redux/Middlewares/DataBaseMiddleware';
import ShopComp from '../../components/ShopComp';

const AllShops = props => {
  const [allShops, setAllShops] = useState();

  const dispatch = useDispatch();

  const getTopPets = () => {
    dispatch(
      DataBaseMiddleware.GetAllShops({
        callback: res => {
          setAllShops(res);
        },
      }),
    );
  };

  useEffect(() => {
    getTopPets();
  }, []);

  const renderContent = ({item}) => {
    return <ShopComp item={item} />;
  };

  return (
    <View style={styles.container}>
      <SearchHeader back={true} />
      <View
        style={{
          marginBottom: Metrix.VerticalSize(10),
          marginTop: Metrix.VerticalSize(20),
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: Metrix.customFontSize(25),
            color: Colors.black,
          }}>
          Our Shops
        </Text>
      </View>
      <View
        style={{
          marginTop: Metrix.VerticalSize(5),
          marginBottom: Metrix.VerticalSize(150),
        }}>
        <FlatList
          data={allShops}
          showsVerticalScrollIndicator={false}
          // numColumns={2}
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
                We dont have any shops right now
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
});

export default AllShops;
