import "./closeFriend.css";

export default function CloseFriend({user}) {
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.profilePicture ? user.profilePicture : 'assets/person/noAvatar.png'} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
