import * as A from "../actions/request-test-buttons";

const initialState = {
  showSuccessModal: false,
  showErrorModal: false,
  lastRequestUrl: null,
  buttons: {}
};

export default (state = initialState, {type, key}) => {
  switch (type) {
    case A.REQUEST_TEST_START: return {
      ...state,
      buttons: {
        ...state.buttons,
        [key]: {
          loading: true
        }
      }
    };

    case A.REQUEST_TEST_COMPLETE: return {
      ...state,
      buttons: {
        ...state.buttons,
        [key]: {
          loading: false
        }
      },
      showSuccessModal: true,
      lastRequestUrl: key
    };

    case A.REQUEST_TEST_ERROR: return {
      ...state,
      buttons: {
        ...state.buttons,
        [key]: {
          loading: false
        }
      },
      showErrorModal: true,
      lastRequestUrl: key
    };

    case A.DISMISS_REQUEST_TEST_SUCCESS_MODAL: return {
      ...state,
      showSuccessModal: false,
      lastRequestUrl: null
    };

    case A.DISMISS_REQUEST_TEST_ERROR_MODAL: return {
      ...state,
      showErrorModal: false,
      lastRequestUrl: null
    };
  }
  return state;
};
