import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../services/loginService';

export const ChangePassword = () => {
    const navigate = useNavigate();

    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState({});

    const checkPassword = () => {
        let password = newPasswordRef.current.value.trim();
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        let errors = {};

        if (!passwordRegex.test(password)) {
            errors.general = true;
            if (!/(?=.*[a-z])/.test(password)) errors.lowercase = true;
            if (!/(?=.*[A-Z])/.test(password)) errors.uppercase = true;
            if (!/(?=.*\d)/.test(password)) errors.digit = true;
            if (!/(?=.*[@$!%*?&])/.test(password)) errors.specialChar = true;
        }

        setIsPasswordError(errors);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPassword = newPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password don't match");
            return;
        }

        setIsSubmitting(true);

        const userDataString = localStorage.getItem('userData');
        if (!userDataString) {
            throw new Error('User data not found in session storage');
        }
        const userData = JSON.parse(userDataString);

        const email = userData.email;

        let password = newPasswordRef.current.value.trim();

        const loginDto = {
            email: email,
            password: password
        }

        try {
            await loginService.changePassword(loginDto)
            toast.success('Password updation Success')
            navigate('/login')
        } catch (error) {
            toast.error('Failed to change password. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () =>{
        navigate(-1);
    }

    return (
        <div className="container">
             <button className='btn btn-danger mx-4 mt-2' onClick={handleReset}>Back</button>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Change Password</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="newPassword"
                                        ref={newPasswordRef}
                                        onBlur={checkPassword}
                                        required
                                    />
                                    {isPasswordError.lowercase && (
                                        <div className="text-danger">Password must contain at least one lowercase letter.</div>
                                    )}
                                    {isPasswordError.uppercase && (
                                        <div className="text-danger">Password must contain at least one uppercase letter.</div>
                                    )}
                                    {isPasswordError.digit && (
                                        <div className="text-danger">Password must contain at least one digit.</div>
                                    )}
                                    {isPasswordError.specialChar && (
                                        <div className="text-danger">Password must contain at least one special character.</div>
                                    )}
                                    
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        ref={confirmPasswordRef}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Change Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

