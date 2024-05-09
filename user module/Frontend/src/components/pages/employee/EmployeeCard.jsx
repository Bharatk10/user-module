import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserService } from '../../../services/UserService';

const EmployeeCard = () => { 

  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const [employee, setEmployee] = useState(null); 
   const [image,setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.fetchUser(id);

        setEmployee(response);
        console.log(response.image)
        setImage(response.image);

      } catch (error) {
        toast.error('Failed to fetch user data');
      }
    };

    fetchData();
  }, [id]);

  const handleReset = () => {
    navigate(-1); 
  };

  return (
    <div>
      <button className='btn btn-danger mx-4 mt-2' onClick={handleReset}>Back</button>
      <div className="w-75 mx-auto bg-dark-subtle d-flex m-5 p-5">
       
        {employee?.image && ( 
          <div className='w-50 h-100'>
          {
            image !== null ? (
              <img height={230} width={230} src={`data:image/png;base64,${employee.image}`} alt="Employee Photo" />
            ) : (
                <img height={230} width={230} src="https://e7.pngegg.com/pngimages/627/693/png-clipart-computer-icons-user-user-icon-face-monochrome-thumbnail.png" alt="" />
              
            )
          }
        </div>
        )}

        
        {employee && (
          <div>
            <table className="table table-striped-columns table-hover my-3 w-75">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{employee.firstName} {employee.lastName}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{employee.email}</td>
                </tr>
                <tr>
                  <td>Designation</td>
                  <td>{employee.designation}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{!employee.accountLock ? 'Active' : 'Inactive'}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>{employee.roleName}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
