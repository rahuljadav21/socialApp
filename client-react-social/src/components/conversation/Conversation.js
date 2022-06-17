import './conversation.css'
import {useState,useEffect} from 'react';
import axios from 'axios';
import {API} from "../../constants.json"

function Conversation({conversation,currentUser}) {
  const [user, setuser] = useState({})
  useEffect(() => {
    const friendId = conversation.members.find(m=>m !==currentUser._id);
    const getUser=async()=>{
      try {
        const res = await axios.get(API+"/users/?userId="+friendId);
        setuser(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    getUser();
 
  }, [currentUser,conversation])
  
  return (
    <div className='conversation'>
      <img src={user.ProfilePicture ? user.ProfilePicture : '/assets/person/noAvatar.png'} alt="" className="conversationImg" />
      <span className="conversationName">{user.username}</span>
    </div>
  )
}

export default Conversation