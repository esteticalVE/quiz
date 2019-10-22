import React from 'react'
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";

const Auth:React.FC = () => {
  
  const loginHandler = () => {
  }
  const registerHandler = () => {
  }
  const submitHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    
  }
  
  return (
    <div className={classes.Auth}>
      <div>
        <h1> Авторизация </h1>
        <form onSubmit={submitHandler} className={classes.AuthForm}>
          <input type="text"/>
          <input type="text"/>
          <div>
            <Button
              type="success"
              onClick={loginHandler}
            > Войти
            </Button>
            <Button
              type="primary"
              onClick={registerHandler}
            > Зарегистрироваться
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Auth
