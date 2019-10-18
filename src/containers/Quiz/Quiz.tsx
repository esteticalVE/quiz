import React, {Component, useState} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

const Quiz = () => {
  
  const [quiz, setQuiz] = useState([
  
  ])
  
  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1> Quiz </h1>
        <ActiveQuiz />
      </div>
    </div>
  )
}

export default Quiz