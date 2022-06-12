import "./login.css";
import {useContext, useRef} from 'react'
import{loginCall} from "../../apiCalls"
import {AuthContext} from "../../context/AuthContext"
import { CircularProgress } from "@material-ui/core";
export default function Login() {

  const email = useRef();
  const password = useRef()
  const {user,isFetching,dispatch} = useContext(AuthContext)
  const handleSubmit=(e)=>{
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Being Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Being Social.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Email" type="email" className="loginInput" required ref={email} / >
            <input placeholder="Password" type={'password'} minLength="6" ref={password} required className="loginInput" />
            <button className="loginButton" disabled={isFetching}>{ isFetching?<CircularProgress color="inherit"  size={'20px'} />:"Log In" }</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
            { isFetching?<CircularProgress color="inherit"  size={'20px'} />:"Craete a New Account" }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
