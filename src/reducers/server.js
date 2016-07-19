import * as A from "../actions/server";

const initialState = {
  user: null,
  headers: null,
  firstTimeLogin: false,
  mustResetPassword: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case A.SS_AUTH_TOKEN_UPDATE: {
      const {
        user = null,
        headers = null,
        mustResetPassword = false,
        firstTimeLogin = false
      } = action
      return {
        ...state,
        user,
        headers,
        mustResetPassword,
        firstTimeLogin
      };
    }
  }
  return state;
};
