import React, {SyntheticEvent, useState} from 'react'
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import {createControl} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";


function createOptionControl(number: number) {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number
  }, {
    required: true
  })
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {
      required: true
    }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

const QuizCreator: React.FC = () => {
  
  const [quiz, setQuiz] = useState([])
  const [formControls, setformControls] = useState(createFormControls())
  
  
  const changeHandler = (value: any, controlName: string) => {
  }
  
  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      // @ts-ignore
      const control = formControls[controlName]
      return (
        <Auxiliary key={index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            key={index}
            // to boolean
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </Auxiliary>
      )
    })
  }
  
  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault()
  }
  const addQuestionHandler = () => {
  
  }
  
  const createQuizHandler = () => {
  }
  
  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>
        
        <form onSubmit={submitHandler}>
          
          {
            renderControls()
          }
          
          <select></select>
          <Button
            type="primary"
            onClick={addQuestionHandler}
          >
            Добавить вопрос
          </Button>
          <Button
            type="success"
            onClick={createQuizHandler}
          >
            Создать тест
          </Button>
        </form>
      
      </div>
    </div>
  )
}

export default QuizCreator
