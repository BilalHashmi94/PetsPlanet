import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import SearchHeader from '../../components/SearchHeader';
import {Colors, Metrix} from '../../config';
import CardComp from '../../components/CardComp';
import {useDispatch} from 'react-redux';
import DataBaseMiddleware from '../../redux/Middlewares/DataBaseMiddleware';
import ProductComp from '../../components/ProductComp';

const CategorySearch = props => {
  const data = props.route.params?.data;
  const comingFrom = props.route.params?.comingFrom;
  const [petsData, setPetsData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getPetsData();
  }, []);

  const getPetsData = () => {
    if (comingFrom === 'products') {
      dispatch(
        DataBaseMiddleware.GetProductsByCategory({
          name: data.name,
          callback: res => {
            setPetsData(res);
          },
        }),
      );
    } else {
      dispatch(
        DataBaseMiddleware.GetPetByCategory({
          name: data.name,
          callback: res => {
            setPetsData(res);
          },
        }),
      );
    }
  };

  const renderContent = ({item}) => {
    console.warn(item);
    return (
      <>
        {comingFrom === 'products' ? (
          <ProductComp item={item} />
        ) : (
          <CardComp item={item} />
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <SearchHeader back={true} />
      <View
        style={{
          marginBottom: Metrix.VerticalSize(10),
          marginTop: Metrix.VerticalSize(20),
          flexDirection: 'row',
          //   justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: Metrix.customFontSize(25),
            color: Colors.black,
          }}>
          Category:
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: Metrix.customFontSize(25),
            color: Colors.primary,
            marginLeft: 10,
          }}>
          {data.name}
        </Text>
      </View>
      <View
        style={{
          marginTop: Metrix.VerticalSize(5),
          marginBottom: Metrix.VerticalSize(150),
        }}>
        <FlatList
          data={petsData}
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
              <Text style={{color: Colors.black}}>
                {comingFrom === 'products'
                  ? 'Sorry! No Products Found.'
                  : 'Sorry! No Pets Found.'}
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

export default CategorySearch;
