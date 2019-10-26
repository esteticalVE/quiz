import React from 'react'
import classes from './Select.module.css'

type Toption = {
  text: string
  value: number
}

type Tprops = {
  label: string
  value: number
  onChange: (event:React.ChangeEvent<HTMLSelectElement>) => void
  options: Array<Toption>
}

const Select: React.FC<Tprops> = (props) => {
  const htmlFor = `${props.label}-${Math.random()}`
  
  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>
        {props.label}
      </label>
        <select
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        >
          { props.options.map((option: any, index: number) => {
            return (
              <option
                value={option.value}
                key={option.value + index}
              >
                {option.text}
              </option>
            )
          
          })}
        </select>
      
    </div>
   
    
    
  )
}

export default Select
