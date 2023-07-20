import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Profile from '../Images/Profile.png';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Work from '@mui/icons-material/Work';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useEffect,useState} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom'
const Details = () => {
    let {id}=useParams("");
    const Navigate=useNavigate();
    id=id.substring(1);
    const [getUserData,setUserData]=useState([]);
    console.log(getUserData);   
    const getdata = async (e) => {
        const res = await fetch(`http://localhost:5000/getuser/${id}`, {
            method: "GET",
            mode:"cors",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 404 || !data) {
            console.log("error ");
            alert("error");

        } else {
            setUserData(data);
            console.log("data read");

        }
    }
    useEffect(()=>{
        getdata();
    },[]);
    const deleteuser = async (id) => {
        const res2 = await fetch(`http://localhost:5000/deleteuser/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const deletedata = await res2.json();
        console.log(deletedata);
        if (res2.status === 422 || !deletedata)
            console.log("error data");
        else {
            console.log("data deleted");
            Navigate('/');
        }
    }
    return (
        <div className='container mt-3'>
            <h1 style={{ "fontWeight": "400" }}>{`Welcome ${getUserData.name}`}</h1>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                <div className='add_btn'>
                               <Link to={`/edit/:${getUserData._id}`}> <button className="btn btn-primary mx-2"><CreateIcon /></button></Link>
                                <button className="btn btn-danger" onClick={() => deleteuser(getUserData._id)}><DeleteOutlineIcon /></button>
                            </div>
                    <div className='row'>
                        <div className="left_view col-lg-6 col-md-6 col-sm-6">
                            <img src={Profile} style={{ "width": "50px" }} alt='profile' />
                            <h3 className='mt-3'>Name: <span >{getUserData.name}</span></h3>
                            <h3 className='mt-3'>Age: <span >{getUserData.age}</span></h3>
                            <p className='mt-3'><MailOutlineIcon />Email: <span>{getUserData.email}</span></p>
                            <p className='mt-3'><Work />Occupation: <span>{getUserData.work}</span></p>
                        </div>
                        <div className="right_view col-lg-6 col-md-6 col-sm-6">
                            
                            <p className='mt-5'><MobileScreenShareIcon />Mobile: <span>{getUserData.mobile}</span></p>
                            <p className='mt-3'><LocationOnIcon />Location: <span>{getUserData.add}</span></p>
                            <p className='mt-3'>Description: <span>{getUserData.desc}</span></p>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>

    )
}
export default Details;