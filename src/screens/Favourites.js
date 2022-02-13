import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import {Colors, Images, Metrix, NavigationService} from '../config';
import SearchHeader from '../components/SearchHeader';
import {ScrollView} from 'react-native-gesture-handler';
import CardComp from '../components/CardComp';

const Favourites = () => {
  const runSearch = text => {
    console.warn('search', text);
  };

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
      <SearchHeader getSearch={text => runSearch(text)} />
      <View
        style={{
          marginBottom: Metrix.VerticalSize(10),
          marginTop: Metrix.VerticalSize(20),
        }}>
        <Text style={{fontWeight: 'bold', fontSize: Metrix.customFontSize(25)}}>
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
              <Text style={{color: Colors.black}}>
                You Don't Have Any Favourites
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

export default Favourites;
