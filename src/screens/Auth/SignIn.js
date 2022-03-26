import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import TextInputComp from '../../components/TextInputComp';
import Button from '../../components/Button';
import {Colors, Images, Metrix, NavigationService} from '../../config';
// import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import AuthMiddleware from '../../redux/Middlewares/AuthMiddleware';

const SignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const dispatch = useDispatch();

  // const dispatch = useDispatch(AuthMiddleware.LogIn({email, password}));

  const createLogin = () => {
    dispatch(
      AuthMiddleware.LoginWithEmail({
        email,
        password,
        callback: res => {
          if (res == 'error') {
            Toast.show({
              type: 'success',
              text1: 'Alert',
              text2: 'Invalid Email or Password',
              position: 'bottom',
            });
          } else {
            NavigationService.navigate('BottomTabs');
          }
        },
      }),
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.secondContainer}>
        <Image source={Images.logo} style={styles.logoImage} />
      </View>
      <View style={{marginVertical: Metrix.VerticalSize(30)}}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.signinText}>Sign in with your account</Text>
      </View>
      <View style={{flex: 1, marginBottom: Metrix.VerticalSize(50)}}>
        <View
          style={{
            height: Metrix.VerticalSize(50),
            marginBottom: Metrix.VerticalSize(10),
          }}>
          <Text style={styles.textInputText}>Email Address</Text>
          <TextInputComp
            value={email}
            onChange={text => setEmail(text)}
            placeholder={'Enter Email'}
            type={'email-address'}
          />
        </View>
        <View style={{height: Metrix.VerticalSize(20), marginTop: 30}}>
          <Text style={styles.textInputText}>Password</Text>
          <View style={{flexDirection: 'row', height: Metrix.VerticalSize(50)}}>
            <TextInputComp
              value={password}
              onChange={text => setPassword(text)}
              placeholder={'Enter Password'}
              secure={secure}
              secureWidth={true}
            />
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => setSecure(!secure)}>
              {secure ? (
                <Text style={{marginVertical: 10, ...styles.textInputText}}>
                  Show
                </Text>
              ) : (
                <Text style={{marginVertical: 10, ...styles.textInputText}}>
                  Hide
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: Metrix.VerticalSize(60),
          marginVertical: Metrix.VerticalSize(10),
        }}>
        <Button
          color={Colors.primary}
          textColor={Colors.white}
          onPress={() => createLogin()}
          title={'Login'}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textInputText}>Forgot your password? </Text>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('ForgotPass')}>
            <Text style={styles.resetText}>Reset here</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textInputText}>New on app? </Text>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('SignUp')}>
            <Text style={styles.resetText}>Click here to register</Text>
          </TouchableOpacity>
        </View>
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
  secondContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Metrix.VerticalSize(90),
  },
  logoImage: {
    resizeMode: 'contain',
    width: Metrix.HorizontalSize(149),
    height: Metrix.VerticalSize(126),
    marginBottom: Metrix.VerticalSize(10),
  },
  welcomeText: {
    color: Colors.black,
    fontSize: Metrix.customFontSize(25),
    fontWeight: 'bold',
    marginBottom: 10,
    // fontFamily: 'Poppins-Black',
  },
  signinText: {
    color: Colors.textGray,
    fontSize: Metrix.customFontSize(14),
    fontWeight: 'bold',
    // fontFamily: 'Poppins-Regular',
  },
  textInputText: {
    color: Colors.textDarkGray,
    fontSize: Metrix.customFontSize(14),
    // fontFamily: 'Poppins-Regular',
  },
  resetText: {
    color: Colors.black,
    fontSize: Metrix.customFontSize(14),
    // fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
  },
});

export default SignIn;
