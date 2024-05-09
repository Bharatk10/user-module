import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import './header.css'

export const Header = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleLogOut = () => {
    if (window.confirm("Do you want to logout? ")) {
      localStorage.clear()
      navigate('/login')


    }



  }

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    setUserData(storedUserData);
  }, []);
  return (
    <header className='sticky-top'>
      <nav className="bg-light">
        <div className='d-flex justify-content-between border-bottom py-3x'>
          <Link to="/" className="d-flex items-center mx-3 text-decoration-none">
            <img src="/assets/logo.png" className="mx-3 h-10" alt="CodeBook Logo" width={'150'} />
          </Link>
          <div className="me-4 d-flex justify-content-end">
            <div className='dropdown'>
              <span className='dropbtn mb-2'>
                {userData && <img src={` data:image/png;base64,${userData.image}`} width={50} className=' my-1 rounded-circle shadow-lg float-end me-2' />}
              </span>
              <div class="dropdown-content mt-5">
                <Link to="/update-password">
                  Change Password
                </Link>

              </div>

            </div>
            <div className=''>
              <div className='fs-5 fw-bold' style={{ marginBottom: '-5px' }}>{userData != null ? <div>{userData.firstName} {userData.lastName}</div> : null}</div>
              <div className='fs-5 fw-bold'>{userData != null ? userData.designation : null}</div>
            </div>
            <div className='my-auto ms-4 text-danger' onClick={handleLogOut} style={{ cursor: 'pointer' }}><i class="bi bi-box-arrow-right fs-3"></i></div>
          </div>
        </div>
      </nav>
    </header>
  )
}