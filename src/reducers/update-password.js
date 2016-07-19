import * as A from "../actions/update-password";
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

    case A.UPDATE_PASSWORD_START: return {
      ...state,
      [endpoint]: {
        ...state[endpoint],
        loading: true
      }
    };

    case A.UPDATE_PASSWORD_COMPLETE: return {
      ...state,
      [endpoint]: initialState
    };

    case A.UPDATE_PASSWORD_ERROR: return {
      ...state,
      [endpoint]: {
        ...state[endpoint],
        loading: false,
        errors
      }
    };

    case A.UPDATE_PASSWORD_FORM_UPDATE: return {
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
  return state;
};
