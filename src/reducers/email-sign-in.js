import {get} from 'lodash'
import * as A from "../actions/email-sign-in";
import { SET_ENDPOINT_KEYS } from "../actions/configure";

const initialState = {
  loading: false,
  errors: null,
  form: {}
};

export default (state = {}, {type, endpoints, endpoint, key, value}) => {
  switch (type) {
    case SET_ENDPOINT_KEYS: {
      const newState = {...state}
      Object.keys(endpoints).forEach(k => newState[k] = initialState)
      return newState
    }

    case A.EMAIL_SIGN_IN_START: return {
      ...state,
      [endpoint]: {
        ...state[endpoint],
        loading: true
      }
    };


    case A.EMAIL_SIGN_IN_COMPLETE: return {...state, [endpoint]: initialState};

    case A.EMAIL_SIGN_IN_ERROR: return {
      ...state,
      [endpoint]: {
        loading: false,
        errors
      }
    };

    case A.EMAIL_SIGN_IN_FORM_UPDATE: return {
      ...state,
      [endpoint]: {
        ...state[endpoint],
        form: {
          ...get(state[endpoint], 'form'),
          [key]: value
        }
      }
    };
  }
  return state
};
