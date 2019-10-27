import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem';

type TAnswer = {
  text: string
  id: number
}

type TProps = {
  answers: Array<TAnswer>
  onAnswerClick: Function
  state: string | null | never[]
}

const AnswersList = (props: TProps) => (
  <ul className={classes.AnswersList}>
    {
      props.answers.map((answer: TAnswer, index: number) => {
        // @ts-ignore
        return (
          <AnswerItem
            onAnswerClick={props.onAnswerClick}
            key={index}
            answer={answer}
            state={props.state ? props.state[answer.id] : null }
          />
        )
      
      })
    }
  </ul>
)

export default AnswersList