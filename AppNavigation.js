import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors, Metrix, NavigationService} from './src/config';
import {ActivityIndicator, View} from 'react-native';
import {connect, useSelector} from 'react-redux';
import PetDetail from './src/screens/Pets/PetDetail';
import BottomTabs from './src/components/BottomTabs';
import CategorySearch from './src/screens/PetsCategories/CategorySearch';
import TopPets from './src/screens/Pets/TopPets';
import AllCategories from './src/screens/PetsCategories/AllCategories';
import LocationWise from './src/screens/Pets/LocationWise';
import DoctorsList from './src/screens/Doctor/DoctorsList';
import DoctorDetail from './src/screens/Doctor/DoctorDetail';
import ContactUs from './src/screens/ProfileStack/ContactUs';
import EditProfile from './src/screens/ProfileStack/EditProfile';
import PrivacyPolicy from './src/screens/ProfileStack/PrivacyPolicy';
import TermsAndConditions from './src/screens/ProfileStack/TermsAndConditions';
import SellersList from './src/screens/Seller/SellersList';
import SellDetail from './src/screens/Seller/SellDetail';
import SignIn from './src/screens/Auth/SignIn';
import SignUp from './src/screens/Auth/SignUp';
import ForgotPass from './src/screens/Auth/ForgotPass';
import WhatDoYouWantToSell from './src/screens/Seller/WhatDoYouWantToSell';
import SellPet from './src/screens/Seller/SellPet';
import RegisterAsDoctor from './src/screens/Doctor/RegisterAsDoctor';
import ShopStore from './src/screens/Seller/ShopStore';
import PorductDetail from './src/screens/Seller/PorductDetail';
import SellOnMall from './src/screens/Seller/SellOnMall';
import CreateShop from './src/screens/Seller/CreateShop';
import CreateShopTwo from './src/screens/Seller/CreateShopTwo';

const Stack = createStackNavigator();

// const AuthStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false}}
//       initialRouteName="BottomTabs">
//       <Stack.Screen name="BottomTabs" component={BottomTabs} />
//       <Stack.Screen name="BlogScreen" component={BlogScreen} />
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="SignUp" component={SignUp} />
//       <Stack.Screen name="ResetPassword" component={ResetPassword} />
//       <Stack.Screen name="Verification" component={Verification} />
//       <Stack.Screen name="ChangePassword" component={ChangePassword} />
//       <Stack.Screen name="NewPassword" component={NewPassword} />
//     </Stack.Navigator>
//   );
// };
// const UserStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{headerShown: false}}
//       initialRouteName="BottomTabs">
//       <Stack.Screen name="BottomTabs" component={BottomTabs} />
//       <Stack.Screen name="BlogScreen" component={BlogScreen} />
//       <Stack.Screen name="Subscription" component={Subscription} />
//       <Stack.Screen name="Payment" component={Payment} />
//       <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
//       <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
//       <Stack.Screen name="MySubscriptions" component={MySubscriptions} />
//       <Stack.Screen name="ContactUs" component={ContactUs} />
//       <Stack.Screen name="EditProfile" component={EditProfile} />
//       <Stack.Screen name="SearchResult" component={SearchResult} />
//       <Stack.Screen name="FAQs" component={FAQs} />
//     </Stack.Navigator>
//   );
// };

class AppNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const loading = useSelector(state => state.LoaderReducer.loading);
    let {loading, user} = this.props;
    return (
      <>
        <NavigationContainer
          ref={ref => NavigationService.setTopLevelNavigator(ref)}>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={user ? "BottomTabs" : 'SignIn'}>
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="PetDetail" component={PetDetail} />
            <Stack.Screen name="CategorySearch" component={CategorySearch} />
            <Stack.Screen name="TopPets" component={TopPets} />
            <Stack.Screen name="AllCategories" component={AllCategories} />
            <Stack.Screen name="LocationWise" component={LocationWise} />
            <Stack.Screen name="DoctorsList" component={DoctorsList} />
            <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen name="SellersList" component={SellersList} />
            <Stack.Screen name="SellDetail" component={SellDetail} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
            <Stack.Screen name="WhatDoYouWantToSell" component={WhatDoYouWantToSell} />
            <Stack.Screen name="SellPet" component={SellPet} />
            <Stack.Screen name="RegisterAsDoctor" component={RegisterAsDoctor} />
            <Stack.Screen name="ShopStore" component={ShopStore} />
            <Stack.Screen name="PorductDetail" component={PorductDetail} />
            <Stack.Screen name="SellOnMall" component={SellOnMall} />
            <Stack.Screen name="CreateShop" component={CreateShop} />
            <Stack.Screen name="CreateShopTwo" component={CreateShopTwo} />
          </Stack.Navigator>
        </NavigationContainer>
        {loading && (
          <View
            style={{
              height: Metrix.VerticalSize(),
              width: Metrix.HorizontalSize(),
              position: 'absolute',
              zIndex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                paddingHorizontal: Metrix.VerticalSize(30),
                paddingVertical: Metrix.VerticalSize(30),
                borderRadius: Metrix.VerticalSize(10),
                backgroundColor: Colors.primary,
              }}>
              <ActivityIndicator size="large" color={Colors.white} />
            </View>
          </View>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.LoaderReducer.loading,
  user: state.AuthReducer.user,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
