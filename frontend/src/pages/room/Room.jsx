import React, {useCallback, useEffect,useRef} from 'react'
import peer from "../../service/peer";
import { useState } from 'react';
import { useSocket } from '../../context/Socket'
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import {PhoneIncoming, PhoneMissed, PhoneOff, PhoneOutgoing, VideoOff} from 'react-feather';
// import { useHistory } from "react-router-dom";

import './room.css';

// Manage the whole call
const RoomPage = () => {
    const navigate = useNavigate();
    const socket = useSocket();
    const [remoteSocketId,setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState()
    const [remoteStream, setRemoteStream] = useState()
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoDisabled, setIsVideoDisabled] = useState(false);
    const [isCallInProgress, setIsCallInProgress] = useState(false);
    const [isIncommingCall, setIsIncommingCall] = useState(false);
    // const ringtoneRef = useRef();
    // const history = useHistory()


    const handleUserJoined = useCallback(({email,id})=>{
        console.log(`Email ${email} joined`);
        setRemoteSocketId(id);
},[])

// Function to create offer and pass offer to socket server and set current stream to hook
const handleCallUser = useCallback(async () =>{
    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio:true});
    const offer = await peer.getOffer();
    socket.emit("user:call",{to: remoteSocketId, offer});
    setMyStream(stream);
    // setIsCallInProgress(true);
},[remoteSocketId,socket]);

    // 
const handleIncommingCall = useCallback(async ({from, offer})=>{
    setRemoteSocketId(from);
    const stream = await navigator.mediaDevices.getUserMedia({video: true, audio:true});
    setMyStream(stream);
    setIsIncommingCall(true);
    // Play the ringtone
    // ringtoneRef.current.play();
    console.log("incomming call from ",from,offer);
    console.log("Is this defined ",offer);
    const ans = await peer.getAnswer(offer);
    socket.emit("call:accepted",{to:from,ans});

},[socket])

// Send the Stream after call get's accepted
const sendStream = useCallback( ()=>{
    // Sending Streams here
    // setIsCallInProgress(true);
    if(!myStream){
        console.log(myStream);
    }
    setIsIncommingCall(false);
    setIsCallInProgress(true);
    for(const track of myStream.getTracks()){
        peer.peer.addTrack(track,myStream);
    }
},[myStream])

const handleCallAccepted = useCallback(({from,ans})=>{
    peer.setLocalDescription(ans);
    console.log("Call Accepted");
      // Stop the ringtone
    //   ringtoneRef.current.pause();
    //   ringtoneRef.current.currentTime = 0;
    sendStream();
    
},[sendStream])


// Next useEffect for negotiation connection(reconnection)
const handleNegoNeeded = useCallback(async ()=>{
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed",{offer, to: remoteSocketId});
},[remoteSocketId,socket]);


const handleNegoIncomming = useCallback(async ({from,offer})=>{
    const ans = await peer.getAnswer(offer);
    socket.emit("peer:nego:done",{to: from, ans});
},[socket])

const handleNegoNeedFinal = useCallback( async ({from, ans})=>{
await peer.setLocalDescription(ans);
},[])



const toggleAudio = useCallback(() => {
    if (myStream) {
        myStream.getAudioTracks().forEach(track => {
            track.enabled = !isAudioMuted;
        });
        setIsAudioMuted(!isAudioMuted);
    }
},[myStream,isAudioMuted]);

const toggleVideo = useCallback(() => {
    if (myStream) {
        myStream.getVideoTracks().forEach(track => {
            track.enabled = !isVideoDisabled;
        });
        setIsVideoDisabled(!isVideoDisabled);
    }
},[myStream, isVideoDisabled]);






const handleEndCall = useCallback( async ()=>{
    if(myStream)
    {
        myStream.getTracks().forEach(track=>track.stop());
    }
    if(remoteSocketId){
        socket.emit('call:end',{to: remoteSocketId});

    }
    
    
    setRemoteSocketId(null);
    setMyStream(null);
    setRemoteStream(null);
    setIsCallInProgress(false);
    navigate(-1);
    // history.goBack();
},[myStream, remoteSocketId, socket])


const handleCallEndResponse = useCallback(async ()=>{
    if(myStream)
    {
        myStream.getTracks().forEach(track=>track.stop());
    }
    if(remoteSocketId){
        socket.emit('call:end',{to: remoteSocketId});

    }

    setRemoteSocketId(null);
    setMyStream(null);
    setRemoteStream(null);
    setIsCallInProgress(false);
    navigate(-1);
    history.goBack();
},[myStream, remoteSocketId, socket]);

useEffect(()=>{
peer.peer.addEventListener('negotiationneeded',handleNegoNeeded);

return ()=>{
    peer.peer.removeEventListener('negotiationneeded',handleNegoNeeded);
}
},[handleNegoNeeded])



// next useEffect for listening the track from another user

// Whenever incoming stream is detected by track event set to remote stream
useEffect(()=>{
    peer.peer.addEventListener('track', async ev=>{
        const remoteStream = ev.streams;
        console.log("Got Tracks")
        setRemoteStream(remoteStream[0]);
    })
},[])




// All socket events are received here
useEffect(()=>{
    socket.on('user:joined',handleUserJoined);
    socket.on("incomming:call",handleIncommingCall)
    socket.on('call:accepted',handleCallAccepted);
    socket.on('peer:nego:needed',handleNegoIncomming);
    socket.on('peer:nego:final',handleNegoNeedFinal);
    socket.on('call:end',handleCallEndResponse);
    
    return ()=>{
        socket.off('user:joined',handleUserJoined);
        socket.off("incomming:call",handleIncommingCall)
        socket.off('call:accepted',handleCallAccepted);
        socket.off('peer:nego:needed',handleNegoIncomming);
        socket.off('peer:nego:final',handleNegoNeedFinal);
        socket.off('call:end',handleCallEndResponse);
    }
},[socket,handleUserJoined,handleIncommingCall,handleNegoNeedFinal,handleCallAccepted,handleNegoIncomming,handleCallEndResponse])
  return (
    <div className='room-container'>
  <div className="title">
     <h1 >Call Panel</h1>
    </div> 
    <div className="connectionStatus">
    <h4>Connection Status:{remoteSocketId ? "Connected" : "No one in room"}</h4>
    </div>
<div className="connectionDescription">
    <h4>{remoteSocketId ? "Another user is connected you can call any time" : "Wait Until Admin Calls You"}</h4>
</div>


    

    {remoteSocketId && !isIncommingCall && !isCallInProgress && <div className='callNowBtn'><button className='btn green' onClick={handleCallUser}><PhoneOutgoing/> </button><span>Call</span></div>}
   
    {myStream && (
      <div className='local'>
        <h1>My Stream</h1>
        <ReactPlayer
          playing
          muted
          height="500px"
          width="800px"
          url={myStream}
        />
        <div className='receiveEndCallBtn'>
            {console.log("Incomming call", isIncommingCall, "callProgress",isCallInProgress)}
    {isIncommingCall && !isCallInProgress &&  <div className='receiveCallBtn'><button className='btn green' onClick={sendStream}><PhoneIncoming/> </button><span>Receive</span></div>}
    {remoteSocketId && !isCallInProgress && isIncommingCall && <div className='endCallBtn'><button className='btn red' onClick={handleEndCall}><PhoneMissed/></button><span>End Call</span></div>}
    {/* {isIncommingCall && <audio ref={ringtoneRef} loop>
            
                <source src="/sound/hangout_video_call.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
    } */}

        </div>
    <div className='control-btns'>
    {remoteSocketId && isCallInProgress && !isIncommingCall && <button className='btn grey' onClick={toggleVideo}><VideoOff/></button>}
    {remoteSocketId && isCallInProgress && !isIncommingCall && <button className='btn grey' onClick={toggleAudio}><PhoneOff/></button>}
    {remoteSocketId && isCallInProgress && !isIncommingCall && <button className='btn red' onClick={handleEndCall}><PhoneMissed/></button>}
    </div>
      </div>
    )}
    {remoteStream && (
      <>
        <h1>Remote Stream</h1>
        <ReactPlayer
          playing
          muted
          height="500px"
          width="800px"
          url={remoteStream}
        />
      </>
    )}
  </div>
  ) 
}

export default RoomPage