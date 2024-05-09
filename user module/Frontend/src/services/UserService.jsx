import axios from 'axios';

export class UserService{

    static USER_API_URL = "http://localhost:8080/api/v1/user";

    static fetchUsers = async () =>{

        const response = await axios.get(`${this.USER_API_URL}/fetch-all/users`);
        return response.data;
    }

    static fetchUser = async (id) =>{

        console.log(id)
        
        const response = await axios.get(`${this.USER_API_URL}/fetch-user/${id}`);
        return response.data;
    }
    static getEmployeeByEmail = async (email) => {
        
        const response  = await axios.get(`${this.USER_API_URL}/fetch-by-email/${email}`)
        return response.data;   
    }

    static deleteEmployeeById = async (id) => {
        await axios.delete(`${this.USER_API_URL}/delete/${id}`)
         
    }
}