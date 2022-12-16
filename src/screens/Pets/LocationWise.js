import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import SearchHeader from '../../components/SearchHeader';
import {Colors, Metrix} from '../../config';
import CardComp from '../../components/CardComp';
import {useDispatch, useSelector} from 'react-redux';
import DataBaseMiddleware from '../../redux/Middlewares/DataBaseMiddleware';

const LocationWise = props => {
  const [favPets, setFavPets] = useState();
  const dispatch = useDispatch();
  const user = useSelector(state => state.AuthReducer.user);

  const getData = () => {
    dispatch(
      DataBaseMiddleware.GetPetByCity({
        city: user ? user?.city : 'Karachi',
        callback: res => {
          setFavPets(res);
        },
      }),
    );
  };

  useEffect(() => {
    getData();
  }, []);

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
          Location:
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: Metrix.customFontSize(25),
            color: Colors.primary,
            marginLeft: 10,
          }}>
          {user ? user.city : 'Karachi'}
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

export default LocationWise;
