import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Shop from '../screens/Shop';
import Profile from '../screens/Profile';
import {Colors, Metrix} from '../config';
import Favourites from '../screens/Favourites';
import {useSelector} from 'react-redux';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-admob/admob';

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const user = useSelector(state => state.AuthReducer.user);
  let icons = ['home', 'hearto', 'isv', 'user'];

  return (
    <>
      <Tab.Navigator
        tabBar={props => {
          //   console.warn('hek', props);
          return (
            <View
              style={{
                height: Metrix.VerticalSize(70),
                paddingHorizontal: Metrix.HorizontalSize(50),
                paddingTop: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.white,
                // position: 'absolute',
                borderTopWidth: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                margin: 10,
                position: 'absolute',
                bottom: 0,
                width: '95%',
                ...styles.shadow,
              }}>
              {props.state.routes.map((val, index) => (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate(val.name);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 45,
                    height: 45,
                    borderRadius: 70 / 2,
                    backgroundColor:
                      props.state.index == index
                        ? Colors.logoGreen
                        : Colors.white,
                    // padding: 10
                  }}>
                  <AntDesign
                    name={icons[index]}
                    size={23}
                    color={
                      props.state.index == index
                        ? Colors.white
                        : Colors.placeholderGray
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
        tabBarOptions={{showLabel: false, keyboardHidesTabBar: true}}
        screenOptions={({route}) => ({
          headerShown: false,
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
          style: {
            borderTopWidth: 0,
            elevation: 0,
            ...styles.shadow,
          },
          keyboardHidesTabBar: true,
          tabBarStyle: {
            height: Metrix.VerticalSize(70),
            paddingHorizontal: Metrix.HorizontalSize(5),
            paddingTop: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.white,
            // position: 'absolute',
            borderTopWidth: 0,
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          headerShown={false}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome
                  name={'home'}
                  size={25}
                  color={focused ? '#CCCCFF' : Colors.white}
                />
              </View>
            ),
            tabBarButton: props => <CreateCustomTabButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={Favourites}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <FontAwesome
                  name={'shopping-cart'}
                  size={25}
                  color={focused ? '#CCCCFF' : Colors.logoGreen}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Shop"
          component={Shop}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <FontAwesome
                  name={'shopping-cart'}
                  size={25}
                  color={focused ? '#CCCCFF' : Colors.logoGreen}
                />
              </View>
            ),
          }}
        />
        {/* {user ? ( */}
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <FontAwesome
                  name={'user'}
                  size={25}
                  color={focused ? '#CCCCFF' : Colors.logoGreen}
                />
              </View>
            ),
          }}
        />
        {/* ) : null} */}
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15.5,
    elevation: 5,
  },
});

export default BottomTabs;
