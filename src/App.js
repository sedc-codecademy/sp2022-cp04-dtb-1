import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Home from './pages/Home'

import {Route, Routes} from 'react-router'

//pages
import About from './pages/About';
import Newsletter from './pages/Newsletter';
import Login from './pages/Login';
import Register from './pages/Register';
import Create from './pages/Create'
import Profile from './pages/Profile'
import UserPosts from './pages/UserPosts';
import Post from './pages/Post';

import RequireAuth from './components/RequireAuth';
import Unsubscribe from './pages/Unsubscribe';
import EditPost from './pages/EditPost';



const ROLES = {
  'User': "User",
  'Creator': "Creator",
  'Admin': "Admin"
}

function App() {
  return (
    <>    
      <Routes>
        <Route path='/newsletter' element={<Newsletter/>} />
        <Route path='/unsubscribe' element={<Unsubscribe/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/post/:id' element={<Post/>} />
        <Route path='/profile' element={<Profile/>} />
        {/* USER PATHS */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />}>
          <Route path='/userPosts' element={<UserPosts/>}/>
          <Route path='/editPost/:id' element={<EditPost/>}/>
          <Route path='/dashboard' element={<Create/>} />
        </Route>
     
        <Route path='/' element={<Home/>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
