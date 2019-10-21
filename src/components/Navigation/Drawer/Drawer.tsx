import React from 'react'
import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";

// todo routing

const links = [
  1, 2, 3
]

type TProps = {
  isOpen: boolean
  onClose: () => void
}


const Drawer: React.FC<TProps> = (props: TProps) => {
  
  const cls = [classes.Drawer]
  if (!props.isOpen) {
    cls.push(classes.close)
  }
  const renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a> Link: {link} </a>
        </li>
      )
    })
  }
  
  return (
    <>
    <nav className={cls.join(' ')}>
      <ul>
        {
          renderLinks()
        }
      </ul>
    </nav>
      { props.isOpen ? <Backdrop onClick={props.onClose}/> : null }
      </>
  )
}

export default Drawer