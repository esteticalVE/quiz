import React from 'react'
import classes from './Drawer.module.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

type Tprops = {
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
}

const Drawer: React.FC<Tprops> = (props: Tprops) => {
  const cls = [classes.Drawer]
  
  if (!props.isOpen) {
    cls.push(classes.close)
  }
  
  const clickHandler = () => {
    props.onClose()
  }
  
  const renderLinks = (links: {to: string, label: string, exact?: boolean}[] ) => {
    return links.map((link: {to: string, label: string, exact?: boolean}, index: number) => {
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
  
  const links = [{to: '/', label: 'Список', exact: true},]
  
  if (props.isAuthenticated) {
    links.push( {to: '/quiz-creator', label: 'Создать тест', exact: false})
    links.push( {to: '/logout', label: 'Выход', exact: false})
  } else {
    links.push({to: '/auth', label: 'Авторизация', exact: false},)
  }
  
  return (
    <>
      <nav className={cls.join(' ')}>
        <ul>
          {renderLinks(links)}
        </ul>
      </nav>
      { props.isOpen ? <Backdrop onClick={props.onClose}/> : null }
    </>
  )
}

export default Drawer