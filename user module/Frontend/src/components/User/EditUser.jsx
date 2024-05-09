import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import '../Login/loginPage.css';
import { loginService } from '../../services/loginService';
import { useNavigate, useParams } from 'react-router-dom';
import { UserService } from '../../services/UserService';

export const EditUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;




  const [roleSelect, setRoleSelect] = useState('');
  const [touched, setTouched] = useState(false);
  const [roles, setRoles] = useState(null);
  const[image,setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const emailRef = useRef();
  const imageInputRef = useRef(null); 

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    designation: '',
    roleId: '',
  });

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.fetchUser(id);
        setFormData({
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          designation: response.designation,
          roleId: response.roleId,
        });

        if (response.image) {
          //const blob = new Blob([response.image],{type:"image/png"})
          const file = new File([response.image], 'user-image.png', { type: 'image/png' });
        // setImage(URL.createObjectURL(blob));
        // console.log(blob);
         //console.log(URL.createObjectURL(blob));
         setImage(file);
          setSelectedImage(` data:image/png;base64,${response.image}`)
        }

        emailRef.current.setAttribute('readonly', true);
        setRoleSelect(response.roleId);
        
      } catch (error) {
        toast.error('Failed to fetch user data');
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await loginService.fetchRoles(id);
        setRoles(response);
      } catch (error) {
        toast.error('Roles not found');
      }
    };
    getRoles();
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDto = {
      userId: parseInt(id, 10),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      designation: formData.designation,
      roleId: roleSelect,
    };
    
    try {
      
       
        await loginService.updateUser(userDto, image);
      
      toast.success('Employee updated successfully');
      handleReset();
      navigate("/employee")
    }catch (error) {
      if (error.response.status === 409) {
        toast.error('Email already exists');
      } else if (error.response.status === 400) {
        toast.error(error.response.data);
      } else {
        toast.error('Failed to upadte employee');
      }
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      designation: '',
      roleName: '',
      image: '',
    });
    
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file.');
        event.target.value = null;
        return;
      }
      setImage(file);
      setSelectedImage(URL.createObjectURL(file)); 
    }
  };


  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className=''>
      <div className='w-75 mx-auto my-4 py-4 p-5 shadow custome'>
        <h2 className='text-center'>Edit Employee</h2>
        <form onSubmit={handleSubmit} className='w-100'>
          <div className=''>
            <label className='d-block fs-5 fw-semibold'>First Name :</label>
            <input
              className='border-0 border-bottom border-black py-1 w-100 mb-3'
              required
              type='text'
              id='firstName'
              name='firstName'
              placeholder='Enter first name'
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className=''>
            <label className='d-block fs-5 fw-semibold'>Last Name :</label>
            <input
              className='border-0 border-bottom border-black py-1 w-100 mb-3'
              required
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Enter last name'
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='d-block fs-5 fw-semibold'>Email :</label>
            <input
              className='border-0 border-bottom border-black py-1 w-100 mb-3'
              type='email'
              id='email'
              name='email'
              placeholder='Enter email'
              value={formData.email}
              readOnly 
              ref={emailRef}
            />
          </div>
          <div>
            <label className='d-block fs-5 fw-semibold'>Designation :</label>
            <input
              className='border-0 border-bottom border-black py-1 w-100 mb-3'
              required
              type='text'
              id='designation'
              name='designation'
              placeholder='Enter designation'
              value={formData.designation}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='d-block fs-5 fw-semibold'>Role :</label>
            <select
              required
              className=' my-1 w-100 py-1'
              value={roleSelect}
              onChange={(e) => setRoleSelect(e.target.value)}
            >
              <option value='0'>{roleSelect}</option>
              {roles != null ? (
                roles.map((role) => (
                  <option key={role.roleId} value={role.roleId}>
                    {role.roleName}
                  </option>
                ))
              ) : (
                <option disabled>Roles not found</option>
              )}
            </select>
            {touched && <p style={{ color: 'red' }}>This field is required</p>}
          </div>
          <div>
            <label className='d-block fs-5 fw-semibold'>Image :</label>
            <input
              type='file'
              className='border-0 mt-1 w-100 mb-3'
              id='image'
              name='image'
              accept='image/*'
             
              onChange={handleImageChange}
            />
              <img src={selectedImage} alt='Preview' style={{ maxWidth: '100%', maxHeight: '200px' }} />
            
          </div>

          <div className='d-flex justify-content-between w-100 mt-3'>
            <button type='submit' className='btn btn-outline-success fw-bold'>
              Update
            </button>
            <button type='reset' className='btn btn-outline-danger fw-bold' onClick={handleReset}>
              Clear
            </button>
            <button type='button' onClick={handleBack} className='btn btn-outline-warning fw-bold'>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
