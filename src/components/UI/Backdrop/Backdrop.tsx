import React from "react";
import classes from './Backdrop.module.css'


const Backdrop = (props: any) => <div className={classes.Backdrop} onClick={props.onClick}/>

export default Backdrop