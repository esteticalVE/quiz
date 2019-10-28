
export type Tquiz = {
  id: string,
  name: string
}

export type TQuizListProps = {
  fetchQuizes: () => void
  quizes: Array<Tquiz>
  loading: boolean
}