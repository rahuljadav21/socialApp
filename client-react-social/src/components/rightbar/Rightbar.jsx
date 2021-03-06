import "./rightbar.css";
import Online from "../online/Online";
import axios from "axios";
import {API,SOCKET_URL} from "../../constants.json"
import { useState,useEffect, useContext,useRef } from "react";
import { Link } from "react-router-dom";
import {AuthContext} from '../../context/AuthContext'
import { Add ,Chat,Edit,Remove} from "@material-ui/icons";
import {io} from 'socket.io-client'


export default function Rightbar({ user }) {
  const {user:currentUser,dispatch} = useContext(AuthContext);
  const [friends, setFriends] = useState([])
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef()
  
  useEffect(()=>{
    socket.current = io(SOCKET_URL);
},[])

useEffect(()=>{
  socket.current.emit("addUser",currentUser._id);
  socket.current.on("getUsers",(users)=>{
    setOnlineUsers(
      currentUser.followings.filter((f) => users.some((u) => u.userId === f))
    );
  })
},[currentUser])
  
  useEffect(() => {
    
    const getFriends=async()=>{
      try {
        const friendList = await axios.get(API+"/users/friends/"+currentUser._id);
        setFriends(friendList.data); 
      } catch (err) {
        console.log(err)
      }
    }
    getFriends();
  }, [currentUser._id])
  
  
  const handleClick =async()=>{
    try {
      if(followed){
        await axios.put(API+'/users/'+user._id+'/unfollow',{userId:currentUser._id})
        dispatch({type:"UNFOLLOW",payload:user._id});
      }else{
        await axios.put(API+'/users/'+user._id+'/follow',{userId:currentUser._id})
        dispatch({type:"FOLLOW",payload:user._id});
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed)
  }

  const startConversation = async() =>{
    await axios.post(API+'/conversations/',{
        senderId:user._id,receiverId:currentUser._id
      });
    window.location='/messenger';  
  }

  const HomeRightbar = () => {
    return (
      <>
        {/* <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div> */}
        {/* <img className="rightbarAd" src="assets/ad.png" alt="" /> */}
        <h4 className="rightbarTitle">Online Friends</h4>
        
        <ul className="rightbarFriendList">
          {onlineUsers.map((u) => (
            <Link style={{textDecoration:"none",color:"black"}} key={u} to='/messenger'>
             <Online  online={u} />
            </Link>
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username!==currentUser.username && (
          <>
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
             {followed ? <Remove/> :<Add/>}           

          </button>
          <button className="rightbarFollowButton" onClick={startConversation} >
             Start Chat <Chat style={{marginLeft:"10px"}}/>
          </button>
        </>
        )}

        <div className="infoHeader">
        <h4 className="rightbarTitle">User information </h4>
        <div className="update">
        <Link to='/updateProfile' style={{textDecoration:"none",color:"#1877f2"}}>
        <Edit/>
        <span>Update Profile</span>
        </Link>
        </div>
        
        
        
        </div>
        
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{ user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship===1?"Single":user.relationship===2?"Married":"-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
        {
          friends.map(friend=>(
            <Link key={friend._id} to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
            <div className="rightbarFollowing" >
            <img
              src={friend.ProfilePicture ? friend.ProfilePicture : '/assets/person/noAvatar.png'}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
            </Link>
            

          ))
        }

        </div>
      </>
    );
  };
  return (
    <div  className = {user ? "rightbar":"rightbar"}>
      <div className = {user ? "rightbarWrapper userRightbar":"rightbarWrapper rightbarSticky"} >
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
