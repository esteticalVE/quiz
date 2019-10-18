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
}

const AnswersList = (props: TProps) => (
  <ul className={classes.AnswersList}>
    {
      props.answers.map((answer: TAnswer, index: number) => {
        return (
          <AnswerItem
            onAnswerClick={props.onAnswerClick}
            key={index}
            answer={answer}
          />
        )
      
      })
    }
  </ul>
)

export default AnswersList