import React from 'react'
import classes from './AnswerItem.module.css'

type TProps = {
  onAnswerClick: Function,
  answer: {
    text: string
    id: number
  }
}

const AnswerItem = (props: TProps) => {
  return (
    <li className={classes.AnswerItem}
    onClick={() => props.onAnswerClick(props.answer.id)}
    >
      { props.answer.text }
    </li>
  )
}

export default AnswerItem