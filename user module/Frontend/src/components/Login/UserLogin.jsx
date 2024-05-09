import React, { useRef, useState } from 'react';
import './loginPage.css';
import { loginService } from '../../services/loginService';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ForgotPasswordDialog from './ForgotPassowrdDialog.jsx'

export const UserLogin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const validateEmail = async (email) => {
    try {
      console.log(email);
       await loginService.validateEmail(email);
     
      setIsEmailValid(true);
    } catch (error) {
      setIsEmailValid(false);
      if (error.response) {
        if (error.response.status === 400) {
          toast.error('Invalid email address');
        }
      } else if (error.request) {
        toast.error('Server error. Please try again later.');
      }
    }
  };

  const checkEmail = () => {
    let email = emailRef.current.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setIsEmailError(true)
      toast.error('Not a valid email address');
    } else {
      setIsEmailError(false)
      validateEmail(email);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let email = emailRef.current.value.trim();
    let password = passwordRef.current.value.trim();

    const loginDto = {
      email: email,
      password: password
    };

    try {
      const userData = await loginService.proceedLogin(loginDto);

      localStorage.setItem('userData', JSON.stringify(userData));

      console.log('svaing data completed')
            
        if (userData.logInStatus === '0') {
          navigate('/update-password');
        } else {
          
          navigate('/');
        }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 423) {
          toast.error('Account is on locked Please contact Admin');
          return
        }
        else if(error.response.status === 400){
          const attempts = 3 - error.response.data.attempts;
          if(attempts === 0){
            toast.error('Account is on locked Please contact Admin');
            return
          }
          if(attempts>1){
            toast.error(`invalid password ${attempts} more attempts available`);
            return
          }
          toast.error(`invalid password ${attempts} more attempt available`);
          return
        }
         else {
          toast.error('Server error. Please try again later.');
        }
      }
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  

  return (
    <div className='container p-5 vh-100'>
      <div>
        <img src="/assets/logo.png" width={200} alt="Logo" />
        <h4 className='my-5'>Empowering Your Workforce, One Click at a Time</h4>
        <div className='w-75'>
          <form className='my-4' onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label fs-4">Email</label>
            <div className="input-group mb-3 w-100 border-bottom border-dark">
              <span className="input-group-text border-0 fs-4">
                <i className="bi bi-envelope border-0"></i>
              </span>
              <input type="email" className="border-0 w-75" id='email' placeholder='Enter email address' ref={emailRef} onBlur={checkEmail} required />
            </div>
            {isEmailError && <div className="text-danger my-2">Please enter a valid email address.</div>}
            <label htmlFor="password" className="form-label fs-4">Password</label>
            <div className="input-group mb-3 border-bottom border-dark w-100">
              <span className="input-group-text border-0 fs-4">
                <i className="bi bi-lock"></i>
              </span>
              <input type="password" className="border-0 w-75" id='password' placeholder='Enter password' ref={passwordRef} disabled={!isEmailValid} />
            </div>
            <div>
              <div className='d-flex justify-content-between ' style={{cursor:'pointer'}}>
               
                <div className='text-primary my-4 text-decoration-none' onClick={openDialog}>Forgot Password</div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={!isEmailValid}>Submit</button>
          </form>
        </div>
      </div>
      
      <ForgotPasswordDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
};
