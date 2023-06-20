import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import Toast from 'react-native-toast-message';
import {ApiCaller, NavigationService} from '../../config';
import {baseUrl} from '../../config/ApiCaller';
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
  static GetShopCategories({callback}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get('allCategories/shopCategories');
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

  static GetAllTopPets({callback, city}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(`allPets/getAllTopPets`);
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

  static GetProductOfShop({callback, name}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(
          `product/getShopProducts/?shopIdentifier=${name}`,
          '',
        );
        console.log('GetProductOfShop', response);
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

  static GetProductsByCategory({callback, name}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(
          `product/getProductsByCategory/?category=${name}`,
          '',
        );
        console.log('GetProductsByCategory Response', response);
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

  static GetPetByCity({callback, city}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(
          `allPets/getPetByCity?city=${city}`,
          '',
        );
        console.log('getPetByCity Response', response);
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

  static GetSellersAds({callback, seller_id}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(
          `allPets/getSellerAds?seller_id=${seller_id}`,
          '',
        );
        console.log('getSellerAdsResponse', response);
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

  static GetTopShops({callback}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(`shop/getTopShops`, '');
        console.log('GetTopShops', response);
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

  static GetAllShops({callback}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(`shop/getAllShops`, '');
        console.log('GetAllShops', response);
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

  static GetTopProducts({callback}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(`product/getTopProducts`, '');
        console.log('GetTopProducts', response);
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

  static GetAllProducts({callback}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(`product/getAllProducts`, '');
        console.log('GetAllProducts', response);
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

  static PostPetAdLike({callback, body}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post(`allPets/likePetsAd/`, body);
        console.log('getSellerAdsResponse', response);
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

  static DeleteAd({callback, body}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post(`common/deleteAd/`, body);
        console.log('DeleteAd', response);
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
  static BuyExtension({callback, body}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post(`common/buyExtension/`, body);
        console.log('BuyExtension', response);
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

  static PostProdAdLike({callback, body}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post(`product/productLike/`, body);
        console.log('getSellerAdsResponse', response);
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

  static GetMyChats({callback, id}) {
    let body = {
      id: id,
    };
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post(`chats/getMyChats`, body);
        console.log('GetMyChats', response);
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

  static GetFavorites({callback, id}) {
    let body = {id: id};
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post(`allPets/getFavorites/`, body);
        console.log('GetFavorites', response);
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
    city,
    callback,
  }) {
    return async dispatch => {
      const formData = new FormData();
      pet_pictures.map(val => {
        formData.append('file', {
          name: val.name,
          uri: val.uri,
          type: val.type,
        });
      });
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
      formData.append('age', age);
      formData.append('city', city);
      // try {
      console.log('file', pet_pictures);
      dispatch(LoaderAction.LoaderTrue());
      //   let response = await ApiCaller.Post('allPets/postPetAd/', formData);
      //   console.log('Get Pet Ad Response', response);
      //   if (response?.status == 200) {
      //     if (response?.data?.isSuccess) {
      //       Keyboard.dismiss();
      //       dispatch(LoaderAction.LoaderFalse());
      //       callback(response?.data);
      //     } else {
      //       dispatch(LoaderAction.LoaderFalse());
      //       callback(response?.data);
      //     }
      //   } else {
      //     dispatch(LoaderAction.LoaderFalse());
      //     callback(response?.data);
      //   }
      // } catch (e) {
      //   dispatch(LoaderAction.LoaderFalse());
      //   console.log('Error', e);
      // }
      return new Promise((resolve, reject) => {
        console.log('fetch');
        fetch(`${baseUrl}allPets/postPetAd/`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => {
            console.log('res', response);
            dispatch(LoaderAction.LoaderFalse());
            if (response?.status == 200) {
              callback({status: 200});
              dispatch(LoaderAction.LoaderFalse());
            } else {
              Toast.show({
                type: 'success',
                text1: 'Alert',
                text2: 'Somthing went wrong! Please try again later',
                position: 'bottom',
              });
              dispatch(LoaderAction.LoaderFalse());
            }
            resolve();
          })
          .catch(e => {
            dispatch(LoaderAction.LoaderFalse());
            Toast.show({
              type: 'success',
              text1: 'Alert',
              text2: 'Somthing went wrong! Please try again later',
              position: 'bottom',
            });
            reject();
            console.log('Error', e);
          });
      });
    };
  }
  static PostProductAd({
    name,
    category,
    description,
    lat,
    lng,
    price,
    topPet,
    seller_id,
    seller_name,
    seller_number,
    seller_picture,
    product_pictures,
    city,
    shopIdentifier,
    isLiked,
    callback,
  }) {
    return async dispatch => {
      const formData = new FormData();
      product_pictures.map(val => {
        formData.append('file', {
          name: val.name,
          uri: val.uri,
          type: val.type,
        });
      });
      formData.append('name', name);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('lat', lat);
      formData.append('lng', lng);
      formData.append('price', price);
      formData.append('topPet', topPet);
      formData.append('seller_id', seller_id);
      formData.append('seller_name', seller_name);
      formData.append('seller_number', seller_number);
      formData.append('seller_picture', seller_picture);
      formData.append('shopIdentifier', shopIdentifier);
      formData.append('isLiked', isLiked);
      formData.append('city', city);

      dispatch(LoaderAction.LoaderTrue());
      return new Promise((resolve, reject) => {
        console.log('fetch');
        fetch(`${baseUrl}product/postProductAd`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => {
            console.log('postProductAd', response);
            dispatch(LoaderAction.LoaderFalse());
            if (response?.status == 200) {
              NavigationService.resetStack('BottomTabs');
              Toast.show({
                type: 'success',
                text1: 'Alert',
                text2: 'Ad Posted Successfully.',
                position: 'bottom',
              });
              dispatch(LoaderAction.LoaderFalse());
            } else if (response?.status == 280) {
              Toast.show({
                type: 'error',
                text1: 'Alert',
                text2: 'Your ad available limits have been reached.',
                position: 'bottom',
              });
              dispatch(LoaderAction.LoaderFalse());
            } else {
              Toast.show({
                type: 'error',
                text1: 'Alert',
                text2: 'Something went wrong!',
                position: 'bottom',
              });
              dispatch(LoaderAction.LoaderFalse());
            }
            callback(response);
            resolve();
            return response.json();
          })
          .then(res => {
            console.log('then resposnsms ======>>>>>', res);
          })
          .catch(e => {
            dispatch(LoaderAction.LoaderFalse());
            Toast.show({
              type: 'success',
              text1: 'Alert',
              text2: 'Somthing went wrong! Please try again later',
              position: 'bottom',
            });
            reject();
            console.log('Error', e);
          });
      });
    };
  }

  static CreateShop({shopName, callback, userId, file}) {
    return async dispatch => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('shopName', shopName);
      formData.append('userId', userId);
      formData.append('numberOfProducts', '0');
      formData.append('likes', '0');
      dispatch(LoaderAction.LoaderTrue());
      return new Promise((resolve, reject) => {
        console.log('fetch');
        fetch(`${baseUrl}shop/registerShop`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
          .then(response => {
            console.warn('respomse', response);
            if (response?.status == 200) {
              return response.json();
            } else {
              Toast.show({
                type: 'success',
                text1: 'Alert',
                text2: 'Somthing went wrong! Please try again later',
                position: 'bottom',
              });
              callback(response);
              dispatch(LoaderAction.LoaderFalse());
            }
          })
          .then(response => {
            console.log('res', response);
            dispatch(LoaderAction.LoaderFalse());
            callback(response);
            dispatch(LoaderAction.LoaderFalse());
            resolve();
          })
          .catch(e => {
            dispatch(LoaderAction.LoaderFalse());
            Toast.show({
              type: 'success',
              text1: 'Alert',
              text2: 'Somthing went wrong! Please try again later',
              position: 'bottom',
            });
            reject();
            console.log('Error', e);
          });
      });
    };
  }
  static likeShop({shopId, callback, userId}) {
    return async dispatch => {
      const payload = {
        id: shopId,
        like: userId,
      };
      console.warn('like shop api');
      dispatch(LoaderAction.LoaderTrue());
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post(`shop/likeShop`, payload);
        console.log('likeShop', response);
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
