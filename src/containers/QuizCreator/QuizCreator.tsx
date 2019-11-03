import React, {SyntheticEvent, useState} from 'react'
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";
import {TQuiz} from "../../types/componentTypes/quiz";

//todo fix ts ignore
const createOptionControl = (number: number) => {
  return createControl({
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    id: number
  }, {
    required: true
  })
}

const createFormControls = () => {
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

type Tprops = {
  createQuizQuestion: (arg0: any) => void
  finishCreateQuiz: () => void
  quiz: TQuiz[] | []
}

const QuizCreator: React.FC<Tprops> = (props: Tprops) => {
  const [isFormValid, setisFormValid] = useState(false)
  const [rightAnswerId, setrightAnswerId] = useState(1)
  const [formControls, setformControls] = useState(createFormControls())
  
  const changeHandler = (value: string | number, controlName: string) => {
    const formControlz = {...formControls}
    // @ts-ignore
    const control = {...formControlz[controlName]}
    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)
    // @ts-ignore
    formControlz[controlName] = control
    
    setformControls(formControlz)
    setisFormValid(validateForm(formControlz))
  }
  
  const selectChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event => changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr/> : null}
        </Auxiliary>
      )
    })
  }
  
  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault()
  }
  
  const addQuestionHandler = (event: SyntheticEvent) => {
    event.preventDefault()
    // destruct
    const {question, option1, option2, option3, option4} = formControls
    const questionItem = {
      question: question.value,
      id: props.quiz.length + 1,
      rightAnswerId: rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }
    //add quiz
    props.createQuizQuestion(questionItem)
    //reset state
    setisFormValid(false)
    setrightAnswerId(1)
    setformControls(createFormControls())
  }
  
  const createQuizHandler = (event: SyntheticEvent) => {
    event.preventDefault()
    setisFormValid(false)
    setrightAnswerId(1)
    setformControls(createFormControls())
    props.finishCreateQuiz()
    
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
            disabled={!isFormValid}
          >
            Добавить вопрос
          </Button>
          <Button
            type="success"
            onClick={createQuizHandler}
            disabled={props.quiz.length === 0}
          >
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    quiz: state.create.quiz
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    createQuizQuestion: (item: TQuiz) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
