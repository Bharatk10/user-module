import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Contact = () => {
  let navigate = useNavigate()
  useEffect(()=>{
    navigate("/employee")
  },[])
  return (
    <div>
      
    </div>
  )
}
