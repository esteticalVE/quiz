import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList';

//todo номер вопроса и кол-во всех вопросов
type TAnswer = {
  text: string
  id: number
}

type TProps = {
  answers: Array<TAnswer>
  question: string
  onAnswerClick: Function
  quizLength: number,
  answerNumber: number
}


const ActiveQuiz = (props: TProps) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>
            {props.answerNumber}.
          </strong>&nbsp;
          {props.question}
        </span>
        <small> {props.answerNumber} из {props.quizLength} </small>
      </p>
      <AnswersList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  )
}


export default ActiveQuiz