import React from 'react'

type AuxProps = {
  children: JSX.Element[] | JSX.Element | React.ReactNode
}

const Auxiliary: React.FC<AuxProps> = props => <>{props.children} </>

export default Auxiliary