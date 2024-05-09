import React, { useState } from 'react'
import { useEffect } from 'react';
import { UserService } from '../../../services/UserService';
import EmployeeData from './EmployeeData';



const Employee = () => {

    const [users,setUsers] = useState([]);
    
    const [filteredUsers,setFilteredUsers] = useState([]);

    useEffect(() => {
        let fetchUsers = async () => {
            const allUsers = await UserService.fetchUsers();
            setUsers(allUsers);
            setFilteredUsers(allUsers)
        };
        fetchUsers()
    }, [])

    console.log(users);

    const fetchAllUsers = () =>{
        setFilteredUsers(users);
    }

    const fetchActiveEmployees = () => {
      const activeUsers = users.filter(user => !user.isActive);
      setFilteredUsers(activeUsers);
    };
  
    const fetchInactiveEmployees = () => {
      const inactiveUsers = users.filter(user => user.isActive);
      setFilteredUsers(inactiveUsers);
    };
  
    const fetchInternalEmployees = () => {
      const internalUsers = users.filter(user => user.roleName !== 'External Employee');
      setFilteredUsers(internalUsers);
    };
    const fetchExternalEmployees = () => {
      const externalUsers = users.filter(user => user.roleName === 'External Employee');
      setFilteredUsers(externalUsers);
    };

    
  return (
    <div className='mx-2'>
      <div className='d-flex fs-2 mx-1 mt-2'>
            <button  type="button" style={{background: 'linear-gradient(45deg, #77d1e1, #3c3c3d)'}} className="btn btn-success fw-medium px-3" onClick={fetchAllUsers}>All Employees</button>
            &nbsp;&nbsp;
            <button  type="button" style={{background: 'linear-gradient(45deg, #77d1e1, #3c3c3d)'}} className="btn btn-success fw-medium px-4" onClick={fetchActiveEmployees}>Active employees</button>
            &nbsp;&nbsp;
            <button  type="button" style={{background: 'linear-gradient(45deg, #77d1e1, #3c3c3d)'}} className="btn btn-success fw-medium px-4" onClick={fetchInactiveEmployees}>InActive employees</button>
            &nbsp;&nbsp;
            <button  type="button" style={{background: 'linear-gradient(45deg, #77d1e1, #3c3c3d)'}} className="btn btn-success fw-medium px-4" onClick={fetchInternalEmployees}>Internal employees</button>
            &nbsp;&nbsp;
            <button  type="button" style={{background: 'linear-gradient(45deg, #77d1e1, #3c3c3d)'}} className="btn btn-success fw-medium px-4" onClick={fetchExternalEmployees}>External employees</button>
        </div>
        <EmployeeData users={filteredUsers} />
    </div>
  )
}

export default Employee
