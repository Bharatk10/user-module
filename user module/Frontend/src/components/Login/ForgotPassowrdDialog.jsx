import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { toast } from "react-toastify";
import { loginService } from '../../services/loginService';
import { Link } from 'react-router-dom';

function ForgotPasswordDialog({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isEmailValid,setIsEmailValid] = useState(false);

  const checkEmail = () => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setIsEmailError(true)
    } else {
      setIsEmailError(false)
      validateEmail(email);
    }
  };

  const validateEmail = async (email) => {
    try {
      const data = await loginService.validateEmail(email);
      console.log(data);
    
    } catch (error) {
  
      if (error.response) {
        if (error.response.status === 400) {
         setIsEmailValid(true);
          toast.error('Email Id not registered with us');
        }
      } else if (error.request) {
        toast.error('Server error. Please try again later.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginService.forgotPassword(email);
      toast.success('Temporary password sent successsfully')
      onClose()
    } catch (error) {
      if(error.response.status === 423){
        toast.error('Account is on locked. PLease contact admin !')
      }else{
       toast.error('Temporary password sent failed')
      }
    }
    
    setEmail('')
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Forgot Password</DialogTitle>
      <DialogContent sx={{ paddingTop: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
            onBlur={checkEmail}
          />
             {isEmailError && <div className="text-danger my-2">Please enter a valid email address.</div>}
              { isEmailValid && <Link to="/create-user" className='text-danger my-4 text-decoration-none'>Sign Up</Link> }
            
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ForgotPasswordDialog;
