import React, { useRef, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext'
import "./updateProfile.css"
import { AccountCircle,Cancel,PhotoSizeSelectActual } from "@material-ui/icons"
import axios from 'axios';
import {API} from "../../constants.json"
function UpdateProfile() {

    const { user } = useContext(AuthContext);
    // const [file, setFile] = useState(null);
    const [profilePictureImg, setprofilePictureImg] = useState(null);
    const [coverPictureImg, setcoverPictureImg] = useState(null);
    const city = useRef();
    const from = useRef();
    const desc = useRef();
    const password = useRef();
    const [relationship, setRelationship] = useState(user.relationship)

    const submitHandler = async(e)=>{
        e.preventDefault();
        const userProfile = {
            city:city.current.value,
            from:from.current.value,
            desc:desc.current.value,
            password:password.current.value,
            relationship,
            userId:user._id
        }
        if(profilePictureImg){
            const data = new FormData();
            const fileName = profilePictureImg.name
            data.append("file",profilePictureImg);
            data.append("name",fileName)
          try {
               const res = await axios.post(API+"/upload",data);
                userProfile.profilePicture = res.data.path 
              } catch (error) {
              console.log(error);
             }
        }
        if(coverPictureImg){
            const data = new FormData();
            const fileName = coverPictureImg.name
            data.append("file",coverPictureImg);
            data.append("name",fileName)
            
          try {
            const res= await axios.post(API+"/upload",data);
            userProfile.coverPicture = res.data.path 
              } catch (error) {
              console.log(error);
             }
        }
       
        try {
            await axios.put(API+'/users/'+user._id,userProfile);
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
    }

    return (
        <>
            <Topbar />
            <div>
                <div className="infoHeader">
                    <h4 className="rightbarTitle">Update information</h4>

                </div>

                <form className="rightbarInfo" onSubmit={submitHandler}>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <input required type="text" ref={city} value={user?.city} />
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <input required type="text" ref={from} value={user?.from} />
                    </div>
                    <div className="rightbarInfoItem">
                        <span id='bio' className="rightbarInfoKey">Bio :</span>
                        <textarea name="bio" style={{ height: "10vh" }} value={user.desc} ref={desc} cols="30" rows="10"></textarea>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <div className="relationShipInput">
                            <select defaultValue={user.relationship? user.relationship :1} required name="relationship" onChange={(e) => { setRelationship(e.target.value); console.log(relationship) }} id="1">
                                <option value="1" >Single</option>
                                <option value="2" >Married</option>
                                <option value="3" >Rather Not to say</option>
                            </select>

                        </div>

                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">New PassWord:</span>
                        <input required type="text" ref={password} placeholder="Enter new Password" />
                    </div>
                    <div className="rightbarInfoItem">
                        <label htmlFor="profilePic" className="shareOption">
                            <AccountCircle htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Select Profile Picture </span>
                            <input style={{ display: "none" }} type="file" id="profilePic" accept=".png, .jpeg, .jpg" onChange={(e) => setprofilePictureImg(e.target.files[0])} />
                        </label>
                        {profilePictureImg && (
                            <div className="shareImgContainer">
                                <img className="shareImg" src={URL.createObjectURL(profilePictureImg)} alt="" />
                                <Cancel style={{color:"blue"}} className="shareCancelImg" onClick={() => setprofilePictureImg(null)} />
                            </div>
                        )}
                    </div>
                    <div className="rightbarInfoItem">
                        <label htmlFor="coverPic" className="shareOption">
                            <PhotoSizeSelectActual htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Select Cover Picture </span>
                            <input style={{ display: "none" }} type="file" id="coverPic" accept=".png, .jpeg, .jpg" onChange={(e) => setcoverPictureImg(e.target.files[0])} />
                        </label>
                        {coverPictureImg && (
                            <div className="shareImgContainer">
                                <img className="shareImg" src={URL.createObjectURL(coverPictureImg)} alt="" />
                                <Cancel style={{color:"blue"}} className="shareCancelImg" onClick={() => setcoverPictureImg(null)} />
                            </div>
                        )}
                    </div>
                     <button className='updateButton' type='submit'>Update Profile</button>

                </form>

            </div>
        </>
    )
}

export default UpdateProfile