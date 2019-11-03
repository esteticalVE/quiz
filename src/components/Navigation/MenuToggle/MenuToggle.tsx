import React from "react";
import classes from './MenuToggle.module.css'

type Tprops = {
  onToggle: () => void
  isOpen: boolean
}


const MenuToggle: React.FC<Tprops> = (props: Tprops) => {
  const cls = [
    classes.MenuToggle,
    'fa',
  ]
  
  if (props.isOpen) {
    cls.push('fa-times')
    cls.push(classes.open)
  } else {
    cls.push('fa-bars')
  }
  
  return (
    <i
    className={cls.join(' ')}
    onClick={props.onToggle}
    />
  )
}

export default MenuToggle