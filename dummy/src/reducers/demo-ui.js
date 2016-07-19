import { combineReducers } from "redux";
import * as A from "../actions/demo-ui";

const initialState = {
  theme: "materialUi",
  endpoint: "default"
};

export default (state = initialState, {type, theme, endpoint}) => {
  switch (type) {
    case A.UPDATE_DEMO_THEME: return {...state, theme};
    case A.UPDATE_DEMO_ENDPOINT: return {...state, endpoint};
  }
  return state;
};
