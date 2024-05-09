import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import '../Login/loginPage.css'
import { loginService } from '../../services/loginService';
import { useNavigate } from 'react-router-dom';

export const CreateUser = () => {

  const navigate = useNavigate();
  const [isEmailError, setIsEmailError] = useState(false);
  const [roleSelect, setRoleSelect] = useState(0);
  const [touched, setTouched] = useState(false);
  const [roles, setRoles] = useState(null);
  const [imageStatus,setImageStatus] = useState(false);
  const [selectedImage,setSelectedImage] = useState('');
  const emailRef = useRef();
  const [image,setImage] = useState('');
 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    designation: '',
    roleId: '',
   
  });
  useEffect(() => {
    let getRoles = async () => {
      try {
        const response = await loginService.fetchRoles();
        setRoles(response)
      } catch (error) {
      
        toast.error("roles not found")
      }
      return null
    }
    getRoles();
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDto = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      designation: formData.designation,
      roleId: roleSelect,
    }
    console.log(userDto);
    try {
       console.log('create user'+image)
       await loginService.createUser(userDto,image);
    
      toast.success("user created successfully")
     handleReset();
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("email is already exists")
      }

      else if(error.response.status === 400){
        toast.error(error.response.data)
      }
      else{
        toast.error("User not created")
      }
    }
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      designation: '',
      roleId: '',
      image:''
    })
    setImageStatus(false);
  }

  const checkEmail = () => {

    let email = emailRef.current.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setIsEmailError(true)
      toast.error('Not a valid email address');
    } else {
      setIsEmailError(false)
    }
  }
  const handleBlur = (e) => {
    if (e.target.value.trim() === '0') {
      setTouched(true);
    } else {
      setRoleSelect(e.target.value)
    }

  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; 
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file.');
        event.target.value = null; 
        return;
      }
     
      setImage(file)
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      setImageStatus(true)
    }
  };
  const handleBack = ()=>{
    navigate(-1);
  }

  return (
    <div className='d-flex justify-content-between m-2'>

      <div className='w-75 rounded-2'>
        <img src="https://images.lemonly.com/wp-content/uploads/2018/08/07150313/Homebase_Thumb_v01.gif" className='w-100 h-100 px-2' alt="" style={{ borderRadius: '5%' }} />
      </div>

      <div className='w-50 mx-3 py-4 p-5 shadow custome'>
        <h2 className='text-center'>Add Employee</h2>
        <form onSubmit={handleSubmit} className='w-100'>
          <div className=''>
            <label className='d-block fs-5 fw-semibold'>First Name :</label>
            <input className='border-0 border-bottom border-black py-1 w-100 mb-3' required
              type="text"
              id="firstName"
              name="firstName"
              placeholder='Enter first name'
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className=''>
            <label className='d-block fs-5 fw-semibold'>Last Name :</label>
            <input className='border-0 border-bottom border-black py-1 w-100 mb-3' required
              type="text"
              id="lastName"
              name="lastName"
              placeholder='Enter last name'
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='d-block fs-5 fw-semibold'>Email :</label>
            <input className='border-0 border-bottom border-black py-1 w-100 mb-3' required
              type="email"
              id="email"
              name="email"
              placeholder='Enter email'
              value={formData.email}
              onChange={handleChange}
              ref={emailRef}
              onBlur={checkEmail}
            />
            {isEmailError && <div className="text-danger my-2">Please enter a valid email address.</div>}
          </div>
          <div>
            <label className='d-block fs-5 fw-semibold'>Designation :</label>
            <input className='border-0 border-bottom border-black py-1 w-100 mb-3' required
              type="text"
              id="designation"
              name="designation"
              placeholder='Enter designation'
              value={formData.designation}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='d-block fs-5 fw-semibold'>Role :</label>
            <select onBlur={handleBlur} required className=' my-1 w-100 py-1'>
              <option value='0' >Select Role</option>
              {
                roles != null ? (
                  roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
                  ))
                ) : (
                  <option disabled>Roles not found</option>
                )
              }
            </select>
            {touched && <p style={{ color: 'red' }}>This field is required</p>}
          </div>
          <div>
            <label className='d-block fs-5 fw-semibold'>Image :</label>
            <input
              type="file"
              className='border-0 mt-1 w-100 mb-3'
              id="image"
              name="image"
              accept="image/*" 
              onChange={handleImageChange}
            />
            {imageStatus && (
    <img src={selectedImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
  )}
          </div>

          <div className='d-flex justify-content-between w-100 mt-3'>
            <button type="submit" className='btn btn-outline-success fw-bold' >Sign Up</button>
            <button type='reset' className='btn btn-outline-danger fw-bold' onClick={handleReset}>Clear</button>
           
         <button type="button" onClick={handleBack} className='btn btn-outline-warning  fw-bold'>Back</button>
                         
          </div>
        </form>
      </div>
    </div>
  )
}