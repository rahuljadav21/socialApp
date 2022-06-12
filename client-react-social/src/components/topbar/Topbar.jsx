import "./topbar.css";
import { Chat,ExitToApp} from "@material-ui/icons";
import {Link} from 'react-router-dom';
import { useContext } from "react";
import {AuthContext} from '../../context/AuthContext'


export default function Topbar() {

  const {user,dispatch} = useContext(AuthContext); 

  const Logout = ()=>{
    dispatch({type:"LOGOUT",payload:null});
    window.location="/"
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to='/' style={{textDecoration:'none'}}>
        <span className="logo">Social</span>
        </Link>
        
      </div>
      <div className="topbarCenter">
        {/* <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friends"
            className="searchInput"
          />
        </div> */}
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink"><Link to={'/'} style={{textDecoration:"none",color:"white"}}>Homepage</Link></span>
          <span className="topbarLink"><Link to={'/friends'} style={{textDecoration:"none",color:"white"}}>Friends</Link></span>
          {/* <span className="topbarLink">Timeline</span> */}
        </div>
        <div className="topbarIcons">
          {/* <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div> */}
          <div className="topbarIconItem">
          <Link to={'/messenger'} style={{textDecoration:"none",color:"white"}}>
            <Chat />
            </Link>
            {/* <span className="topbarIconBadge">2</span> */}
          </div>
          <div className="topbarIconItem">
            <ExitToApp onClick = {Logout} />
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img src={
          user.profilePicture ? user.profilePicture : 'assets/person/noAvatar.png'
        } alt="" className="topbarImg"/>
        </Link>

        
      </div>
    </div>
  );
}
