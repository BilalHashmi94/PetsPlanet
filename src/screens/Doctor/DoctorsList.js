import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import SearchHeader from '../../components/SearchHeader';
import {Colors, Metrix, Images, NavigationService} from '../../config';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DoctorsList = props => {
  const favPets = [
    {
      id: 1,
      firstName: 'Hamid',
      lastName: 'Dildar',
      clinicImage: 'https://picsum.photos/200/300',
      town: 'North Nazimabad',
      phoneNumber: '03311111111',
      lng: '1234',
      lat: '1234',
      about:
        'Hello I am Dr Dolittle And I am a Stupid Doctor. Killing Pets For Years',
      clinicName: 'Pets Clinic',
      openAt: '09:00AM',
      closeAt: '09:00PM',
    },
    {
      id: 2,
      firstName: 'Noor',
      lastName: 'Ahmed',
      clinicImage: 'https://picsum.photos/200/300',
      town: 'Gulshan e Iqbal',
      phoneNumber: '0123456789',
      lng: '1234',
      lat: '1234',
      about:
        'Hello I am Dr Dolittle And I am a Stupid Doctor. Killing Pets For Years',
      clinicName: 'Pets Clinic',
      openAt: '09:00AM',
      closeAt: '09:00PM',
    },
    {
      id: 3,
      firstName: 'Leo',
      lastName: 'Fernandiz',
      clinicImage: 'https://picsum.photos/200/300',
      town: 'Malir',
      phoneNumber: '01273652737',
      lng: '1234',
      lat: '1234',
      about:
        'Hello I am Dr Dolittle And I am a Stupid Doctor. Killing Pets For Years',
      clinicName: 'Pets Clinic',
      openAt: '09:00AM',
      closeAt: '09:00PM',
    },
    {
      id: 1,
      firstName: 'Rocky',
      lastName: 'Balboa',
      clinicImage: 'https://picsum.photos/200/300',
      town: 'Gulistan e Johar',
      phoneNumber: '03311111111',
      lng: '1234',
      lat: '1234',
      about:
        'Hello I am Dr Dolittle And I am a Stupid Doctor. Killing Pets For Years',
      clinicName: 'Pets Clinic',
      openAt: '09:00AM',
      closeAt: '09:00PM',
    },
    {
      id: 2,
      firstName: 'Bella',
      lastName: 'Martini',
      clinicImage: 'https://picsum.photos/200/300',
      town: 'DHA',
      phoneNumber: '0123456789',
      lng: '1234',
      lat: '1234',
      about:
        'Hello I am Dr Dolittle And I am a Stupid Doctor. Killing Pets For Years',
      clinicName: 'Pets Clinic',
      openAt: '09:00AM',
      closeAt: '09:00PM',
    },
    {
      id: 3,
      firstName: 'Donald',
      lastName: 'Duck',
      clinicImage: 'https://picsum.photos/200/300',
      town: 'Sharah e Faisal',
      phoneNumber: '01273652737',
      lng: '1234',
      lat: '1234',
      about:
        'Hello I am Dr Dolittle And I am a Stupid Doctor. Killing Pets For Years',
      clinicName: 'Pets Clinic',
      openAt: '09:00AM',
      closeAt: '09:00PM',
    },
    {
      id: 1,
      firstName: 'Shaun',
      lastName: 'Dead',
      clinicImage: 'https://picsum.photos/200/300',
      town: 'Saddar',
      phoneNumber: '03311111111',
      lng: '1234',
      lat: '1234',
      about:
        'Hello I am Dr Dolittle And I am a Stupid Doctor. Killing Pets For Years',
      clinicName: 'Pets Clinic',
      openAt: '09:00AM',
      closeAt: '09:00PM',
    },
    {
      id: 2,
      firstName: 'Alan',
      lastName: 'Musk',
      clinicImage: 'https://picsum.photos/200/300',
      town: 'Highway',
      phoneNumber: '0123456789',
      lng: '1234',
      lat: '1234',
      about:
        'Hello I am Dr Dolittle And I am a Stupid Doctor. Killing Pets For Years',
      clinicName: 'Pets Clinic',
      openAt: '09:00AM',
      closeAt: '09:00PM',
    },
    {
      id: 3,
      firstName: 'Green',
      lastName: 'Mile',
      clinicImage: 'https://picsum.photos/200/300',
      town: 'Nazimabad',
      phoneNumber: '01273652737',
      lng: '1234',
      lat: '1234',
      about:
        'Hello I am Dr Dolittle And I am a Stupid Doctor. Killing Pets For Years',
      clinicName: 'Pets Clinic',
      openAt: '09:00AM',
      closeAt: '09:00PM',
    },
  ];

  const renderContent = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => NavigationService.navigate('DoctorDetail', {data: item})}
        style={{
          marginVertical: Metrix.VerticalSize(10),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.detailComp}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={Images.avatar}
              style={{
                borderRadius: 10,
                height: Metrix.VerticalSize(60),
                width: Metrix.HorizontalSize(60),
              }}
            />
            <View style={{marginLeft: 10, justifyContent: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: Metrix.customFontSize(16),
                  color: Colors.black
                }}>
                Dr {item.firstName} {item.lastName}
              </Text>
              <View style={{flexDirection: 'row', marginVertical: 3}}>
                <Entypo name={'back-in-time'} color={Colors.red} size={15} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: Metrix.customFontSize(14),
                    marginLeft: 5,
                    color: Colors.black
                  }}>
                  11:00AM - 09:00PM
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Entypo name={'town-pin'} color={Colors.green} size={15} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: Metrix.customFontSize(14),
                    color: Colors.placeholderGray,
                    marginLeft: 5,
                  }}>
                  {item.town}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
          Your Location:
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: Metrix.customFontSize(25),
            color: Colors.primary,
            marginLeft: 10,
          }}>
          Gulshan
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
          //   numColumns={2}
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
                Sorry! No Doctors Found In Your Area. Press to See The List Of
                All Doctors
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
  detailComp: {
    backgroundColor: Colors.white,
    width: '99%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    paddingHorizontal: Metrix.HorizontalSize(10),
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

export default DoctorsList;
