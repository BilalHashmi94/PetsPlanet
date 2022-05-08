import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import Toast from 'react-native-toast-message';
import {ApiCaller, NavigationService} from '../../config';
import {ToastError, ToastSuccess} from '../../config/Constants';
import {AuthAction, LoaderAction} from '../Actions';

export class DataBaseMiddleware extends Component {
  static GetCategories({callback}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get('allCategories');
        console.log('Categories Response', response);
        if (response?.status == 200) {
          Keyboard.dismiss();
          dispatch(LoaderAction.LoaderFalse());
          callback(response);
        } else {
          dispatch(LoaderAction.LoaderFalse());
          callback(response);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static GetAllPets({callback}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get('allPets');
        console.log('All Pets Response', response);
        if (response?.status == 200) {
          Keyboard.dismiss();
          dispatch(LoaderAction.LoaderFalse());
          callback(response?.data);
        } else {
          dispatch(LoaderAction.LoaderFalse());
          callback(response?.data);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static GetAllTopPets({callback}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get('allPets/getAllTopPets');
        console.log('Top Pets Response', response);
        if (response?.status == 200) {
          Keyboard.dismiss();
          dispatch(LoaderAction.LoaderFalse());
          callback(response?.data);
        } else {
          dispatch(LoaderAction.LoaderFalse());
          callback(response?.data);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static GetPetByCategory({callback, name}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(
          `allPets/getByCategory?category=${name}`,
          '',
        );
        console.log('Get Pet By Category Response', response);
        if (response?.status == 200) {
          if (response?.data?.isSuccess) {
            Keyboard.dismiss();
            dispatch(LoaderAction.LoaderFalse());
            callback(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            callback(response?.data);
          }
        } else {
          dispatch(LoaderAction.LoaderFalse());
          callback(response?.data);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static PostPetAd({
    name,
    breed,
    category,
    description,
    weight,
    age,
    lat,
    lng,
    image,
    price,
    topPet,
    topTen,
    seller_id,
    seller_name,
    seller_number,
    seller_picture,
    pet_pictures,
    callback,
  }) {
    return async dispatch => {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('breed', breed);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('weight', weight);
      formData.append('lat', lat);
      formData.append('lng', lng);
      formData.append('image', 'https://picsum.photos/200/300');
      formData.append('price', price);
      formData.append('topPet', topPet);
      formData.append('topTen', topTen);
      formData.append('seller_id', seller_id);
      formData.append('seller_name', seller_name);
      formData.append('seller_number', seller_number);
      formData.append('seller_picture', seller_picture);
      formData.append('pet_pictures', pet_pictures);
      formData.append('age', age);
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post('allPets/postPetAd/', formData);
        console.log('Get Pet Ad Response', response);
        if (response?.status == 200) {
          if (response?.data?.isSuccess) {
            Keyboard.dismiss();
            dispatch(LoaderAction.LoaderFalse());
            callback(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            callback(response?.data);
          }
        } else {
          dispatch(LoaderAction.LoaderFalse());
          callback(response?.data);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }
}

export default DataBaseMiddleware;
