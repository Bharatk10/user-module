// AllRoutes.jsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../components/Login/LoginPage.jsx';



export const AllRoutes = ({ isLoggedIn }) => {
  return (
    <Routes>
     
          <Route path="/login" element={<LoginPage />} />
       
          
    </Routes>
  );
};
