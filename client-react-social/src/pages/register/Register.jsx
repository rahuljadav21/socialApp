import "./register.css";
import { useRef} from 'react'
import axios from "axios";
import {useNavigate} from "react-router"
import { Link } from "react-router-dom";
import {API} from "../../constants.json"

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate()

  const handleClick = async (e)=>{
    e.preventDefault()
    if(passwordAgain.current.value!==password.current.value){
      password.current.setCustomValidity("Passwords didn't match !")
    }else{
      const user = {
        username : username.current.value,
        email : email.current.value,
        password : password.current.value,
      }
      try {
        console.log(user);
        await axios.post(API+'/auth/register',user);
        history("/login");
      } catch (error) {
        console.log(error);
      }
    }
  }



  return (
    
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Being social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Being social.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" type="email" ref={email} required className="loginInput" />
            <input placeholder="Password" type="password" min='6' ref={password} required className="loginInput" />
            <input placeholder="Password Again" type="password" min="6" ref={passwordAgain} required className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <Link to='/login'>
            <button className="loginRegisterButton">Log into Account
            </button>
            </Link>
            
              
          </form>
        </div>
      </div>
    </div>
  );
}
