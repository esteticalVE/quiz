import React, {useState} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

const Quiz: React.FC = (props) => {
  const [results, setResults] = useState<any>({})
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [answerState, setAnswerState] = useState<any>(null)
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
    const question = quiz[activeQuestion]
    const Qresults = results
    if (question.rightAnswerId === answerId) {
      if (!Qresults[question.id]) {
        Qresults[question.id] = 'success'
      }
      setResults(Qresults)
      setAnswerState({[answerId]: 'success'})
      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          setIsFinished(true)
        } else {
          setActiveQuestion(activeQuestion + 1)
          setAnswerState(null)
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      Qresults[question.id] = 'error'
      setAnswerState({[answerId]: 'error'})
      setResults(Qresults)
    }
  }
  
  const retryHandler = () => {
    setActiveQuestion(0)
    setAnswerState(null)
    setIsFinished(false)
    setResults({})
  }
  function isQuizFinished() {
    return activeQuestion + 1 === quiz.length
  }
  
  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1> Ответьте на все вопросы </h1>
        
        {
          isFinished ?
            <FinishedQuiz
            results={results}
            quiz={quiz}
            onRetry={retryHandler}
            />
            :
            <ActiveQuiz
              answers={quiz[activeQuestion].answers}
              question={quiz[activeQuestion].question}
              onAnswerClick={onAnswerClickHandler}
              quizLength={quiz.length}
              answerNumber={activeQuestion + 1}
              state={answerState}
            />
        }
      </div>
    </div>
  )
}

export default Quiz