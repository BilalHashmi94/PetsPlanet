import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Metrix} from '../../config';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import DataBaseMiddleware from '../../redux/Middlewares/DataBaseMiddleware';
import Toast from 'react-native-toast-message';
import CustomModal from '../../components/CustomModal';
import PickerButton from '../../components/PickerButton';
import TextInputComp from '../../components/TextInputComp';
import GetLocation from 'react-native-get-location';

const SellPet = props => {
  const dispatch = useDispatch();
  const [categoryData, setCategoryData] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [petName, setPetName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isTopEnabled, setIsTopEnabled] = useState(false);
  const [isTopTenEnabled, setIsTopTenEnabled] = useState(false);
  const [lat, setLat] = useState();
  const [long, setLong] = useState()
  const toggleSwitch = () => setIsTopEnabled(previousState => !previousState);
  const toggleTenSwitch = () =>
    setIsTopTenEnabled(previousState => !previousState);

  const user = useSelector(state => state.AuthReducer.user);

  console.warn('user', user);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
        setLat(location.latitude);
        setLong(location.longitude);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  const getAllCategories = () => {
    dispatch(
      DataBaseMiddleware.GetCategories({
        callback: res => {
          if (res.status == 200) {
            setCategoryData(res.data);
          } else {
            Toast.show({
              type: 'success',
              text1: 'Alert',
              text2: 'Something went wrong',
              position: 'bottom',
            });
          }
        },
      }),
    );
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text
        style={{
          color: Colors.black,
          fontWeight: 'bold',
          fontSize: Metrix.customFontSize(20),
        }}>
        Sell Your Pet
      </Text>
      <View style={styles.view}>
        <View style={{height: 50}}>
          <PickerButton
            onPress={() => setModal(true)}
            value={
              selectedCategory == '' ? 'Select Category' : selectedCategory
            }
            placeholder="Select Category"
          />
        </View>
        <View style={{marginVertical: Metrix.VerticalSize(0)}}>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(20),
            }}>
            <Text style={styles.textInputText}>Pet Name</Text>
            <TextInputComp
              value={petName}
              onChange={text => setPetName(text)}
              placeholder={'Enter Here'}
              type={'email-address'}
            />
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(20),
            }}>
            <Text style={styles.textInputText}>Breed</Text>
            <TextInputComp
              value={breed}
              onChange={text => setBreed(text)}
              placeholder={'Enter Here'}
              type={'email-address'}
            />
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(20),
            }}>
            <Text style={styles.textInputText}>Pet Age</Text>
            <TextInputComp
              value={age}
              onChange={text => setAge(text)}
              placeholder={'Enter Here'}
              type={'email-address'}
            />
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(20),
            }}>
            <Text style={styles.textInputText}>Pet Weight</Text>
            <TextInputComp
              value={weight}
              onChange={text => setWeight(text)}
              placeholder={'Enter Here'}
              type={'email-address'}
            />
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(20),
            }}>
            <Text style={styles.textInputText}>Price</Text>
            <TextInputComp
              value={price}
              onChange={text => setPrice(text)}
              placeholder={'Enter Here'}
              type={'number-pad'}
            />
          </View>
          <View
            style={{
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(20),
            }}>
            <Text style={styles.textInputText}>Description</Text>
            <TextInputComp
              value={description}
              onChange={text => setDescription(text)}
              placeholder={'Enter Here'}
              type={'email-address'}
            />
          </View>
        </View>

        <View style={{marginVertical: Metrix.VerticalSize(10)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: Metrix.VerticalSize(10),
            }}>
            <Text>Add you ad in Top Pets</Text>
            <Switch
              trackColor={{false: '#767577', true: Colors.logoGreen}}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isTopEnabled}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: Metrix.VerticalSize(10),
            }}>
            <Text>Add you ad in Top 10 Pets</Text>
            <Switch
              trackColor={{false: '#767577', true: Colors.logoGreen}}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTenSwitch}
              value={isTopTenEnabled}
            />
          </View>
          <View
            style={{
              marginVertical: Metrix.VerticalSize(15),
              width: '100%',
            }}>
            <TouchableOpacity
              //   onPress={() => NavigationService.navigate('SignIn')}
              style={{
                backgroundColor: Colors.backgroundBlue,
                ...styles.detailComp,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Colors.white,
                  fontWeight: 'bold',
                  fontSize: Metrix.customFontSize(20),
                }}>
                Pet Mall
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomModal
          data={categoryData}
          onCancel={() => setModal(false)}
          show={modal}
          onSelect={item => {
            setModal(false);
            setSelectedCategory(item.name);
          }}
          type="object"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(35),
  },
  view: {
    marginTop: Metrix.VerticalSize(20),
  },
  textInputText: {
    color: Colors.black,
    fontSize: Metrix.customFontSize(14),
    // fontFamily: 'Poppins-Regular',
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
    // marginVertical: 35,
    // alignItems: 'center',
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
});

export default SellPet;
