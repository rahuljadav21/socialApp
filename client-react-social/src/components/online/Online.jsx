import "./online.css";
import { useEffect,useState } from "react";
import axios from "axios";
import {API} from "../../constants.json"
export default function Online({online}) {

  const [user,setUser] = useState({})
  useEffect(() => {
    const getUser = async()=>{
      const res = await axios.get(API+'/users/'+online)
      setUser(res.data);
    }
    getUser()
  }, [online])
  
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={user.profilePicture ? user.profilePicture:'/assets/person/noAvatar.png'} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
