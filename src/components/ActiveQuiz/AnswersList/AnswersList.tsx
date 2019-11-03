import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem';

type Tanswer = {
  text: string
  id: number
}

type Tprops = {
  answers: Tanswer[]
  onAnswerClick: Function
  state: string | null | never[]
}

const AnswersList: React.FC<Tprops> = (props: Tprops) => (
  <ul className={classes.AnswersList}>
    {
      props.answers.map((answer: Tanswer, index: number) => {
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