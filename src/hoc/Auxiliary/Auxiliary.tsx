import React from 'react'
import {ReactChildren} from "react";
type AuxProps = {
  children: JSX.Element[] | JSX.Element | React.ReactNode
}

const Auxiliary: React.FC<AuxProps> = props => <>{props.children} </>

export default Auxiliary