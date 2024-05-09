import React, { useEffect, useState } from 'react';
import { supplierClientService } from '../../../services/supplierClientService'
import {useNavigate } from 'react-router-dom'


const ITEMS_PER_PAGE = 6;

export const Supplier = () => {

  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  let handleAddSupplier = () => {
      
    navigate('/add-supplier', {
      state: { suppliers } 
    });
  }
  useEffect(() => {

    const fetchSuppliers = async () => {
      const allSuppliers = await supplierClientService.getSuppliers();
      setSuppliers(allSuppliers);
      setTotalPages(Math.ceil(allSuppliers.length / ITEMS_PER_PAGE));
    };

    fetchSuppliers();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getVisibleSuppliers = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, suppliers.length);
    return suppliers.slice(startIndex, endIndex);
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
    <div className="ms-2">
      <div className="">
        <h1 className="ms-2 mt-3 text-secondary">Supplier</h1>
      </div>
      
      
          <div>
            <div className="d-flex justify-content-end px-5 my-2">
              <button type="button" className="btn btn-primary" onClick={handleAddSupplier}>
                <i className="bi bi-database-fill-add m-2"></i>
                Add Supplier
              </button>
            </div>
            <div className="px-2">
              <table className="table table-striped table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Supplier Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Contact Name</th>
                  </tr>
                </thead>
                <tbody>
                  {getVisibleSuppliers().map((supplier) => (
                    <tr key={supplier.id}>
                      <td>{supplier.email}</td>
                      <td>{supplier.phone}</td>
                      <td>{supplier.address}</td>
                      <td>{supplier.name}</td>
                      <td>{supplier.contact_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
             
              {renderPagination()}
             
              
            </div>
          </div>
    </div>
  );
};
