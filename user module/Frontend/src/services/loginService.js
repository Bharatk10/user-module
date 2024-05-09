import axios from 'axios';

export class loginService {

    static API_URL = "http://localhost:8080/api/v1/login"; 

    static USER_API_URL = "http://localhost:8080/api/v1/user";

    static validateEmail = async (email) => { 

        const response = await axios.get(`${loginService.API_URL}/validate/email/${email}`); 
        return response.data;
    }
   
    static proceedLogin = async (loginDto) => {

        const response = await axios.post(`${loginService.API_URL}/validate/user`,loginDto);
         return response.data;

    }
    static changePassword = async (loginDto) => {

        const response = await axios.put(`${loginService.API_URL}/change-password`,loginDto)
        return response.data;

    }
    static fetchRoles = async () =>{

        const response = await axios.get(`${this.USER_API_URL}/fetch-all/roles`);
        return response.data;
    }
    static createUser = async (userDto, image) => {

        console.log(image)

        try {
            const formData = new FormData();
                
        formData.append('userDto', JSON.stringify(userDto));
        formData.append('image',image);
        if(userDto.userId!=null){
            formData.append('userId',userDto.userId)
        }
        const response = await axios.post(`${loginService.USER_API_URL}/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    static updateUser = async (userDto, image) => {

        console.log(userDto)
        console.log(image)

        try {

        const formData = new FormData();        
        formData.append('userDto', JSON.stringify(userDto));
        formData.append('image',image);
        const response = await axios.post(`${loginService.USER_API_URL}/edit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
            return response.data;
        } catch (error) {
            console.error('Error in Updating employee:', error);
        }
    };
    
    
    static forgotPassword = async (email) => {
        const response  = await axios.put(`${loginService.USER_API_URL}/forgot-password/${email}`)
        return response.data;   
    }
   

}
