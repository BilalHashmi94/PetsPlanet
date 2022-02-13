import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import SearchHeader from '../../components/SearchHeader';
import {Colors, Metrix} from '../../config';
import CardComp from '../../components/CardComp';

const CategorySearch = props => {
  const data = props.route.params?.data;

  const favPets = [
    {
      id: 1,
      name: 'Rocky',
      image: 'https://picsum.photos/200/300',
      breed: 'Poodle',
      price: '450',
      age: '4 months',
      weight: '2.8kg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
    {
      id: 2,
      name: 'Bella',
      image: 'https://picsum.photos/200/300',
      breed: 'Golden Retriver',
      price: '450',
      age: '4 months',
      weight: '2.8kg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
    {
      id: 3,
      name: 'Leo',
      image: 'https://picsum.photos/200/300',
      breed: 'Cocktail',
      price: '450',
      age: '4 months',
      weight: '2.8kg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
    {
      id: 1,
      name: 'Rocky',
      image: 'https://picsum.photos/200/300',
      breed: 'Poodle',
      price: '450',
      age: '4 months',
      weight: '2.8kg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
    {
      id: 2,
      name: 'Bella',
      image: 'https://picsum.photos/200/300',
      breed: 'Golden Retriver',
      price: '450',
      age: '4 months',
      weight: '2.8kg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
    {
      id: 3,
      name: 'Leo',
      image: 'https://picsum.photos/200/300',
      breed: 'Cocktail',
      price: '450',
      age: '4 months',
      weight: '2.8kg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
    {
      id: 1,
      name: 'Rocky',
      image: 'https://picsum.photos/200/300',
      breed: 'Poodle',
      price: '450',
      age: '4 months',
      weight: '2.8kg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
    {
      id: 2,
      name: 'Bella',
      image: 'https://picsum.photos/200/300',
      breed: 'Golden Retriver',
      price: '450',
      age: '4 months',
      weight: '2.8kg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
    {
      id: 3,
      name: 'Leo',
      image: 'https://picsum.photos/200/300',
      breed: 'Cocktail',
      price: '450',
      age: '4 months',
      weight: '2.8kg',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
  ];

  const renderContent = ({item}) => {
    return <CardComp item={item} />;
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
              <Text style={{color: Colors.black}}>Sorry! No Pets Found.</Text>
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
