import axios from '../../axios/axios-quiz'
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "./actionTypes";

export function fetchQuizes() {
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

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes: Array<{id: string, name: string}>) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }

}

export function fetchQuizesError (e: Error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}