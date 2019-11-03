import axios from '../../axios/axios-quiz'
import {TQuiz} from "../../types/componentTypes/quiz";
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  QUIZ_SET_STATE
} from "./actionTypes";

export const fetchQuizes = () => {
  return async (dispatch: Function) => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get('/quizes.json')
      let Lquizes: any = []
      Object.keys(response.data).forEach((key, index) => {
        Lquizes.push({
          id: key,
          name: `Тест #${index + 1}`
        })
      })
      dispatch(fetchQuizesSuccess(Lquizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export const fetchQuizById = (quizId: string) => {
  return async (dispatch: Function ) => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get(`/quizes/${quizId}.json`)
      const quiz = response.data
      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export const fetchQuizSuccess = (quiz: TQuiz) => {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export const fetchQuizesStart = () => {
  return {
    type: FETCH_QUIZES_START
  }
}

export const fetchQuizesSuccess = (quizes: Array<{id: string, name: string}>) => {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }

}

export const fetchQuizesError = (e: Error) => {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export const quizSetState = (answerState: { [x: string]: string; }, results: {[x: string] : string}) => {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export const finishQuiz = () => {
  return {
    type: FINISH_QUIZ
  }
}

export const quizNextQuestion = (number: number) => {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export const quizAnswerClick = (answerId: number) => {
  return (dispatch: Function, getState: Function) => {
    const state = getState().quiz
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }
    const question = state.quiz[state.activeQuestion]
    const results = state.results
    
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      dispatch(quizSetState({[answerId]: 'success'}, results))
      
      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, results))
    }
  
  }
}

export const retryQuiz = () => {
  return {
    type: QUIZ_RETRY
  }
}

const isQuizFinished = (state: any) => {
  return state.activeQuestion + 1 === state.quiz.length
}
