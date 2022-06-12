import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";

import {AuthContext} from './context/AuthContext'
import Messenger from "./pages/messenger/Messenger";
import Friends from "./pages/friends/Friends";
import UpdateProfile from "./pages/updateProfile/UpdateProfile";


function App() {

 const {user} = useContext(AuthContext)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={ user ? <Home/> : <Register/> }/>
      <Route path="/profile/:username" element={ <Profile/>}/>
      <Route path="/login" element={user ? < Navigate to='/' /> : <Login/>}/>
      <Route path="/register" element={user ?  < Navigate to='/' />  : <Register/>}/>
      <Route path="/messenger" element={!user ? <Navigate to='/'/> : <Messenger/>}/>  
      <Route path="/friends" element={!user ? <Navigate to='/'/> : <Friends/>}/>
      <Route path="/updateProfile" element={!user ? <Navigate to='/'/> : <UpdateProfile/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
