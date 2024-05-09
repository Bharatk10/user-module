import './App.css';

import { Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { Header } from './components/shared/Header.jsx';
import { AllRoutes } from './routes/AllRoutes.jsx';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SideBar } from './components/Home/components/SideBar.jsx';
import { Home } from './components/Home/components/Home.jsx';
import { Contact } from './components/Home/components/Contact.jsx';
import { Services } from './components/Home/components/Services.jsx';
import { About } from './components/Home/components/About.jsx';
import { PageNotFound } from './components/pages/PageNotFound.jsx';
import { Supplier_Client } from './components/pages/Supplier_Client.jsx';
import Employee from './components/pages/employee/Employee.jsx';
import { CreateUser } from './components/User/CreateUser.jsx';
import { AddSupplier } from './components/pages/supplier/AddSupplier.jsx';
import { AddClient } from './components/pages/client/AddClient.jsx';
import { toast } from 'react-toastify';
import {EditUser} from "./components/User/EditUser.jsx"
import {ChangePassword} from './components/Login/ChangePassword.jsx'
import EmployeeCard from './components/pages/employee/EmployeeCard.jsx';
import DashBoardRoutes from './routes/DashBoardRoutes.jsx';

function App() {
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {

    const userData = localStorage.getItem('userData');
    if (!userData) {
      if (location.pathname !== '/login') {
        toast.error('Please Login')
        navigate("/login")
      }

    }
    if(userData!==null){
      if (userData.role !== 'Admin') {
        if (location.pathname === '/employee' || location.pathname === '/create-user') {
          toast.warn(`You don't have access.\n Please Contact Admin`);
          navigate('/')
        }
      }
    }

  }, []);

  let [slideRes, setSlideRes] = useState('16.4fr')
  let handleResponse = () => {
    console.log("home page " + slideRes)
    if (slideRes === '79.5fr') {
      setSlideRes('16.4fr')
    } else {
      setSlideRes('79.5fr')
    }
  }

  return (
    <div >
      {location.pathname !== '/login' && <Header />}

      <AllRoutes />

      {
        location.pathname !== '/login' &&
        <div className='w-100' style={{ display: 'grid', gridTemplateColumns: `4fr ${slideRes}` }}>
          <div>
            <SideBar handleResponse={handleResponse} />
          </div>
          <div className='w-100'>
           <DashBoardRoutes/>
          </div>
        </div>
      }

     
    </div>
  );
}

export default App;