import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import {
  Colors,
  CommonStyles,
  Images,
  Metrix,
  NavigationService,
} from '../../config';
import Button from '../../components/Button';

const SignupAsA = () => {
  return (
    <View
      style={{
        ...CommonStyles.container,
        justifyContent: 'center',
        paddingHorizontal: 0,
      }}>
      <ImageBackground
        source={Images.sugnupback}
        style={{
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: Metrix.HorizontalSize(20),
        }}
        // blurRadius={}
      >
        <Text
          style={{
            ...CommonStyles.textStyles.heading,
            marginTop: Metrix.VerticalSize(100),
          }}>
          Interested in becoming a seller?{' '}
        </Text>
        <Text
          style={{
            ...CommonStyles.textStyles.semiHeading,
            color: Colors.darkGray,
          }}>
          Or you can choose to start as a buyer now and easily switch to
          becoming a seller later!
        </Text>
        <Button
          title={'Seller'}
          onPress={() => NavigationService.navigate('SignUp', {type: 'Seller'})}
          propStyle={{
            marginTop: Metrix.VerticalSize(50),
            marginBottom: Metrix.VerticalSize(30),
            backgroundColor: Colors.logoGreen,
          }}
        />
        <Button
          title={'Buyer'}
          onPress={() => NavigationService.navigate('SignUp', {type: 'Buyer'})}
          propStyle={{backgroundColor: Colors.logoGreen}}
        />
      </ImageBackground>
    </View>
  );
};

export default SignupAsA;
