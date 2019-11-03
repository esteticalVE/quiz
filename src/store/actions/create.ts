import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes"
import axios from '../../axios/axios-quiz'

export const createQuizQuestion = (item: any) => {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
}

export const resetQuizCreation = () => {
  return {
    type: RESET_QUIZ_CREATION
  }
}

export const finishCreateQuiz = () => {
  return async (dispatch: Function, getState: () => { create: { quiz: any; }}) => {
    await axios.post('/quizes.json', getState().create.quiz)
    dispatch(resetQuizCreation())
  }
}