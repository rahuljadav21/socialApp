import './messenger.css'
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { useContext,useState,useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import {API,SOCKET_URL} from "../../constants.json"
import {io} from 'socket.io-client'

function Messenger() {
    const [conversations, setconversations] = useState([]);
    const [currentChat,setCurrentChat] = useState(null);
    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState("");
    const [arrivalMessage,setArrivalMessage]= useState(null)
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {user} = useContext(AuthContext);
    const scrollRef = useRef();
    const socket = useRef()

    useEffect(()=>{
        socket.current = io(SOCKET_URL)
        socket.current.on("getMessage",(data)=>{
          setArrivalMessage({
            sender:data.senderId,
            text:data.text,
            createdAt: Date.now()
          })
        })
    },[])

    useEffect(()=>{
      arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat])

    useEffect(()=>{
      socket.current.emit("addUser",user._id);
      socket.current.on("getUsers",(users)=>{
        setOnlineUsers(
          user.followings.filter((f) => users.some((u) => u.userId === f))
        );
      })
    },[user])

  
    useEffect(() => {
      const getConversation=async()=>{
        const res = await axios.get(API+'/conversations/'+user._id);
        setconversations(res.data);
      }
      getConversation();
    }, [user._id])

    useEffect(() => {
      
      const getMessages = async()=>{
        try {
          const res = await axios.get(API+"/messages/"+currentChat?._id)
          setMessages(res.data);
        }
         catch (error) {
          console.log(error)
        }
      }
      getMessages();
      
    }, [currentChat])
 
    const handleSubmit = async(e)=>{
      e.preventDefault();
      if(newMessage!==""){
      const message = {
        sender : user._id,
        text : newMessage,
        conversationId : currentChat._id
      };
      const receiverId = currentChat.members.find((member)=> member!==user._id)
      socket.current.emit("sendMessage",{
        senderId:user._id,
        receiverId,
        text:newMessage
      })
      
      try {
        const res = await axios.post(API+"/messages",message);
        setMessages([...messages,res.data]);
        setNewMessage("");
      } catch (error) {
        console.log(error)
      }
      }
    }

    useEffect(()=>{
      scrollRef.current?.scrollIntoView({behavior:"smooth"}) 
    },[messages])

  return (
      <>
      <Topbar/>
      <div className='messenger'>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder='Search for friends' type="text" className="chatMenuInput" />
               {conversations.map((c)=>(
                 <div key={c._id} onClick={()=>setCurrentChat(c)}>
                    <Conversation key={c._id} currentUser={user} conversation={c}/>
                 </div>   
               ))}
               
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
              { currentChat ?
                <>
                <div className="chatBoxTop">
                  {messages.map(m=>(
                    <div key={m._id} ref={scrollRef}>
                     <Message key={m._id} own={m.sender===user._id} message={m}/>
                     </div>
                  ))}
                   
                </div>
                <div className="chatBoxBottom">
                    <textarea className='chatMessageInput' value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} placeholder='write something ... '></textarea>
                    <button className='chatSubmittButton' onClick={handleSubmit}>Send</button>
                </div>
                </> : <span className='noConversationText'>Open a <br/> Conversation<br/> to start a chat.</span>

              }
                
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
            <ChatOnline
              key={user._id}
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
            </div>
        </div>
      </div>
      </>
    
  )
}

export default Messenger