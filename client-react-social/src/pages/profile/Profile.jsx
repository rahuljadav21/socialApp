import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import {API} from "../../constants.json"

export default function Profile() {

  const [user,setUser] = useState({})
  const username = useParams().username;
 
  useEffect(()=>{
    const fetchUser = async ()=>{
     const res = await axios.get(API+`/users/?username=${username}`);
     setUser(res.data);
    }
    fetchUser()
  },[username])
  return (
    <>
      <Topbar user={user} />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture? user.coverPicture:'/assets/post/5.jpeg'}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture? user.profilePicture :'/assets/person/noAvatar.png'}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}
