import { useState, useContext, createContext } from 'react';
import * as UserService from '../Services/UserService';
import { toast } from 'react-toastify';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(UserService.getUser());
    const [userAll, setUserAll] = useState(null);
    const [isExist, setExist] = useState(true);
    const [getUserData, setUserData] = useState([]);

    const login = async (email, password) => {
        try {
            const User = await UserService.login(email, password);
            toast.success('Login Successfully');

            setUser(User);
            return true;
        }
        catch (err) {
            toast.error(err.response.data);
            return false;
        }
    };
    const registerUser = async (RegisterData) => {
        try {
            const User = await UserService.register(RegisterData);
            toast.success("Register Successfully");

            setUser(User);
            return true;


        }
        catch (err) {
            toast.error(err.response.data);
            return false;

        }
    }

    const EntryData = async () => {
        try {
            const data = await UserService.getdata();

            setUserData(data);


        }
        catch (err) {
            toast.error(err.response.data);
        }
    }

    const adminData = async () => {
        try {
            const Users = await UserService.getAdminData();
            toast.success("Employee Data fetched");
            setUserAll(Users);

        }
        catch (err) {
            toast.error(err.response.data);
        }
    }
    const DeleteEmployee = async (id) => {
        try {
            const deleted = await UserService.DeleteEmployee(id);
            toast.warn("Employee deleted");
            setUserAll(prevUserAll => prevUserAll.filter(user => user.id !== id));
            EntryData();

        }
        catch (err) {
            toast.error(err.response.data);

        }
    }

    const UserExists = async (id) => {
        try {
            const checkUserExist = await UserService.UserExist(id);
            setExist(checkUserExist);
        }
        catch (err) {
            toast.error(err.response.data);
            return true;
        }
    }

    const updateUser = async (UpdateUser) => {
        try {
            const User = await UserService.updateProfile(UpdateUser);
            setUser(User);
            toast.success('User Profile updated');
            return true
        }
        catch (err) {
            toast.error(err.response.data);
            return false;
        }
    }
    const logout = () => {
        UserService.logout();
        setUser(null);
        toast.success("Logout SuccessFully");
    }
    return (
        <AuthContext.Provider
            value={
                { user, setUser, login, registerUser, logout, updateUser, userAll, setUserAll, adminData, EntryData, getUserData, setUserData, DeleteEmployee,UserExists,isExist }
            }
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);