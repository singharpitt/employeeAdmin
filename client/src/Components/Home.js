import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Home = () => {
    const [getUserData, setUserData] = useState([]);
    console.log(getUserData);
    const getdata = async (e) => {
        const res = await fetch("http://localhost:5000/getdata", {
            method: "GET",
            mode: "cors",
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
    useEffect(() => {
        getdata();
    },[])
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
            getdata();
        }
    }
    return (
        <div className="mt-5">
            <div className="container">
                <div className="add_btn mt-2 mb-2">
                    <Link className="btn btn-primary" to='/register'>Add data</Link>
                </div>
                <table class="table table-striped">
                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">id</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {getUserData.map((user, id) => {
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{id + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.work}</td>
                                            <td>{user.mobile}</td>
                                            <td className="d-flex justify-content-between">
                                                <Link to={`/view/:${user._id}`}><button className="btn btn-success"><RemoveRedEyeIcon /></button></Link>
                                                <Link to={`/edit/:${user._id}`}> <button className="btn btn-primary"><CreateIcon /></button></Link>
                                                <button className="btn btn-danger" onClick={() => deleteuser(user._id)}><DeleteOutlineIcon /></button>
                                            </td>
                                        </tr>
                                    </>

                                )
                            })
                            }


                        </tbody>
                    </table>
                </table>

            </div>

        </div>
    )
}
export default Home;