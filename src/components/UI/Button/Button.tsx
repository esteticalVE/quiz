import React from "react";
import classes from './Button.module.css'

type TProps = {
  children?: string
  onClick?: () => void
  disabled?: boolean
  type?: any
}

const Button = (props: TProps) => {
  const cls = [
    classes.Button,
    classes[props.type]
  ]
  
  return (
    <button
    onClick={props.onClick}
    className={cls.join(' ')}
    disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button
