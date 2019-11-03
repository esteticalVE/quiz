import {TQuiz} from "./componentTypes/quiz";

export type state = {
  auth: {
    token: string
  }
  create: {
    quiz: TQuiz[] | TQuiz | null
  }
  quiz: any
}