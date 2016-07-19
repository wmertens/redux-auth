import * as A from "../actions/destroy-account";
import { SET_ENDPOINT_KEYS } from "../actions/configure";

const initialState = {
  loading: false,
  errors: null
};

export default (state = {}, {type, endpoints, endpoint, errors}) => {
  switch (type) {
    case SET_ENDPOINT_KEYS: {
      const newState = {...state}
      Object.keys(endpoints).forEach(k => newState[k] = initialState)
      return newState
    }

    case A.DESTROY_ACCOUNT_START: return {
      ...state,
      [endpoint]: {
        ...state[endpoint],
        loading: true
      }
    };

    case A.DESTROY_ACCOUNT_COMPLETE: return {
      ...state,
      [endpoint]: initialState
    };

    case A.DESTROY_ACCOUNT_ERROR: return {
      ...state,
      [endpoint]: {
        loading: false,
        errors
      }
    };
  }
  return state
};
