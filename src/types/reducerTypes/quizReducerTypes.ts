import {TQuiz} from "../componentTypes/quiz";

type Tquiz = {
  id: string,
  name: string
}

export type TState = {
  readonly quizes: Array<Tquiz>
  readonly loading: boolean
  readonly error: Error | null
  results: object,
  isFinished: boolean,
  activeQuestion: number,
  answerState: null | any,
  quiz: null | TQuiz
}