import React, {useEffect} from 'react'
import {logout} from "../../store/actions/auth";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'

type Tprops = {
  logout: () => void
}

const Logout: React.FC<Tprops> = (props: Tprops) => {
  
  useEffect(() => {
    props.logout()
  })
  return (
    <Redirect to={'/'}/>
  )
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)