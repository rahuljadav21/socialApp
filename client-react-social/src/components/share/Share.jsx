import "./share.css";
import {PermMedia} from "@material-ui/icons"
import { useContext, useState ,useRef} from "react";
import {AuthContext} from '../../context/AuthContext'
import axios from "axios";
import { Cancel } from "@material-ui/icons";


export default function Share() {
  const {user} = useContext(AuthContext); 
  const desc = useRef();
  const [file,setFile] = useState(null);

  const submitHandler =async(e)=>{
    e.preventDefault()
    const newPost = {
      userId : user._id,
      desc: desc.current.value
    }
    if(file){
      const data = new FormData();
      const fileName = file.name
      data.append("file",file);
      data.append("name",fileName)
     
      try {
        const res = await axios.post("/upload",data);
        newPost.img = res.data.path
       
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post('/posts',newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? user.profilePicture : "/assets/person/noAvatar.png"} alt="" />
          <input
            placeholder={"What's in your mind "+user.username+"?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo </span>
                    <input style={{display:"none"}} type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e)=>setFile(e.target.files[0])} />
                </label>
                {/* <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div> */}
            </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}
