import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes"
import axios from '../../axios/axios-quiz'
import {TQuiz} from "../../types/componentTypes/quiz";

export const createQuizQuestion = (item: TQuiz) => {
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
  return async (dispatch: Function, getState: () => { create: { quiz: TQuiz; }}) => {
    await axios.post('/quizes.json', getState().create.quiz)
    dispatch(resetQuizCreation())
  }
}