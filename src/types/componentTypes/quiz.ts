export type TQuiz = {
  answers: Tanswer[]
  id: number
  question: string
  rightAnswerId: number
}

export type Tanswer = {
  id: number
  text: string
}