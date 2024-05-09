import React, { useRef, useState } from 'react';
 import '../css/supplier.css';
import { supplierClientService } from '../../../services/supplierClientService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AddSupplier = () => {

    const navigate = useNavigate();

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const contactRef = useRef();
   
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: nameRef.current.value.trim(),
            email: emailRef.current.value.trim(),
            phone: phoneRef.current.value,
            address: addressRef.current.value.trim(),
            contact_name: contactRef.current.value.trim()
        }
        
        try {
            supplierClientService.addSupplier(formData);
            toast.success("Supplier Data Added Successfully")
            handleReset();
        } catch (error) {
            throw new Error()
        }
        handleReset();
        
            
    };
    let handleReset = () => {
        nameRef.current.value = ''
        emailRef.current.value = ''
        phoneRef.current.value = ''
        addressRef.current.value = ''
        contactRef.current.value = ''
    }
    const handleBack = () => {
        navigate(-1); 
    };

    return (

        <div className='shadow w-50 p-3 m-5 mx-auto rounded-5' style={{ background: 'linear-gradient(45deg, #b3cbda, #e1e4e7)' }}>

            <h3 className='text-center'>Add supplier</h3>
            <form action="" className='' onSubmit={handleFormSubmit}>
                <table className=''>
                    <tbody>
                        <tr >
                            <th>Supplier Name</th>
                            <td>
                                <input type="text"
                                    ref={nameRef}
                                    required autoFocus
                                    className='text-center'
                                    placeholder='Enter supplier name'

                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>
                                <input type="text" required
                                    ref={addressRef}
                                    className='text-center'
                                    placeholder='Enter address'
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>
                                <input type="number" required
                                    ref={phoneRef}
                                    className='text-center'
                                    placeholder=' Enter phone number'
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>
                                <input type="email" required
                                    ref={emailRef}
                                    className='text-center'
                                    placeholder='Enter email'
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Contact Name</th>
                            <td>
                                <input type="text" required
                                    ref={contactRef}
                                    className='text-center'
                                    placeholder='Enter contact name'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='text-center'>
                                <input type="submit" className='btn btn-outline-success px-3 fw-bold' />
                            </td>
                            <td className='text-center'>
                                <input type="reset" onClick={handleReset} className='btn btn-outline-danger px-3 fw-bold' />
                            </td>
                            <td className='text-center'>
                                <button type="button" onClick={handleBack} className='btn btn-outline-warning px-3 fw-bold'>Back</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>

    )
}