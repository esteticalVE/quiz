import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "../actions/actionTypes"
import {TState} from '../../types/reducerTypes/createReducer'


const initialState: TState = {
  quiz: []
}

export default function createReducer(state = initialState, action: {type: string, item: any}) {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item]
      }
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: []
      }
    default:
      return state
  }
}