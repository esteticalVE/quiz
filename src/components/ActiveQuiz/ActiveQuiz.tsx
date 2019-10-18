import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList';

type TAnswer = {
  text: string
}

type TProps = {
  answers: Array<TAnswer>
}


const ActiveQuiz = (props: TProps) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>
            2.
          </strong>&nbsp;
          Как дела?
        </span>
        <small> 4 из 15 </small>
      </p>
      <AnswersList
        answers={props.answers}
      />
    </div>
  )
}


export default ActiveQuiz