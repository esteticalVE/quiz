import React, {useState} from 'react'
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import {connect} from "react-redux";

type Tprops = {
  children: React.ReactNode
  isAuthenticated: boolean
}

const Layout: React.FC<Tprops> = (props: Tprops) => {
  const [menu, setMenu] = useState(false)
  const toggleMenuHandler = () => {
    setMenu(!menu)
  }
  const menuCloseHandler = () => {
    setMenu(false)
  }
  
  return (
    <div className={classes.Layout}>
      <Drawer
        isOpen={menu}
        onClose={menuCloseHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <MenuToggle
        onToggle={toggleMenuHandler}
        isOpen={menu}
      />
      
      <main>
        { props.children }
      </main>
    </div>
  )
}
const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout)