import React, {Component, useState} from 'react'
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";

const Layout = (props: { children: React.ReactNode; }) => {
  const [menu, setMenu] = useState(false)
  const toggleMenuHandler = () => {
    setMenu(!menu)
  }
  
  return (
    <div className={classes.Layout}>
      <MenuToggle onToggle={toggleMenuHandler}
                  isOpen={menu}
      />
      
      <main>
        { props.children }
      </main>
    </div>
  )
}

export default Layout