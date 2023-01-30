import {View, Text} from 'react-native';
import React from 'react';
import {CommonStyles, Metrix} from '../config';
import Header from '../components/Header';
import {FlatList} from 'react-native-gesture-handler';
import ProductComp from '../components/ProductComp';

const SearchResults = props => {
  const data = props.route.params.data;
  console.warn('data', data);
  const renderContent = ({item}) => {
    return <ProductComp item={item} />;
  };
  return (
    <View style={{...CommonStyles.container}}>
      <Header />
      <Text
        style={{
          ...CommonStyles.textStyles.heading,
        }}>
        Search Results
      </Text>
      <View style={{alignItems: 'center', marginTop: Metrix.VerticalSize(30)}}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          // horizontal={true}
          numColumns={2}
          keyExtractor={index => index.toString()}
          renderItem={item => renderContent(item)}
        />
      </View>
    </View>
  );
};

export default SearchResults;
