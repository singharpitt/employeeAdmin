import axios from 'axios';
import { toast } from 'react-toastify';
export const getUser = () =>
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
export const login = async (email, password) => {
    const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
    localStorage.setItem('user', JSON.stringify(data));
    return data;
}
export const logout = () => {
    localStorage.removeItem('user');

}
export const getAdminData=async()=>{
    const {data}=await axios.get('http://localhost:5000/api/users/admin',{headers:{
        authorization:localStorage.getItem('user')
    }});
    return data;
}
export const getdata=async()=>{
    const {data}=await axios.get('http://localhost:5000/getdata',{headers:{
        authorization:localStorage.getItem('user')
    }});
    return data;

}

export const DeleteEmployee = async (id) => {
    try {
        const { data } = await axios.delete(`http://localhost:5000/api/users/deleteemployee/${id}`, {
            headers: {
                Authorization: localStorage.getItem('user') 
            }
        });

        return data;
    } catch (error) {
        throw error; 
    }
}



export const UserExist=async(id)=>{
    try {
        const { data } = await axios.get(`http://localhost:5000/api/users/userexist/${id}`);
        return data;
    } catch (error) {
        toast.error(error);
    }
}

export const updateProfile=async(updateData)=>{
    let {data}=await axios.post('http://localhost:5000/api/users/update',updateData,{headers:{
        authorization:localStorage.getItem('user')
    }});
    let update=JSON.parse(localStorage.getItem('user'));
    data.token=update.token;
    localStorage.setItem('user', JSON.stringify(data));
    return data;

}
export const register = async (registerData) => {
    const { data } = await axios.post('http://localhost:5000/api/users/register', registerData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;

}
