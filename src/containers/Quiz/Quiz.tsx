import React, {useEffect, useState} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";
//todo refactoring
//todo awesome styles for background
type Tprops = {
  match: {
    isExact?: boolean
    params: {
      id: string
    }
    path?: string
    url?: string
  }
}

const Quiz: React.FC<Tprops> = (props: Tprops) => {
  const [results, setResults] = useState<any>({})
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [answerState, setAnswerState] = useState<any>(null)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [quiz, setQuiz] = useState<any>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/quizes/${props.match.params.id}.json`)
        console.log('response data',response.data)
        const quizData = response.data
        setQuiz(quizData)
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])
  
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
          loading ?
            <Loader /> :
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