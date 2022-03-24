import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import Toast from 'react-native-toast-message';
import {ApiCaller, NavigationService} from '../../config';
import {ToastError, ToastSuccess} from '../../config/Constants';
import {AuthAction, LoaderAction} from '../Actions';

export class AuthMiddleware extends Component {
  static LogIn({email, password, subscribed}) {
    return async dispatch => {
      console.warn('Email and passord', email, password, subscribed);
      try {
        dispatch(LoaderAction.LoaderTrue());
        // let response = await ApiCaller.Post('Account/Login', {
        //   clientEmail: email,
        //   password: password,
        //   source_id: 1,
        // });
        let response = {
          data: {
            status: 200,
            data: {
              status: 'Success',
              data: {
                email: email,
                password: password,
                subscribed: subscribed,
                profilePicture:
                  'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80,',
                firstName: 'Will',
                lastName: 'Smith',
              },
            },
          },
        };
        setTimeout(() => {
          dispatch(LoaderAction.LoaderFalse());
          // console.warn('========', response);
          if (response.data.status == 200)
            if (response.data.data.status == 'Success') {
              dispatch(AuthAction.Signin(response.data.data.data));
              NavigationService.navigate('BottomTabs');
            } else {
              Toast.show(ToastError(response.data.data));
            }
        }, 2000);
      } catch (e) {
        console.warn('====error', e.message);
        dispatch(LoaderAction.LoaderFalse());
      }
    };
  }

  static LoginWithEmail({email, callback, password}) {
    return async dispatch => {
      let payload = {
        email: email,
        password: password,
      };
      console.log('payload', payload);
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post('users/authenticate', payload);
        console.log('Login Response', response);
        if (response?.status == 200) {
          if (response?.data?.isSuccess) {
            dispatch(LoaderAction.LoaderFalse());
            console.log('isSuccess');
            Keyboard.dismiss();
            dispatch(AuthAction.Signin(response?.data?.data));
            callback(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            callback(response.data);
            console.log('erro00', response?.data?.message);
          }
        } else {
          dispatch(LoaderAction.LoaderFalse());
          console.log('status false');
          callback(response.data);
          if (response?.data?.statusCode != 401)
            console.log('erro', response?.data?.message);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static Register({firstName, callback, lastName, email, password}) {
    return async dispatch => {
      let payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post('users/register', payload);
        console.log('register Response', response);
        if (response?.status == 200) {
          if (response?.data?.isSuccess) {
            dispatch(LoaderAction.LoaderFalse());
            console.log('isSuccess');
            Keyboard.dismiss();
            callback(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());

            callback(response.data);
            console.log('erro00', response?.data?.message);
          }
        } else {
          dispatch(LoaderAction.LoaderFalse());

          console.log('status false');
          callback(response.data);
          if (response?.data?.statusCode != 401)
            // Toast.show(ToastError(response?.data?.message));
            console.log('erro', response?.data?.message);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static NewPassword({newPassword, callback, confirmPassword, emailAddress}) {
    return async dispatch => {
      let payload = {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        emailAddress: emailAddress,
      };
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post('Users/ResetPassword', payload);
        console.log('ResetPassword Response', response);
        if (response?.status == 200) {
          if (response?.data?.isSuccess) {
            dispatch(LoaderAction.LoaderFalse());
            console.log('isSuccess');
            Keyboard.dismiss();
            callback(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());

            callback(response.data);
            console.log('erro00', response?.data?.message);
          }
        } else {
          dispatch(LoaderAction.LoaderFalse());

          console.log('status false');
          callback(response.data);
          if (response?.data?.statusCode != 401)
            // Toast.show(ToastError(response?.data?.message));
            console.log('erro', response?.data?.message);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static ContactUs({
    id,
    callback,
    contactName,
    contactEmail,
    contactMessage,
  }) {
    return async dispatch => {
      let payload = {
        id: id,
        contactName: contactName,
        contactEmail: contactEmail,
        contactMessage: contactMessage,
        isActive: true,
        isRead: true,
      };
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post(
          'Common/AddContactEnquiries',
          payload,
        );
        console.log('Contact Us Response', response);
        if (response?.status == 200) {
          if (response?.data?.isSuccess) {
            dispatch(LoaderAction.LoaderFalse());
            Keyboard.dismiss();
            callback(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());

            callback(response.data);
            console.log('erro00', response?.data?.message);
          }
        } else {
          dispatch(LoaderAction.LoaderFalse());

          console.log('status false');
          callback(response.data);
          if (response?.data?.statusCode != 401)
            console.log('erro', response?.data?.message);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static EditProfile({
    firstName,
    callback,
    lastName,
    email,
    token,
    id,
    userTypeID,
    imageUrl,
    identifier,
  }) {
    return async dispatch => {
      let payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userTypeID: userTypeID,
        isActive: true,
        id: id,
        imageUrl: imageUrl,
        identifier: identifier,
      };
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post('Users/EditUser', payload, {
          Authorization: 'Bearer ' + token,
        });
        dispatch(LoaderAction.LoaderFalse());
        console.log('Edit Profile Response', response);
        if (response?.status == 200) {
          if (response?.data?.isSuccess) {
            Keyboard.dismiss();
            dispatch(AuthAction.EditProfile(response.data.data));
            callback(response?.data);
          } else {
            callback(response.data);
          }
        } else {
          console.log('status false');
          callback(response.data);
          if (response?.data?.statusCode != 401)
            console.log('erro', response?.data?.message);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static VerifyRegister({callback, code, email}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(
          `Users/VerifyUserCode/${code}/${email}/1`,
        );
        console.log('Verify Register Response', response);
        if (response?.status == 200) {
          if (response?.data?.isSuccess) {
            dispatch(LoaderAction.LoaderFalse());
            Keyboard.dismiss();
            callback(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            callback(response?.data);
          }
        } else {
          dispatch(LoaderAction.LoaderFalse());
          callback(response?.data);
          if (response?.status != 401)
            Toast.show(ToastError(response?.data?.message));
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static VerifyForgotPassword({callback, code, email}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(
          `Users/VerifyUserCode/${code}/${email}/2`,
        );
        console.log('Verify Forgot Password Response', response);
        if (response?.status == 200) {
          if (response?.data?.isSuccess) {
            dispatch(LoaderAction.LoaderFalse());
            Keyboard.dismiss();
            callback(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            callback(response?.data);
          }
        } else {
          dispatch(LoaderAction.LoaderFalse());
          callback(response?.data);
          if (response?.status != 401)
            Toast.show(ToastError(response?.data?.message));
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static ForgotPassword({callback, email}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(`Users/ForgetPassword/${email}`);
        console.log('Forgot Password Response', response);
        if (response?.status == 200) {
          if (response?.data?.isSuccess) {
            dispatch(LoaderAction.LoaderFalse());
            Keyboard.dismiss();
            callback(response?.data);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            callback(response?.data);
          }
        } else {
          dispatch(LoaderAction.LoaderFalse());
          callback(response?.data);
          if (response?.status != 401)
            Toast.show(ToastError(response?.data?.message));
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static VerifyOldPassword({callback, oldPassword, token}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(
          `Users/VerifyOldPassword/${oldPassword}`,
          '',
          {
            Authorization: 'Bearer ' + token,
          },
        );
        console.log('VerifyOldPassword Response', response);
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

export default AuthMiddleware;
