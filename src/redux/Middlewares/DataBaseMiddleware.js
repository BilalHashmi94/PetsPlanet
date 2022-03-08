import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import Toast from 'react-native-toast-message';
import {ApiCaller, NavigationService} from '../../config';
import {ToastError, ToastSuccess} from '../../config/Constants';
import {AuthAction, LoaderAction} from '../Actions';

export class DataBaseMiddleware extends Component {
  static GetSubscriptions({callback}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get('Subscription/GetSubscriptions');
        console.log('Subscription Response', response);
        if (response?.status == 200) {
          if (response?.data?.isSuccess) {
            Keyboard.dismiss();
            dispatch(LoaderAction.LoaderFalse());
            callback(response);
          } else {
            dispatch(LoaderAction.LoaderFalse());
            callback(response);
          }
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

  static GetTopPets({callback}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get('topPets');
        console.log('Top Pets Response', response);
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

  static GetStoriesByDate({callback, month, day, token}) {
    return async dispatch => {
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Get(
          `Story/GetStoryByDate/${day}/${month}`,
          '',
          {
            Authorization: 'Bearer ' + token,
          },
        );
        console.log('Stories By Date Response', response);
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

  static StoryLike({likeByUserID, storyIdentifier, token, callback}) {
    return async dispatch => {
      let payload = {
        likeByUserID: likeByUserID,
        storyIdentifier: storyIdentifier,
        isActive: true,
      };
      try {
        // dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post('Story/AddStoryLike', payload, {
          Authorization: 'Bearer ' + token,
        });
        console.log('StoryLike Response', response);
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
          console.log('status false');
          callback(response?.data);
          if (response?.data?.statusCode != 401)
            console.log('erro', response?.data?.message);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }
  static CommentLiked({likeByUserID, commentID, token, callback}) {
    return async dispatch => {
      let payload = {
        likeByUserID: likeByUserID,
        commentID: commentID,
        isActive: true,
      };
      try {
        // dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post('Story/AddCommentLike', payload, {
          Authorization: 'Bearer ' + token,
        });
        console.log('CommentLike Response', response);
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
          console.log('status false');
          callback(response?.data);
          if (response?.data?.statusCode != 401)
            console.log('erro', response?.data?.message);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }

  static AddComment({
    storyIdentifier,
    token,
    callback,
    comment,
    commentedByUserID,
    userFullName,
    userImageUrl,
  }) {
    return async dispatch => {
      let payload = {
        comment: comment,
        storyIdentifier: storyIdentifier,
        commentedByUserID: commentedByUserID,
        userFullName: userFullName,
        userImageUrl: userImageUrl,
        isActive: true,
      };
      try {
        dispatch(LoaderAction.LoaderTrue());
        let response = await ApiCaller.Post('Story/AddStoryComment', payload, {
          Authorization: 'Bearer ' + token,
        });
        console.log('Comment Response', response);
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
          console.log('status false');
          callback(response?.data);
          if (response?.data?.statusCode != 401)
            console.log('erro', response?.data?.message);
        }
      } catch (e) {
        dispatch(LoaderAction.LoaderFalse());
        console.log('Error', e);
      }
    };
  }
}

export default DataBaseMiddleware;
