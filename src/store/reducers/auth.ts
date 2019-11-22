import {AUTH_LOGOUT, AUTH_SUCCESS, AUTH_ERROR} from "../actions/actionTypes";
import {TState} from "../../types/reducerTypes/authReducer";

const initialState: TState = {
  token: null,
  error: false
}


export default function authReducer(state = initialState, action: {type: string, token: string}) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, token: action.token
      }
    case AUTH_ERROR:
      return {
        ...state, error: true
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null
      }
    default:
      return state

  }
}
