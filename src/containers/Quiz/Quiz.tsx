import React, {useEffect} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";
import {TQuiz} from "../../types/componentTypes/quiz";

//todo awesome styles for background

type Tprops = {
  fetchQuizById: (arg0: string ) => void
  quizAnswerClick: (arg0: number) => void
  retryQuiz: () => void
  quiz: TQuiz[]
  results: {[x: string]: string} | {}
  loading?: boolean
  isFinished: boolean
  activeQuestion: number
  answerState: string | null | never[]
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
  useEffect(() => {
    props.fetchQuizById(props.match.params.id)
    props.retryQuiz()
  }, [])
  
  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1> Ответьте на все вопросы </h1>
        {
          props.loading || !props.quiz ?
            <Loader /> :
            props.isFinished ?
              <FinishedQuiz
                results={props.results}
                quiz={props.quiz}
                onRetry={props.retryQuiz}
              />
              :
              <ActiveQuiz
                answers={props.quiz[props.activeQuestion].answers}
                question={props.quiz[props.activeQuestion].question}
                onAnswerClick={props.quizAnswerClick}
                quizLength={props.quiz.length}
                answerNumber={props.activeQuestion + 1}
                state={props.answerState}
              />
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state: {quiz: {results: object, isFinished: boolean, activeQuestion: number, answerState: string | null | never[], quiz: TQuiz[], loading: boolean}}) => {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchQuizById: (id: string ) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId:  number) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)