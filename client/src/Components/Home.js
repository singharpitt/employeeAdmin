import { useAuth } from '../hooks/useAuth';
import Employee from './Employee';
import Navbar from './navbar';
import Admin from './Admin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]); 
    

    return (
        <>
            <Navbar />
            {
                user && <>{user.isAdmin?<Admin/>:<Employee/>}</>
            }
        </>
    );
};

export default Home;
