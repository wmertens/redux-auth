import * as A from "../actions/authenticate";

const initialState = {
  loading: false,
  valid: false,
  errors: null
};

export default (state = initialState, {type}) => {
  switch (type) {
    case A.AUTHENTICATE_START: return {...state, loading: true};

    case A.AUTHENTICATE_COMPLETE: return {
      ...state,
      loading: false,
      errors: null,
      valid: true
    };

    case A.AUTHENTICATE_ERROR: return {
      ...state,
      loading: false,
      errors: "Invalid token",
      valid: false
    };
  }
  return state
};
