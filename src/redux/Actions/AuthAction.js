import React, {Component} from 'react';
import {SIGNUP, SIGNOUT, SIGNIN, EDIT_PROFILE, CART} from '../Constants';

export class AuthAction extends Component {
  static Signin(data) {
    return {type: SIGNIN, payload: data};
  }
  static EditProfile(data) {
    return {type: EDIT_PROFILE, payload: data};
  }
  static Signup(data) {
    return {type: SIGNUP, payload: data};
  }
  static Signout() {
    return {type: SIGNOUT};
  }
  static ClearRedux() {
    return {type: SIGNOUT};
  }
  static Cart(data) {
    return {type: CART, payload: data};
  }
}

export default AuthAction;
