import {EDIT_PROFILE, SIGNIN, SIGNOUT, SIGNUP, CART} from '../Constants';

const initialState = {
  user: null,
  cartData: [],
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
        cartData: [],
      };
      break;
    case CART:
      state = {
        ...state,
        cartData: action.payload,
      };
      break;

    default:
      break;
  }
  return state;
}
