import "./post.css";
import { MoreVert,FavoriteBorder,Favorite, Delete} from "@material-ui/icons";
import axios from "axios";
import { useState,useEffect } from "react";
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { useContext } from "react";
import {AuthContext} from '../../context/AuthContext'
import {API} from "../../constants.json"


export default function Post({ post }) {
  const {user:currentUser} = useContext(AuthContext); 
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({})

  const deletePost= async()=>{
    await axios.delete(API+'/posts/'+post._id,{
      data: {
        userId: currentUser._id
      }
    });
    window.location.reload();
  }
 
  useEffect(()=>{
   
    const fetchUser = async()=>{
     const res = await axios.get(API+`/users/${post.userId}`);
     setUser(res.data);
    }
    fetchUser()
  },[post.userId])
  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])

 
  const likeHandler =()=>{
    try {
      axios.put(API+'/posts/'+post._id+'/like',{userId:currentUser._id})
      
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked);
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture ? user.profilePicture : '/assets/person/noAvatar.png'}
              alt=""
            />
            </Link>            
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            
            {isLiked? <Favorite style={{color:"red"}} onClick={likeHandler}/>:<FavoriteBorder onClick={likeHandler}/> }  
            {/* <img className="likeIcon" src="assets/like.png"  alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" /> */}
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            {/* <span className="postCommentText">{post.comment} comments</span> */}
            {
              post.userId===currentUser._id? <Delete onClick={deletePost} style={{cursor:"pointer",color:"red"}} /> :""
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}
