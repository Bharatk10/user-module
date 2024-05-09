import React from 'react'
import { Home } from '../components/Home/components/Home'
import { Contact } from '../components/Home/components/Contact'
import { Supplier_Client } from '../components/pages/Supplier_Client'
import { AddSupplier } from '../components/pages/supplier/AddSupplier'
import { AddClient } from '../components/pages/client/AddClient'
import Employee from '../components/pages/employee/Employee'
import { CreateUser } from '../components/User/CreateUser'
import { EditUser } from '../components/User/EditUser'
import { Services } from '../components/Home/components/Services'
import { About } from '../components/Home/components/About'
import { PageNotFound } from '../components/pages/PageNotFound'
import { ChangePassword } from '../components/Login/ChangePassword'
import EmployeeCard from '../components/pages/employee/EmployeeCard'
import { Outlet, Route, Routes } from 'react-router-dom'


const DashBoardRoutes = () => {
  return (
    <div>
       <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path="/contact" element={<Contact />} ></Route>
              <Route path='/supplier-client' element={<Supplier_Client />}></Route>
              <Route path='/add-supplier' element={<AddSupplier  />}></Route>
              <Route path='/add-client' element={<AddClient />}></Route>
              <Route path='/employee' element={<Employee />}></Route>
              <Route path="/create-user" element={<CreateUser />} />
              <Route path= "/edit-employee/:id" element = {<EditUser/>}/>
              <Route path="/service" element={<Services />} ></Route>
              <Route path="/user-profile" element={<About />} ></Route>
              <Route path='*' element={<PageNotFound />} />
              <Route path="/update-password" element={<ChangePassword/>} />
              <Route path="/view-employee/:id" element = {<EmployeeCard/>}/>
            </Routes>
            <Outlet />
    </div>
  )
}

export default DashBoardRoutes
