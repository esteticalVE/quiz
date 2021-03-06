import React from 'react'
import classes from './AnswerItem.module.css'

type Tprops = {
  state: string | null,
  onAnswerClick: Function,
  answer: {
    text: string
    id: number
  }
}

const AnswerItem: React.FC<Tprops> = (props: Tprops) => {
  const cls = [classes.AnswerItem]
  
  if (props.state) {
    cls.push(classes[props.state])
  }
  
  return (
    <li className={cls.join(' ')}
    onClick={() => props.onAnswerClick(props.answer.id)}
    >
      { props.answer.text }
    </li>
  )
}

export default AnswerItem