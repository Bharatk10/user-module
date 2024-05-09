import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../../services/UserService';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 6;

const EmployeeData = ({ users,setUsers }) => {

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    setTotalPages(Math.ceil(users.length / ITEMS_PER_PAGE));
  }, [users]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getVisibleUsers = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, users.length);
    return users.slice(startIndex, endIndex);
  };

  const handleEdit = (userId) => {
    navigate(`/edit-employee/${userId}`);
  };

  const handleView = (userId) => {

    navigate(`/view-employee/${userId}`);
  }

  const handleDelete = async (userId) => {
    try {
        if (window.confirm('Are you sure you want to delete?')) {
            await UserService.deleteEmployeeById(userId);
            toast.success('Employee Deleted Successfully');
            navigate("/contact")
        } else {
           
            console.log('Deletion canceled by the user.');
        }
    } catch (err) {
        
        console.error('Employee Deletion Failed:', err.message);
        toast.error('Employee Deletion Failed');
    }
};




  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {currentPage > 1 && (
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                Previous
              </button>
            </li>
          )}
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          ))}
          {currentPage < totalPages && (
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  };

  return (
    <>

      {users.length > 0 ? (
        <div className='ms-2'>
          <div className=''>
            <h1 className='ms-2 mt-3 text-secondary'>Employee Data</h1>
          </div>
          <div>
            <div className='px-2'>
              <table className='table table-striped table-hover'>
                <thead className='table-light'>
                  <tr>
                    <th>Employee Name</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getVisibleUsers().map((user) => (
                    <tr key={user.userId}>
                      <td>{user.firstName}</td>
                      <td>{user.email}</td>
                      <td>{user.designation}</td>
                      <td>{user.roleName}</td>
                      <td className={user.accountLock ? 'text-danger' : 'text-success'}>
                        {user.accountLock ? 'Inactive' : 'Active'}
                      </td>
                      <td>
                        <i className="bi bi-pencil-square fs-4 text-primary m-1" onClick={() => handleEdit(user.userId)}></i>
                        <i className="bi bi-eye fs-4 text-success m-1" onClick={() => handleView(user.userId)}></i>
                        <i className="bi bi-trash fs-4 text-danger my-2" onClick={() => handleDelete(user.userId)}></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {renderPagination()}
            </div>
          </div>
        </div>
      ) : (
        <div className='container  mt-5'>
          <h2 className='text-danger text-center'>There is no Employee data for the given search criteria</h2>
        </div>
      )}

      <div>

      </div>
    </>
  );
};

export default EmployeeData;
