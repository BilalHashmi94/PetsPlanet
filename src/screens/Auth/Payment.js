import {View, Text} from 'react-native';
import React from 'react';
import {CommonStyles, NavigationService} from '../../config';
import Header from '../../components/Header';
import TextInputComp from '../../components/TextInputComp';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {ToastError} from '../../config/Constants';
import DataBaseMiddleware from '../../redux/Middlewares/DataBaseMiddleware';
import {AuthAction} from '../../redux/Actions';

const Payment = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.AuthReducer.user);

  const BuyExtension = () => {
    let payload = {
      _id: user.id,
      limit: 5,
    };
    dispatch(
      DataBaseMiddleware.BuyExtension({
        body: payload,
        callback: res => {
          if (res) {
            console.log('res', res);
            dispatch(AuthAction.Signin(res));
            NavigationService.goBack();
            // setLimitModal(false);
          } else {
            Toast.show(ToastError('Please Contact Our Support Team'));
          }
        },
      }),
    );
  };

  return (
    <View style={{...CommonStyles.container}}>
      <Header />
      <Text style={{...CommonStyles.textStyles.semiHeading}}>Payment</Text>
      <View>
        <Text>5 ads</Text>
        <Text>Total: 1000</Text>

        <View style={{marginVertical: 20}}>
          <Text>Card Number</Text>
          <TextInputComp />
        </View>
        <View>
          <Text>Name On Card</Text>
          <TextInputComp />
        </View>
        <View style={{marginVertical: 20}}>
          <Text>Expiry</Text>
          <TextInputComp />
        </View>
        <View>
          <Text>CVC</Text>
          <TextInputComp />
        </View>
        <View style={{marginVertical: 20}}>
          <Button title={'Buy Now'} onPress={() => BuyExtension()} />
        </View>
      </View>
    </View>
  );
};

export default Payment;
