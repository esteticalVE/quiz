import React from "react";
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'

type Tanswers = {
  text?: string
  id?: number
}

type Tquestion = {
  answers?: Array<Tanswers>
  id: number
  question: string
  rightAnswerId: number
}

//todo type for results
type Tprops = {
  results?: any
  quiz?: Array<Tquestion>
  onRetry?: () => void
}

const FinishedQuiz = (props: Tprops) => {
  console.log( 'my results: ',props.results)
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }
    return total
  }, 0)
  console.log('finished quiz', props)
  
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz!.map((quizItem: Tquestion, index: number ) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            classes[props.results[quizItem.id]]
          ]
          
          return (
            <li
            key={index}>
              <strong>
                {index + 1}
              </strong>.&nbsp;
              {quizItem.question}
              <i className={cls.join(' ')}/>
            </li>
          )
        })}
      </ul>
      <p>
        
        Правильно {successCount} из {props.quiz!.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary"> Повторить </Button>
        <Button type="success"> Перейти в список тестов </Button>
      </div>
    </div>
  )
}

export default FinishedQuiz