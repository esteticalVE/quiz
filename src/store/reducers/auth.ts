import {AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";
import {TState} from "../../types/reducerTypes/authReducer";

const initialState: TState = {
  token: null,
}
//todo type action
export default function authReducer(state = initialState, action: {type: string, token: string}) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, token: action.token
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null
      }
    default:
      return state
  
  }
}