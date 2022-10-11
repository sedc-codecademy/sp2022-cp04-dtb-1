import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Home from './pages/Home'

import {Route, Routes} from 'react-router'

//pages
import About from './pages/About';
import Newsletter from './pages/Newsletter';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile'


import RequireAuth from './components/RequireAuth';

const ROLES = {
  'User': "User",
  'Admin': "Admin"
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/newsletter' element={<Newsletter/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        {/* USER PATHS */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path='/profile' element={<Profile/>} />
        </Route>
        <Route path='/' element={<Home/>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
