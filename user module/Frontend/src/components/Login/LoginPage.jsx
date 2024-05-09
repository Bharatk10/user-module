import React from 'react'
import {CompanyDetails} from './CompanyDetails.jsx'
import {UserLogin} from './UserLogin.jsx'
import './loginPage.css'

export  const LoginPage = () => {
  return (
    <div>
      <div className="login-container ">
            <div className="left-half">
                
                <CompanyDetails />
            </div>
            <div className="right-half vh-100">
               
                <UserLogin />
            </div>
        </div>
    </div>
  )
}


