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
    let {loading} = this.props;
    return (
      <>
        <NavigationContainer
          ref={ref => NavigationService.setTopLevelNavigator(ref)}>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={'BottomTabs'}>
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="PetDetail" component={PetDetail} />
            <Stack.Screen name="CategorySearch" component={CategorySearch} />
            <Stack.Screen name="TopPets" component={TopPets} />
            <Stack.Screen name="AllCategories" component={AllCategories} />
            <Stack.Screen name="LocationWise" component={LocationWise} />
            <Stack.Screen name="DoctorsList" component={DoctorsList} />
            <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
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
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
