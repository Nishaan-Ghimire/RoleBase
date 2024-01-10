import React from 'react'
import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { useSocket } from '../../../context/Socket'
import { useNavigate } from 'react-router-dom';
import './call.css';
import Header from '../Header';
import Sidebar from '../Sidebar';
const Call = () => {
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();
  const socket = useSocket();
  if (!socket) {
    console.error("Socket is null or undefined");
    return null; // or handle it appropriately
  }


  const handleSubmitForm = useCallback((e) => {
   
    console.log("This is a test one", email, room);
    socket.emit("room:join", { email, room });
  }, [email, room, socket]);

  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    console.log(email, room);
    navigate(`/room/${room}`);
  }, [navigate]);

  useEffect(() => {

     // Retrieve data from localStorage
     const userData = JSON.parse(localStorage.getItem('user'));

     // Set email from localStorage
     if (userData && userData.email) {
       setEmail(userData.email);
     }


      // Generate a random roomId
      // const randomRoomId = Math.random().toString(36).substring(7);
      const randomRoomId = 12345;
      setRoom(randomRoomId);



    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom, email, room]);

  return (
    
    <div>
         <Header/>
    <Sidebar />
      <h1>
        Join the call 
      </h1>

      <div className='btnParent'>
       

        
        <button className='callBtn' onClick={handleSubmitForm}>Join Call</button>
       
      </div>
    </div>
  )
}

export default Call;