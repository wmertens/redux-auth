import * as A from "../actions/configure";

const initialState = {
  loading: true,
  errors: null,
  config: null,
  endpointKeys: null,
  defaultEndpointKey: null,
  currentEndpointKey: null
};

export default (state = initialState, {type, currentEndpointKey, endpointKeys, defaultEndpointKey, config, errors}) => {
  switch (type) {
    case A.CONFIGURE_START: return {...state, loading: true};

    case A.STORE_CURRENT_ENDPOINT_KEY: return {...state, currentEndpointKey};

    case A.SET_ENDPOINT_KEYS: return {...state, endpointKeys, defaultEndpointKey, currentEndpointKey};

    case A.CONFIGURE_COMPLETE: return {
      ...state,
      loading: false,
      errors: null,
      config
    };

    case A.CONFIGURE_ERROR: return {
      ...state,
      loading: false,
      errors
    };
  }
  return state
};
