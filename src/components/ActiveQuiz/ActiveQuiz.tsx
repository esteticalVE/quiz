import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList';

type TAnswer = {
  text: string
  id: number
}

type TProps = {
  answers: Array<TAnswer>
  question: string
  onAnswerClick: Function
}


const ActiveQuiz = (props: TProps) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>
            2.
          </strong>&nbsp;
          {props.question}
        </span>
        <small> 4 из 15 </small>
      </p>
      <AnswersList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  )
}


export default ActiveQuiz