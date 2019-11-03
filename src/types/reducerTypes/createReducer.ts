type quizCreator = {
  question?: string
  id: number
  rightAnswerId: number
  answers: answers | answers[]
}

type answers = {
  text: string
  id: number
}

export type TState = {
  quiz: quizCreator[]
}

