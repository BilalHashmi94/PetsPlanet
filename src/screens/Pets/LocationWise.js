import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import SearchHeader from '../../components/SearchHeader';
import {Colors, Metrix} from '../../config';
import CardComp from '../../components/CardComp';
import {useDispatch, useSelector} from 'react-redux';
import DataBaseMiddleware from '../../redux/Middlewares/DataBaseMiddleware';
import CustomModal from '../../components/CustomModal';

const LocationWise = props => {
  const [favPets, setFavPets] = useState();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
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
  const getCityData = (item) => {
    dispatch(
      DataBaseMiddleware.GetPetByCity({
        city: item,
        callback: res => {
          setFavPets([])
          setFavPets([...res]);
        },
      }),
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const cityData = [
    'Karachi',
    'Lahore',
    'Faisalabad',
    'Rawalpindi',
    'Gujranwala',
    'Peshawar',
    'Multan',
    'Saidu Sharif',
    'Hyderabad City',
    'Islamabad',
    'Quetta',
    'Bahawalpur',
    'Sargodha',
    'Sialkot City',
    'Sukkur',
    'Larkana',
    'Chiniot',
    'Shekhupura',
    'Jhang City',
    'Dera Ghazi Khan',
    'Gujrat',
    'Rahimyar Khan',
    'Kasur',
    'Mardan',
    'Mingaora',
    'Nawabshah',
    'Sahiwal',
    'Mirpur Khas',
    'Okara',
    'Mandi Burewala',
    'Jacobabad',
    'Saddiqabad',
    'Kohat',
    'Muridke',
    'Muzaffargarh',
    'Khanpur',
    'Gojra',
    'Mandi Bahauddin',
    'Abbottabad',
    'Turbat',
    'Dadu',
    'Bahawalnagar',
    'Khuzdar',
    'Pakpattan',
    'Tando Allahyar',
    'Ahmadpur East',
    'Vihari',
    'Jaranwala',
    'New Mirpur',
    'Kamalia',
    'Kot Addu',
    'Nowshera',
    'Swabi',
    'Khushab',
    'Dera Ismail Khan',
    'Chaman',
    'Charsadda',
    'Kandhkot',
    'Chishtian',
    'Hasilpur',
    'Attock Khurd',
    'Muzaffarabad',
    'Mianwali',
    'Jalalpur Jattan',
    'Bhakkar',
    'Zhob',
    'Dipalpur',
    'Kharian',
    'Mian Channun',
    'Bhalwal',
    'Jamshoro',
    'Pattoki',
    'Harunabad',
    'Kahror Pakka',
    'Toba Tek Singh',
    'Samundri',
    'Shakargarh',
    'Sambrial',
    'Shujaabad',
    'Hujra Shah Muqim',
    'Kabirwala',
    'Mansehra',
    'Lala Musa',
    'Chunian',
    'Nankana Sahib',
    'Bannu',
    'Pasrur',
    'Timargara',
    'Parachinar',
    'Chenab Nagar',
    'Gwadar',
    'Abdul Hakim',
    'Hassan Abdal',
    'Tank',
    'Hangu',
    'Risalpur Cantonment',
    'Karak',
    'Kundian',
    'Umarkot',
    'Chitral',
    'Dainyor',
    'Kulachi',
    'Kalat',
    'Kotli',
    'Gilgit',
    'Narowal',
    "Khairpur Mir's",
    'Khanewal',
    'Jhelum',
    'Haripur',
    'Shikarpur',
    'Rawala Kot',
    'Hafizabad',
    'Lodhran',
    'Malakand',
    'Attock City',
    'Batgram',
    'Matiari',
    'Ghotki',
    'Naushahro Firoz',
    'Alpurai',
    'Bagh',
    'Daggar',
    'Leiah',
    'Tando Muhammad Khan',
    'Chakwal',
    'Badin',
    'Lakki',
    'Rajanpur',
    'Dera Allahyar',
    'Shahdad Kot',
    'Pishin',
    'Sanghar',
    'Upper Dir',
    'Thatta',
    'Dera Murad Jamali',
    'Kohlu',
    'Mastung',
    'Dasu',
    'Athmuqam',
    'Loralai',
    'Barkhan',
    'Musa Khel Bazar',
    'Ziarat',
    'Gandava',
    'Sibi',
    'Dera Bugti',
    'Eidgah',
    'Uthal',
    'Khuzdar',
    'Chilas',
    'Panjgur',
    'Gakuch',
    'Qila Saifullah',
    'Kharan',
    'Aliabad',
    'Awaran',
    'Dalbandin',
  ];

  const renderContent = ({item}) => {
    return <CardComp item={item} />;
  };

  return (
    <View style={styles.container}>
      <SearchHeader
        back={true}
        getSearch={text => {
          if (text === '') {
            getData();
          } else {
            setFavPets([]);
            let searchItem = text.toLowerCase();
            const filterData = favPets.filter(
              val =>
                val.name.toLowerCase().includes(searchItem) ||
                val.category.toLowerCase().includes(searchItem) ||
                val.city.toLowerCase().includes(searchItem) ||
                val.breed.toLowerCase().includes(searchItem),
            );
            setFavPets(filterData);
          }
        }}
      />
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
          onPress={() => setModal(true)}
          style={{
            fontWeight: 'bold',
            fontSize: Metrix.customFontSize(25),
            color: Colors.primary,
            marginLeft: 10,
          }}>
          {selectedCity ? selectedCity : user ? user.city : 'Karachi'}
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
      <CustomModal
        data={cityData}
        onCancel={() => setModal(false)}
        show={modal}
        onSelect={item => {
          setModal(false);
          setSelectedCity(item);
          getCityData(item)
        }}
        // type="object"
      />
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
