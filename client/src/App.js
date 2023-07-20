import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './Components/navbar';
import Home from './Components/Home';
import Register from './Components/Register';
import {Route,Routes} from 'react-router-dom';
import Edit from './Components/Edit';
import Details from './Components/Detail';
function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route exact path='/edit/:id' element={<Edit/>}/>
        <Route exact path='/view/:id' element={<Details/>}/>
        <Route/>
      </Routes>
    </>
  );
}

export default App;
