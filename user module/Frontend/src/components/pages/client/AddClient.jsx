import React, { useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { supplierClientService } from '../../../services/supplierClientService';

export const AddClient = ({ clients }) => {
    const navigate = useNavigate();

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const contractRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: nameRef.current.value.trim(),
            email: emailRef.current.value.trim(),
            phone: phoneRef.current.value.trim(),
            address: addressRef.current.value.trim(),
            contract_type: contractRef.current.value.trim()
        };
        try {
            supplierClientService.addClient(formData);
            toast.success("Client Data Added Successfully");
            handleReset();
        } catch (error) {
            toast.error("Failed To Add Client Data");
        }
    };

    const handleReset = () => {
        nameRef.current.value = '';
        emailRef.current.value = '';
        phoneRef.current.value = '';
        addressRef.current.value = '';
        contractRef.current.value = '';
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='shadow w-50 p-3 m-5 mx-auto rounded-5' style={{ background: 'linear-gradient(45deg, #b3cbda, #e1e4e7)' }}>
            <h3 className='text-center'>Add Client</h3>
            <form className='' onSubmit={handleFormSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>Client Name</th>
                            <td>
                                <input type="text"
                                    className='text-center'
                                    ref={nameRef}
                                    required autoFocus
                                    placeholder='Enter client name'
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
                                    placeholder='Enter phone number'
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
                            <th>Contract Type</th>
                            <td>
                                <input type="text" required
                                    ref={contractRef}
                                    className='text-center'
                                    placeholder='Enter contract type'
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className='text-center'>
                                <input type="submit" className='btn btn-outline-success fw-bold' />
                            </td>
                            <td className='text-center'>
                                <input type="reset" onClick={handleReset} className='btn btn-outline-danger fw-bold' />
                            </td>
                            <td className='text-center'>
                                <button type="button" onClick={handleBack} className='btn btn-outline-warning px-3 fw-bold'>Back</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};
