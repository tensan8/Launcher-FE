import backArrow from '../../images/back_arrow.svg'
import { To, useNavigate } from 'react-router-dom'
import * as React from 'react'

function BackButton (props: { backPath: To | any }): JSX.Element {
  const navigate = useNavigate()

  const handleBack = React.useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    navigate(props.backPath)
  }, [navigate, props.backPath])

  return (
    <img src={backArrow} alt="Back Arrow" className="h-7 cursor-pointer" onClick={handleBack}/>
  )
}

export default BackButton
