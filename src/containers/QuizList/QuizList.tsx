import React, {useEffect, useState} from 'react'
import classes from './QuizList.module.css'
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from 'react-redux';
import {fetchQuizes} from "../../store/actions/quiz";
import {TQuizListProps, Tquiz} from '../../types/componentTypes/quizlist'


const QuizList: React.FC<TQuizListProps> = (props) => {
  useEffect(() => {
    props.fetchQuizes()
  }, [])
  
  const renderQuizes = () => {
    return props.quizes.map((quiz: Tquiz) => {
      return (
        <li
          key={quiz.id}
        >
          <NavLink to={`/quiz/${quiz.id}`}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }
  
  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        {
          props.loading && props.quizes.length !==0 ?
            <Loader/>
            :
            <ul>
              {renderQuizes()}
            </ul>
        }
      </div>
    </div>
  )
}


function mapStateToProps(state: {quiz: {quizes: Array<Tquiz>, loading: boolean} }) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
