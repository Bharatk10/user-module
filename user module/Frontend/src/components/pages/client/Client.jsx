import React, { useEffect, useState } from 'react'
import { supplierClientService } from '../../../services/supplierClientService'
import { useNavigate } from 'react-router-dom'


const ITEMS_PER_PAGE = 6;

export const Client = () => {

  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  let handleAddClient = () => {
   navigate('/add-client')
  }
  useEffect(() => {
    let fetchClients = async () => {
      const allClients = await supplierClientService.getClients();
      setClients(allClients);
      setTotalPages(Math.ceil(allClients.length / ITEMS_PER_PAGE));
    };
    fetchClients()
  }, [])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getVisibleClients = () => {

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, clients.length);
    return clients.slice(startIndex, endIndex);
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
    <div className='ms-2'>
      <div className=''>
        <h1 className='ms-2 mt-3 text-secondary'>Client</h1>

      </div>
      
          <div>
            <div className='w-100 d-flex justify-content-end px-5 my-2'>
              <button type="button" className="btn btn-primary" onClick={handleAddClient}><i class="bi bi-database-fill-add m-2 "></i>Add Client</button>
            </div>
            <div className='px-2'>
              <table className='table table-striped table-hover'>
                <thead className='table-light'>
                  <tr>

                    <th>Client Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Contract Type</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    getVisibleClients().map((client) => (
                      <tr key={client.id}>

                        <td>{client.name}</td>
                        <td>{client.phone}</td>
                        <td>{client.email}</td>
                        <td>{client.address}</td>
                        <td>{client.contract_type}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              {renderPagination()}
            </div>
          </div>
        

    </div>
  )
}