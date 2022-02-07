import {EDIT_PROFILE, SIGNIN, SIGNOUT, SIGNUP} from '../Constants';

const initialState = {
  user: null,
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      state = {
        ...state,
        user: action.payload,
      };
      break;
    case SIGNUP:
      state = {
        ...state,
        user: action.payload,
      };
      break;
    case EDIT_PROFILE:
      state = {
        ...state,
        user: {...state.user, user: action.payload},
      };
      break;
    case SIGNOUT:
      state = {
        ...state,
        user: null,
      };
      break;

    default:
      break;
  }
  return state;
}
