import * as uiActions from "../actions/ui";
import * as emailSignInActions from "../actions/email-sign-in";
import * as emailSignUpActions from "../actions/email-sign-up";
import * as signOutActions from "../actions/sign-out";
import * as requestPasswordResetActions from "../actions/request-password-reset";
import * as oAuthSignInActions from "../actions/oauth-sign-in";
import * as updatePasswordActions from "../actions/update-password";
import * as destroyAccountActions from "../actions/destroy-account";
import * as updatePasswordModalActions from "../actions/update-password-modal";
import * as serverActions from "../actions/server";

const initialState = {
  emailSignInSuccessModalVisible:          false,
  emailSignInErrorModalVisible:            false,
  oAuthSignInSuccessModalVisible:          false,
  oAuthSignInErrorModalVisible:            false,
  oAuthSignInLoadingProvider:              null,
  signOutSuccessModalVisible:              false,
  signOutErrorModalVisible:                false,
  emailSignUpSuccessModalVisible:          false,
  emailSignUpAddress:                      null,
  firstTimeLoginSuccessModalVisible:       false,
  firstTimeLoginErrorModalVisible:         false,
  requestPasswordResetSuccessModalVisible: false,
  requestPasswordResetErrorModalVisible:   false,
  requestPasswordResetSuccessMessage:      null,
  updatePasswordSuccessModalVisible:       false,
  updatePasswordErrorModalVisible:         false,
  destroyAccountSuccessModalVisible:       false,
  destroyAccountErrorModalVisible:         false,
  destroyAccountMessage:                   null,
  passwordResetSuccessModalVisible:        false,
  passwordResetErrorModalVisible:          false
};

export default (state = initialState, {type, provider, user, message, mustResetPassword, firstTimeLogin}) => {
  switch (type) {
	  case emailSignInActions.EMAIL_SIGN_IN_COMPLETE: return {
      ...state,
      emailSignInSuccessModalVisible: true
    };

	  case emailSignInActions.EMAIL_SIGN_IN_ERROR: return {
      ...state,
      emailSignInErrorModalVisible: true
    };

	  case oAuthSignInActions.OAUTH_SIGN_IN_COMPLETE: return {
      ...state,
      oAuthSignInSuccessModalVisible: true,
      oAuthSignInLoadingProvider: null
    };

	  case oAuthSignInActions.OAUTH_SIGN_IN_ERROR: return {
      ...state,
      oAuthSignInErrorModalVisible: true,
      oAuthSignInLoadingProvider: null
    };

	  case oAuthSignInActions.OAUTH_SIGN_IN_START: return {
      ...state,
      oAuthSignInLoadingProvider: provider
    };

	  case uiActions.HIDE_EMAIL_SIGN_IN_SUCCESS_MODAL: return {
      ...state,
      emailSignInSuccessModalVisible: false
    };

	  case uiActions.HIDE_EMAIL_SIGN_IN_ERROR_MODAL: return {
      ...state,
      emailSignInErrorModalVisible: false
    };

	  case signOutActions.SIGN_OUT_COMPLETE: return {
      ...state,
      signOutSuccessModalVisible: true
    };

	  case signOutActions.SIGN_OUT_ERROR: return {
      ...state,
      signOutErrorModalVisible: true
    };

	  case uiActions.HIDE_SIGN_OUT_SUCCESS_MODAL: return {
      ...state,
      signOutSuccessModalVisible: false
    };

	  case uiActions.HIDE_SIGN_OUT_ERROR_MODAL: return {
      ...state,
      signOutErrorModalVisible: false
    };

	  case emailSignUpActions.EMAIL_SIGN_UP_COMPLETE: return {
      ...state,
      emailSignUpSuccessModalVisible: true,
      emailSignUpAddress: user.email
    };

	  case emailSignUpActions.EMAIL_SIGN_UP_ERROR: return {
      ...state,
      emailSignUpErrorModalVisible: true
    };

	  case uiActions.HIDE_EMAIL_SIGN_UP_SUCCESS_MODAL: return {
      ...state,
      emailSignUpSuccessModalVisible: false,
      emailSignUpAddress: null
    };

	  case uiActions.HIDE_EMAIL_SIGN_UP_ERROR_MODAL: return {
      ...state,
      emailSignUpErrorModalVisible: false
    };

	  case uiActions.SHOW_FIRST_TIME_LOGIN_SUCCESS_MODAL: return {
      ...state,
      firstTimeLoginSuccessModalVisible: true
    };

	  case uiActions.HIDE_FIRST_TIME_LOGIN_SUCCESS_MODAL: return {
      ...state,
      firstTimeLoginSuccessModalVisible: false
    };

	  case uiActions.HIDE_PASSWORD_RESET_SUCCESS_MODAL: return {
      ...state,
      passwordResetSuccessModalVisible: false
    };

	  case uiActions.SHOW_PASSWORD_RESET_SUCCESS_MODAL: return {
      ...state,
      passwordResetSuccessModalVisible: true
    };

	  case uiActions.SHOW_FIRST_TIME_LOGIN_ERROR_MODAL: return {
      ...state,
      firstTimeLoginErrorModalVisible: true
    };

	  case uiActions.HIDE_FIRST_TIME_LOGIN_ERROR_MODAL: return {
      ...state,
      firstTimeLoginErrorModalVisible: false
    };

	  case uiActions.HIDE_PASSWORD_RESET_ERROR_MODAL: return {
      ...state,
      passwordResetErrorModalVisible: false
    };

	  case uiActions.SHOW_PASSWORD_RESET_ERROR_MODAL: return {
      ...state,
      passwordResetErrorModalVisible: true
    };

	  case requestPasswordResetActions.REQUEST_PASSWORD_RESET_COMPLETE: return {
      ...state,
      requestPasswordResetSuccessModalVisible: true,
      requestPasswordResetSuccessMessage: message
    };

	  case requestPasswordResetActions.REQUEST_PASSWORD_RESET_ERROR: return {
      ...state,
      requestPasswordResetErrorModalVisible: true
    };

	  case uiActions.HIDE_REQUEST_PASSWORD_RESET_SUCCESS_MODAL: return {
      ...state,
      requestPasswordResetSuccessModalVisible: false,
      requestPasswordResetSuccessMessage: null
    };

	  case uiActions.HIDE_REQUEST_PASSWORD_RESET_ERROR_MODAL: return {
      ...state,
      requestPasswordResetErrorModalVisible: false
    };

	  case uiActions.HIDE_OAUTH_SIGN_IN_SUCCESS_MODAL: return {
      ...state,
      oAuthSignInSuccessModalVisible: false
    };

	  case uiActions.HIDE_OAUTH_SIGN_IN_ERROR_MODAL: return {
      ...state,
      oAuthSignInErrorModalVisible: false
    };

	  case updatePasswordActions.UPDATE_PASSWORD_COMPLETE: return {
      ...state,
      updatePasswordSuccessModalVisible: true
    };

	  case updatePasswordActions.UPDATE_PASSWORD_ERROR: return {
      ...state,
      updatePasswordErrorModalVisible: true
    };

	  case uiActions.HIDE_UPDATE_PASSWORD_SUCCESS_MODAL: return {
      ...state,
      updatePasswordSuccessModalVisible: false
    };

	  case uiActions.HIDE_UPDATE_PASSWORD_ERROR_MODAL: return {
      ...state,
      updatePasswordErrorModalVisible: false
    };

	  case destroyAccountActions.DESTROY_ACCOUNT_COMPLETE: return {
      ...state,
      destroyAccountSuccessModalVisible: true,
      destroyAccountMessage: message
    };

	  case destroyAccountActions.DESTROY_ACCOUNT_ERROR: return {
      ...state,
      destroyAccountErrorModalVisible: true
    };

	  case uiActions.HIDE_DESTROY_ACCOUNT_SUCCESS_MODAL: return {
      ...state,
      destroyAccountSuccessModalVisible: false,
      destroyAccountMessage: null
    };

	  case uiActions.HIDE_DESTROY_ACCOUNT_ERROR_MODAL: return {
      ...state,
      destroyAccountErrorModalVisible: false
    };

	  case serverActions.SS_AUTH_TOKEN_UPDATE: return {
      ...state,
      passwordResetSuccessModalVisible: mustResetPassword,
      firstTimeLoginSuccessModalVisible: firstTimeLogin
    };

	  case uiActions.HIDE_PASSWORD_RESET_SUCCESS_MODAL: return {
      ...state,
      passwordResetSuccessModalVisible: false
    };

	  case uiActions.HIDE_PASSWORD_RESET_ERROR_MODAL: return {
      ...state,
      passwordResetSuccessModalVisible: false
    };

	  case updatePasswordModalActions.UPDATE_PASSWORD_MODAL_COMPLETE: return {
      ...state,
      passwordResetSuccessModalVisible: false,
      updatePasswordSuccessModalVisible: true
    };
  }
  return state;
};
