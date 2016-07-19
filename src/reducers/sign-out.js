import * as A from "../actions/sign-out";
import { SET_ENDPOINT_KEYS } from "../actions/configure";

const initialState = {
  loading: false,
  errors: null
};

export default (state = {}, {type, endpoints, endpoint, errors, key, value}) => {
  switch (type) {
    case SET_ENDPOINT_KEYS: {
      const newState = {...state}
      Object.keys(endpoints).forEach(k => newState[k] = initialState)
      return newState
    }


    case A.SIGN_OUT_START: return {
      ...state,
      [endpoint]: {
        ...state[endpoint],
        loading: true
      }
    };

    case A.SIGN_OUT_COMPLETE: return {
      ...state,
      [endpoint]: {
        loading: false,
        errors: null
      }
    };

    case A.SIGN_OUT_ERROR: return {
      ...state,
      [endpoint]: {
        loading: false,
        errors
      }
    };
  }
  return state
};
