import React from 'react'
import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const links = [
  {
    to: '/',
    label: 'Список',
    exact: true
  },
  {
    to: '/auth',
    label: 'Авторизация',
    exact: false
  },
  {
    to: '/quiz-creator',
    label: 'Создать тест',
    exact: false
  },
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
  
  const clickHandler = () => {
    props.onClose()
  }
  
  const renderLinks = () => {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={clickHandler}
          > {link.label} </NavLink>
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