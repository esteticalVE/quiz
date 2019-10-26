import React, {SelectHTMLAttributes, SyntheticEvent, useState} from 'react'
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import {createControl} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";


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
  const [rightAnswerId, setrightAnswerId] = useState(1)
  
  
  const changeHandler = (value: any, controlName: string) => {
    console.log('',value)
  }
  
  const selectChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(event.target.value)
    setrightAnswerId(+event.target.value)
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
  
  const select = <Select
    label="Выберите правильный ответ"
    value={rightAnswerId}
    onChange={selectChangeHandler}
    options={[
      {text: '1', value: 1},
      {text: '2', value: 2},
      {text: '3', value: 3},
      {text: '4', value: 4}
    ]}
  />
  
  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>Создание теста</h1>
        
        <form onSubmit={submitHandler}>
          {
            renderControls()
          }
          {
            select
          }
          
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
