import CloseFriend from "../../components/closeFriend/CloseFriend";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../context/AuthContext'
import { Link } from "react-router-dom";
import { Search } from "@material-ui/icons";
import Topbar from "../../components/topbar/Topbar";
import "./friends.css"

function Friends() {

    const [friends, setFriends] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {

        const getFriends = async () => {
            const res = await axios.get('/users/friends/' + user._id);
            setFriends(res.data);
        }
        getFriends();
    }, [user._id])

    return (
        <>
        <Topbar/>
        <div className="friendsContainer">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friends"
            className="searchInput"
          />
        </div>
            <div className="all">
                <h3>
                    Friends
                    <ul className="sidebarFriendList">
                        {friends.map((u) => (
                            <Link key={u._id} style={{ textDecoration: "none", color: "black" }} to={'/profile/' + u.username} >
                                <CloseFriend key={u._id} user={u} />
                            </Link>
                        ))}
                    </ul>

                </h3>
            </div>
            <div className="onlineFriends">

            </div>


        </div>
        </>
    )
}

export default Friends