import React, {useEffect, useState} from 'react'
import classes from './QuizList.module.css'
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import axios from 'axios'
import {Simulate} from "react-dom/test-utils";

const QuizList: React.FC = () => {
  
  const [loading, setLoading] = useState(true)
  const [quizes, setQuizes] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://react-ts-quiz.firebaseio.com/quizes.json')
        console.log(response.data)
        let Lquizes: any = []
        Object.keys(response.data).forEach((key, index) => {
          Lquizes.push({
            id: key,
            name: `Тест #${index + 1}`
          })
        })
        setQuizes(Lquizes)
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])
  
  const renderQuizes = () => {
    //todo type for quiz
    return quizes.map((quiz: any) => {
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
          loading ?
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

export default QuizList
