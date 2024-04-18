import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './Components/Home';
import Register from './Components/Register';
import UserRegister from './Components/UserRegister.js';
import Login from './Components/Login.js';
import { Route, Routes } from 'react-router-dom';
import Edit from './Components/Edit';
import Details from './Components/Detail';
import UserProfile from './Components/UserProfile.js';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home abhishek="hello" />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/userregister' element={<UserRegister />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route exact path='/edit/:id' element={<Edit />} />
        <Route exact path='/view/:id' element={<Details />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
