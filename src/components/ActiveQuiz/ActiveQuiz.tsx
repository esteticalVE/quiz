import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList';


type Tanswer = {
  text: string
  id: number
}

type Tprops = {
  answers: Tanswer[]
  question: string
  onAnswerClick: Function
  quizLength: number,
  answerNumber: number
  state: string | null | never[]
}


const ActiveQuiz: React.FC<Tprops> = (props: Tprops) => {
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
        state={props.state}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  )
}


export default ActiveQuiz