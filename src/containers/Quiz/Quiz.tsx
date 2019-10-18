import React, {Component, useState} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

const Quiz: React.FC = () => {
  
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [quiz, setQuiz] = useState([
    {
      question: 'Какого цвета небо?',
      rightAnswerId: 2,
      id: 1,
      answers: [
        {text: 'Черного', id: 1},
        {text: 'Синего', id: 2},
        {text: 'Красного', id: 3},
        {text: 'Зеленого', id: 4}
      ]
    },
    {
      question: 'В каком году основали Санкт-Петербург',
      rightAnswerId: 3,
      id: 2,
      answers: [
        {text: '1700', id: 1},
        {text: '1702', id: 2},
        {text: '1703', id: 3},
        {text: '1803', id: 4}
      ]
    }
  
  ])
  const onAnswerClickHandler = (answerId: number | string) => {
    setActiveQuestion(activeQuestion + 1)
  }
  
  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1> Ответьте на все вопросы </h1>
        <ActiveQuiz
          answers={quiz[activeQuestion].answers}
          question={quiz[activeQuestion].question}
          onAnswerClick={onAnswerClickHandler}
          quizLength={quiz.length}
          answerNumber={activeQuestion + 1}
        />
      </div>
    </div>
  )
}

export default Quiz