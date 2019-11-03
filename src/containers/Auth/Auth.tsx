import React, {useState} from 'react'
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";


type Tvalidation = {
  required?: boolean
  email?: string
  minLength?: number
}

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

type Tprops = {
  auth: (email: string, password: string, isLogin: boolean) => void
}

const Auth: React.FC<Tprops> = (props: Tprops) => {
  
  const [isFormValid, setisFormValid] = useState(false)
  const [formControls, setformControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      errorMessage: 'Введите корректный email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      errorMessage: 'Введите корректный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  })
  
  const validateControl = (value: string, validation: Tvalidation) => {
    if (!validation) {
      return true
    }
    let isValid = true
    
    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }
    
    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }
    
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }
    
    return isValid
  }
  
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: string) => {
    const formControlz = {...formControls}
    // @ts-ignore
    const control = { ...formControlz[controlName]}
    control.value = event.target.value
    control.touched = true
    control.valid = validateControl(control.value, control.validation)
    // @ts-ignore
    formControlz[controlName] = control
    let isFormValid = true
    Object.keys(formControlz).forEach((name) => {
      // @ts-ignore
      isFormValid = formControlz[name].valid && isFormValid
    })
    
    setformControls(formControlz)
    setisFormValid(isFormValid)
  }
  
  const loginHandler = () => {
    props.auth(
      formControls.email.value,
      formControls.password.value,
      true
    )
  }
  
  const registerHandler = () => {
    props.auth(
      formControls.email.value,
      formControls.password.value,
      false
    )
    
  }
  
  const submitHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault()
  }
  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, index: string | number) => {
      let control: any;
      // @ts-ignore
      control = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => {onChangeHandler(event, controlName)}}
        />
      )
    })
  }
  
  return (
    <div className={classes.Auth}>
      <div>
        <h1> Авторизация </h1>
        <form onSubmit={submitHandler} className={classes.AuthForm}>
          {
            renderInputs()
          }
          <div>
            <Button
              type="success"
              onClick={loginHandler}
              disabled={!isFormValid}
            > Войти
            </Button>
            <Button
              type="primary"
              onClick={registerHandler}
              disabled={!isFormValid}
            > Зарегистрироваться
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    auth: (email: string, password: string, isLogin: boolean) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)
