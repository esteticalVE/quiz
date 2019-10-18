import React, {Component, useState} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

const Quiz: React.FC = () => {
  
  const [quiz, setQuiz] = useState([
    {
      question: 'Какого цвета небо?',
      rightAnswerId: 2,
      answers: [
        {text: 'Черного', id: 1},
        {text: 'Синего', id: 2},
        {text: 'Красного', id: 3},
        {text: 'Зеленого', id: 4}
      ]
    }
  
  ])
  const onAnswerClickHandler = (answerId: number | string) => {
    console.log(answerId)
  }
  
  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1> Ответьте на все вопросы </h1>
        <ActiveQuiz
          answers={quiz[0].answers}
          question={quiz[0].question}
          onAnswerClick={onAnswerClickHandler}
        />
      </div>
    </div>
  )
}

export default Quiz