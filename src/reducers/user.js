import { getCurrentEndpointKey } from "../utils/session-storage.js"
import * as authActions from "../actions/authenticate";
import { EMAIL_SIGN_IN_COMPLETE } from "../actions/email-sign-in";
import { SIGN_OUT_COMPLETE, SIGN_OUT_ERROR } from "../actions/sign-out";
import { OAUTH_SIGN_IN_COMPLETE } from "../actions/oauth-sign-in";
import { DESTROY_ACCOUNT_COMPLETE } from "../actions/destroy-account";
import * as ssActions from "../actions/server";
import { STORE_CURRENT_ENDPOINT_KEY, SET_ENDPOINT_KEYS } from "../actions/configure";

const initialState = {
  attributes: null,
  isSignedIn: false,
  firstTimeLogin: false,
  mustResetPassword: false,
  endpointKey: null
};

export default (state = initialState, {type, user, mustResetPassword, firstTimeLogin, currentEndpointKey}) => {
  switch (type) {
    case authActions.AUTHENTICATE_COMPLETE: return {
      ...state,
      attributes: user,
      isSignedIn: true,
      endpointKey: getCurrentEndpointKey()
    };

    case ssActions.SS_TOKEN_VALIDATION_COMPLETE: return {
      ...state,
      attributes: user,
      isSignedIn: true,
      firstTimeLogin,
      mustResetPassword
    };

    case STORE_CURRENT_ENDPOINT_KEY:
    case SET_ENDPOINT_KEYS:
      return {...state, endpointKey: currentEndpointKey};

    case EMAIL_SIGN_IN_COMPLETE: return {
      ...state,
      attributes: user.data,
      isSignedIn: true,
      endpointKey: endpoint
    };

     case OAUTH_SIGN_IN_COMPLETE: return {
      ...state,
      attributes: user,
      isSignedIn: true,
      endpointKey: endpoint
    };

    case ssActions.SS_AUTH_TOKEN_UPDATE: return {
      ...state,
      mustResetPassword,
      firstTimeLogin,
      isSignedIn: !!user,
      attributes: user
    };

    case authActions.AUTHENTICATE_FAILURE:
    case ssActions.SS_TOKEN_VALIDATION_ERROR:
    case SIGN_OUT_COMPLETE:
    case SIGN_OUT_ERROR:
    case DESTROY_ACCOUNT_COMPLETE:
      return initialState;
  }
  return state;
};
