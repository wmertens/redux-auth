import * as A from "../actions/request-password-reset";
import { SET_ENDPOINT_KEYS } from "../actions/configure";

const initialState = {
  loading: false,
  errors: null,
  form: {}
};

export default (state = {}, {type, endpoints, endpoint, errors, key, value}) => {
  switch (type) {
    case SET_ENDPOINT_KEYS: {
      const newState = {...state}
      Object.keys(endpoints).forEach(k => newState[k] = initialState)
      return newState
    }

    case A.REQUEST_PASSWORD_RESET_START: return {
      ...state,
      [endpoint]: {
        ...state[endpoint],
        loading: true
      }
    };

    case A.REQUEST_PASSWORD_RESET_COMPLETE: return {
      ...state,
      [endpoint]: initialState
    };

    case A.REQUEST_PASSWORD_RESET_ERROR: return {
      ...state,
      [endpoint]: {
        ...state[endpoint],
        loading: false,
        errors
      }
    };

    case A.REQUEST_PASSWORD_RESET_FORM_UPDATE: return {
      ...state,
      [endpoint]: {
        ...state[endpoint],
        form: {
          ...state[endpoint].form,
          [key]: value
        }
      }
    };
  }
  return state
};
