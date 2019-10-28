import {TState} from "../../types/reducerTypes/quizReducerTypes";
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "../actions/actionTypes";

const initialState: TState = {
  quizes: [],
  loading: false,
  error: null
}


export default function quizReducer(state = initialState, action: { type: string, quizes: Array<{id: string, name: string}>, error: Error }) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state, loading: true
      }
    
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state, loading: false, quizes: action.quizes
      }
    
    case FETCH_QUIZES_ERROR:
      return {
        ...state, loading: false, error: action.error
      }
    
    default:
      return state
  }
}