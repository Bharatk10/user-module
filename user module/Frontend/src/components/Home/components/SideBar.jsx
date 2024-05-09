import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/sidebar.css';

export const SideBar = ({ handleResponse }) => {
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    setUserData(storedUserData);
    if (storedUserData && storedUserData.role === 'Admin') {
      setIsAdmin(true);
    }
  }, []);

  const handleLogOut = () => {
    let checkLogout = window.confirm("Do you want to logout? ")
    if (checkLogout) {
      navigate("/login")
      localStorage.clear();
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  const handleSidebar = () => {
    setIsOpen(!isOpen);
    handleResponse();
  };

  const sidebarStyle = {
    width: isOpen ? '250px' : '60px',
    transition: 'width 0.3s ease',
  };

  if (!userData) {
    return null; 
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} style={sidebarStyle}>
      <div className=''>
        {isOpen && userData && (
          <div className='d-inline'>
           {userData &&  <img
              src={`data:image/png;base64,${userData.image}`}
              className='mx-3 my-2 text-center rounded-circle shadow-lg'
              width={120}
              alt="User"
            />}
          </div>
        )}
        <button
          onClick={handleSidebar}
          className='float-end d-inline m-2 border-0 fs-4'
        >
          <i className='bi bi-list'></i>
        </button>
      </div>
      <div style={{ height: '66vh', overflow: 'visible' }}>
        <ul className='list-group bg-transparent w-100 mx-auto border-0'>
          {/* <NavLink to={'/'} className={'text-decoration-none cust border-0 h-100'}>
            <li className={`list-group-item list-group-item-action border-0 border-bottom bg-transparent my-2`}>
              <span className={`${!isOpen ? 'hide' : ''}`}>
                <i className='bi bi-house-fill fs-5 mx-0 me-4'></i>
              </span>
              {isOpen && <span className='w-75 fs-5'>Home</span>}
            </li>
          </NavLink> */}
          <NavLink to={'/user-profile'} className={'text-decoration-none cust border-0 h-100'}>
            <li className={`list-group-item list-group-item-action border-0 border-bottom bg-transparent my-2`}>
              <span className={`${!isOpen ? 'hide' : ''}`}>
                <i className='bi bi-person-vcard fs-5 mx-0 me-4'></i>
              </span>
              {isOpen && <span className='w-75 fs-5'>User Profile</span>}
            </li>
          </NavLink>
        
          {isAdmin && (
            <>
              <NavLink to={'/create-user'} className={'text-decoration-none cust border-0 h-100'}>
                <li className={`list-group-item list-group-item-action border-0 border-bottom bg-transparent my-2`}>
                  <span className={`${!isOpen ? 'hide' : ''}`}>
                    <i className='bi bi-database-add fs-5 mx-0 me-4'></i>
                  </span>
                  {isOpen && <span className='w-75 fs-5'>Add Employee</span>}
                </li>
              </NavLink>
              <NavLink to={'/employee'} className={'text-decoration-none cust border-0 h-100'}>
                <li className={`list-group-item list-group-item-action border-0 border-bottom bg-transparent my-2`}>
                  <span className={`${!isOpen ? 'hide' : ''}`}>
                    <i className='bi bi-database-check fs-5 mx-0 me-4'></i>
                  </span>
                  {isOpen && <span className='w-75 fs-5'>Employees</span>}
                </li>
              </NavLink>
            </>
          )}
          <NavLink to={'/supplier-client'} className={'text-decoration-none cust border-0 h-100'}>
            <li className={`list-group-item list-group-item-action border-0 border-bottom bg-transparent my-2`}>
              <span className={`${!isOpen ? 'hide' : ''}`}>
                <i className='bi bi-shop-window fs-5 mx-0 me-4'></i>
              </span>
              {isOpen && <span className='w-75 fs-5'>Supplier/Client</span>}
            </li>
          </NavLink>
        
          <li onClick={handleLogOut} className={`list-group-item list-group-item-action border-0 border-bottom bg-transparent my-1`}>
            <span className={`${!isOpen ? 'hide' : ''}`}>
              <i className="bi bi-box-arrow-right fs-5 mx-0 me-4"></i>
            </span>
            {isOpen && <span className='w-75 fs-5'>Log Out</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};
