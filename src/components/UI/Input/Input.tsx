import React from 'react'
import classes from './Input.module.css'
//todo fix ts-ignors

type TProps = {
  type?: string
  label?: string
  value?: any
  onChange?: (arg0: any) => void
  errorMessage?: string
  valid?: boolean
  touched?: boolean
  shouldValidate?: boolean
  key?: any
}

// universal input for this app
const Input:React.FC<TProps> = (props: TProps) => {
  const cls = [classes.Input]
  const inputType = props.type || 'text'
  const htmlFor = `${inputType}-${Math.random()}`
  const isInvalid = ({valid, touched, shouldValidate}: string & number & boolean ) => {
    return !valid && shouldValidate && touched
  }
  //todo props??
  // @ts-ignore
  if (isInvalid(props)) {
    cls.push(classes.invalid)
  }
  
  
  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}> {props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {
        // @ts-ignore
        isInvalid(props) ?
          <span>{props.errorMessage || 'Введите верное значение'}</span>
          :
          null
      }
    </div>
  )
}

export default Input
