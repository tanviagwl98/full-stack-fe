import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {createSocketConnection} from "../utils/socket"
import { useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import getRelativeTime
 from '../utils/timeStampConversion'
const Chat = () => {
  const {targetUserId} = useParams()
  const [message, setMessage] = useState("")
  const [receivedMessages, setReceivedMessages] = useState([])
  const user = useSelector((store) => store.user)
  const userId = user?._id


  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });


    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt } = msg;
      const timeMessageReceived = getRelativeTime(createdAt);

      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        timeMessageReceived,
      };
    });
    console.log(chatMessages)
    setReceivedMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages()
  }, [])

  useEffect(() => {
    if(!userId){
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", 
      {firstName: user?.firstName, 
        userId, 
        targetUserId
      })

    socket.on("messageReceived",({firstName, lastName, text}) => {
      console.log(firstName + " : " + text)
      setReceivedMessages((messages) => [...messages, { firstName, lastName, text }]);
    } )
    return () => {
      socket.disconnect();
    }
  }, [userId, targetUserId])

  const handleMessageSend = async() =>{
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName:user?.lastName, 
      userId, 
      targetUserId, 
      text:message
    })
    setMessage("")

    // return () => {
    //   socket.disconnect();
    // }
  }
  return (
    <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
      
    <h1 className='border-b p-5 border-gray-600 text-4xl'>Chat</h1>
    <div className='flex-1 overflow-scroll p-5'>
      {receivedMessages.map((msg, index) => {
        return(
          <div key={index} className={"chat " + (user.firstName== msg.firstName ? "chat-start" : "chat-end")}>
            <div className="chat-header">
                {msg.firstName} {msg.lastName}
                <time className="text-xs opacity-50">{msg?.timeMessageReceived}</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        )
      })}
    </div>
    <div className="p-5 border-t border-gray-600 flex gap-2 items-center">
      <input className="text-white input p-2 flex-1 border-gray-400" value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button className="btn btn-primary m-2" onClick={() => handleMessageSend()}>Send</button>
    </div>

    </div>
  )
}

export default Chat