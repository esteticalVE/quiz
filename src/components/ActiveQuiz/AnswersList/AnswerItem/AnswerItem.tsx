import React from 'react'
import classes from './AnswerItem.module.css'

type TProps = {
  answer: {
    text: string
  }
}

const AnswerItem = (props: TProps) => {
  return (
    <li className={classes.AnswerItem}>
      { props.answer.text }
    </li>
  )
}

export default AnswerItem