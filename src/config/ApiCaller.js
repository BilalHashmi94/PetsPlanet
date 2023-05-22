import Axios from 'axios';
import Toast from 'react-native-toast-message';
import {NavigationService} from '.';
import {ToastError} from './Constants';
import {Store} from '../redux';
import {AuthAction} from '../redux/Actions';

// export var baseUrl = 'https://pets-planet.herokuapp.com/';
export var baseUrl = 'http://169.254.170.106:8000/';

// export const Img_url = 'https://pets-planet.herokuapp.com/uploads/';
export const Img_url = 'http://169.254.170.106:8000/uploads/';

const CancelToken = Axios.CancelToken.source();
// create the source

Axios.interceptors.response.use(
  response => {
    return response;
  },
  async ({response, ...rest}) => {
    if (response?.status == 401) {
      try {
        // let {
        //   AuthReducer: {
        //     user: {refreshToken},
        //   },
        // } = Store.getState();
        //  console.warn("401 UnAuthenticated")
        // Axios.CancelToken();

        Store.dispatch(AuthAction.ClearRedux());
        // CancelToken.cancel('Network error');
        console.log('Auth err', response);
        Toast.show(ToastError('Session Expired! Please login.'));
        NavigationService.resetStack('AuthStack');
        // });
      } catch (err) {
        console.log('Error= ===', err);
      }
    }
    return response;
  },
);

export default class ApiCaller {
  static Get = (url = '', customUrl = '', headers = {}) => {
    this.source = CancelToken;
    return Axios.get(customUrl ? customUrl : `${baseUrl}${url}`, {
      cancelToken: this.source.token,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers,
      },
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Post = async (
    endPoint = '',
    body = {},
    headers = {},
    cutomUrl = '',
    onUploadProgress = () => {},
  ) => {
    return Axios.post(cutomUrl ? cutomUrl : `${baseUrl}${endPoint}`, body, {
      headers: {
        Accept: 'application/json',
        ...headers,
      },
      onUploadProgress: progress => onUploadProgress(progress),
    });
  };

  static Put = (url = '', body = {}, headers = {}) => {
    return Axios.put(`${baseUrl}${url}`, body, {
      headers: {'Content-Type': 'application/json', ...headers},
    })
      .then(res => res)
      .catch(err => err.response);
  };

  static Delete = (url = '', body = {}, headers = {}) => {
    return Axios.delete(`${baseUrl}${url}`, {
      headers: {'Content-Type': 'application/json', ...headers},
      data: body,
    })
      .then(res => res)
      .catch(err => err.response);
  };
}
