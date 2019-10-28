type Tquiz = {
  id: string,
  name: string
}

export type TState = {
  readonly quizes: Array<Tquiz>
  readonly loading: boolean
  //todo error? r not..
  readonly error: Error | null
}