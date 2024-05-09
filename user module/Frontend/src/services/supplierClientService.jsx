import axios from 'axios';

export class supplierClientService  {
 
    static API_URL = 'http://localhost:777'

    static getSuppliers = async () => { 

        const response = await axios.get(`${supplierClientService.API_URL}/suppliers`); 
        return response.data;
    }
    static addSupplier = async (newSupplier) =>{
         await axios.post(`${supplierClientService.API_URL}/suppliers`, newSupplier);
     
    }

    static getClients = async () => { 

        const response = await axios.get(`${supplierClientService.API_URL}/clients`); 
        return response.data;
    }
    static addClient = async (newClient) =>{
         await axios.post(`${supplierClientService.API_URL}/clients`, newClient);
        
    }
}