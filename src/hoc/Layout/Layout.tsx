import React, {Component} from 'react'
import classes from './Layout.module.css'


const Layout = (props: { children: React.ReactNode; }) => {
  return (
    <div className={classes.Layout}>
      <main>
        { props.children }
      </main>
    </div>
  )
}

export default Layout