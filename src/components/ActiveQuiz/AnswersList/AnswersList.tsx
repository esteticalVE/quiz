import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem';

type TAnswer = {
  text: string
}

type TProps = {
  answers: Array<TAnswer>
}

const AnswersList = (props: TProps) => (
  <ul className={classes.AnswersList}>
    {
      props.answers.map((answer: TAnswer, index: number) => {
        return (
          <AnswerItem
            key={index}
            answer={answer}
          />
        )
      
      })
    }
  </ul>
)

export default AnswersList