import React, { useEffect, useState } from 'react';
import { UserService } from '../../../services/UserService';
import { toast } from 'react-toastify';
import '../css/profile.css'
import { useNavigate } from 'react-router-dom';

export const About = () => {

  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();

  const changePassword = () =>{
    navigate('/update-password')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = localStorage.getItem('userData');
        const userObject = JSON.parse(userData);
        const responseData = await UserService.getEmployeeByEmail(userObject.email);
        setUserProfile(responseData);
      } catch (error) {
        toast.error('Failed to fetch user data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      
      <div className='w-75 mx-auto d-flex m-5 p-5 rounded-5 shadow' style={{backgroundImage :'linear-gradient(45deg, rgb(177, 183, 194), rgb(96, 255, 189))'}}>

        <div className=''>

          <div className='rounded-circle mx-5 py-auto'>

            {userProfile.image !== null ? (
              <img className='rounded-circle' height={200} width={200} src={`data:image/png;base64,${userProfile.image}`} alt="User" />
            ) : (
              <div className='rounded-circle'>
                <i className="bi bi-person-circle fs-5 mx-4"></i>
              </div>
            )}
          </div>
        </div>
        <div>
        <div className='rounded-3 p-3'>
          <table class="tb" style={{backgroundColor: 'transparent'}} className='fw-semibold bg-primary-subtle'>
            <tbody>
              <tr class='tr'>
                <td class='td'>First Name</td>
                <td class='td'>{userProfile.firstName} </td></tr>
                <tr class='tr'>
                  <td class='td'>Last Name</td>
                  <td class='td'>
                  {userProfile.lastName}
                  </td>
              </tr>
              <tr class='tr'>
                <td class='td'>Email</td>
                <td class='td'>{userProfile.email}</td>
              </tr>
              <tr class='tr'>
                <td class='td'>Designation</td>
                <td class='td'>{userProfile.designation}</td>
              </tr>
              <tr class='tr'>
                <td class='td'>Status</td>
                <td class='td'>{!userProfile.accountLock ? 'Active' : 'Inactive'}</td>
              </tr>
              <tr class='tr'>
                <td class='td'>Role</td>
                <td class='td'>{userProfile.roleName}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className='btn btn-danger float-end' onClick={changePassword}>Change Password</button>
        </div>
        
      </div>
     
    </div>
  );
}