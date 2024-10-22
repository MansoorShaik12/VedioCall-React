

// import React, { useState, useEffect, useRef } from "react";
// import { MdOutlineMessage, MdOutlinePeopleAlt, MdOutlineCallEnd } from "react-icons/md";
// import { AiOutlineClose } from "react-icons/ai";
// import { FiMic } from "react-icons/fi";
// import { FiMicOff } from "react-icons/fi";
// import { BsCameraVideo } from "react-icons/bs";
// import { BsCameraVideoOff } from "react-icons/bs";
// import { FiShare } from "react-icons/fi";
// import { RiFeedbackLine } from "react-icons/ri";
// import { BsQuestionSquare } from "react-icons/bs";
// import io from 'socket.io-client';
// import Peer from 'simple-peer';
// import Video1 from './Video';
// import process from 'process';
// import Feedbackform from "./Feedbakfrom"
// import InterviewQA from "./Call_InterviewQA";
// import { FiVideo } from "react-icons/fi";
// import CallPopup from "./Startcallpopup";

// const configuration = {
//     iceServers: [
//         { urls: 'stun:stun.l.google.com:19302' },
//     ]
// };

// const socket = io('http://localhost:3001', { transports: ['websocket', 'polling'] });
// window.process = process;

// const CandidateVC = () => {
//     const [link, setLink] = useState('');
//     const [peers, setPeers] = useState([]);
//     const [roomId, setRoomId] = useState(null);
//     const [isAdmin, setIsAdmin] = useState(true);
//     const userVideo = useRef(null);
//     const peersRef = useRef([]);
//     const socketRef = useRef();
//     const localStreamRef = useRef();
//     const [messageInput, setMessageInput] = useState('');
//     const [messages, setMessages] = useState([]);
//     const messagesEndRef = useRef(null);
//     const [participants, setParticipants] = useState([]);
//     const [userName, setUserName] = useState('');
//     const [userNames, setUserNames] = useState({});
//     const [isChatOpen, setIsChatOpen] = useState(false);
//     const pc = new RTCPeerConnection(configuration);
//     const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);
//     const [isMaincontenthide, setIsMaincontenthide] = useState(false)
//     const toggleChat = () => {
//         setIsChatOpen(!isChatOpen);
//         setIsPeopleOpen(false);
//         setIsFeedbackOpen(false);
//         setIsInterviewQuestionsOpen(false);
//     };


//     const constraints = {
//         video: {
//             width: { ideal: 1280 },
//             height: { ideal: 720 },
//             frameRate: { ideal: 30, max: 60 }
//         },
//         audio: true
//     };

//     navigator.mediaDevices.getUserMedia(constraints)
        
//     setInterval(() => {
//         pc.getStats(null).then(stats => {
//             stats.forEach(report => {
//                 if (report.type === 'inbound-rtp' && report.kind === 'video') {
//                     const userStats = {
//                         userId: 'your-user-id',
//                         bitrate: report.bitrate,
//                         jitter: report.jitter,
//                         packetsLost: report.packetsLost
//                     };
//                     socket.emit('send-stats', userStats);
//                 }
//             });
//         });
//     }, 5000);


//     useEffect(() => {
//         const name = prompt("Please enter your name:");
//         setUserName(name);
//         console.log("User Name Set:", name);
//         socketRef.current = io('http://localhost:3001', { transports: ['websocket', 'polling'] });

//         socketRef.current.on('chat-message', ({ userId, userName, message, timestamp }) => {
//             setMessages((prevMessages) => [...prevMessages, { userId, userName, message, timestamp }]);
//         });

//         return () => {
//             socketRef.current.disconnect();
//         };
//     }, []);

//     useEffect(() => {
//         socketRef.current = io('http://localhost:3001', { transports: ['websocket', 'polling'] });

//         socketRef.current.on('connect', () => {
//             console.log('Connected to WebSocket server');
//         });

//         socketRef.current.on('disconnect', () => {
//             console.log('Disconnected from WebSocket server');
//             setTimeout(() => {
//                 socketRef.current.connect();
//             }, 1000);
//         });

//         socketRef.current.on('error', (error) => {
//             console.error('WebSocket error:', error);
//         });

//         socketRef.current.on('admin-status', ({ userId, isAdmin }) => {
//             setIsAdmin(isAdmin);
//         });

//         socketRef.current.on('receive-message', (msg) => {
//             if (msg.sender !== userName) {
//                 setMessages((prevMessages) => [...prevMessages, msg]);
//             }
//         });

//         return () => {
//             socketRef.current.disconnect();
//         };
//     }, [userName]);
//     useEffect(() => {
//         if (userName) {
//             const urlParams = new URLSearchParams(window.location.search);
//             const roomIdFromUrl = urlParams.get('roomId');

//             if (roomIdFromUrl) {
//                 setRoomId(roomIdFromUrl);
//                 startCall(roomIdFromUrl);
//             } else {
//                 const newRoomId = generateShortId();
//                 setRoomId(newRoomId);
//                 window.history.pushState(null, '', `?roomId=${newRoomId}`);
//                 setIsAdmin(true);
//                 startCall(newRoomId);
//                 const newLink = `${window.location.href}`;
//                 setLink(newLink);
//             }
//         }

//         socketRef.current.on('mute-all', (mute) => {
//             if (!isAdmin) {
//                 setIsMicOn(!mute);
//                 const audioTracks = localStreamRef.current.getAudioTracks();
//                 if (audioTracks.length > 0) {
//                     audioTracks[0].enabled = !mute;
//                 }
//             }
//         });

//         socketRef.current.on('participant-list', (participants) => {
//             setParticipants(participants);
//             const currentUser = participants.find(participant => participant.userName === userName);
//             if (currentUser) {
//                 setIsMicOn(!currentUser.muted);
//                 const audioTracks = localStreamRef.current.getAudioTracks();
//                 if (audioTracks.length > 0) {
//                     audioTracks[0].enabled = !currentUser.muted;
//                 }
//             }
//         });
//     }, [userName]);
//     const generateShortId = () => {
//         return Math.random().toString(36).substring(2, 8);
//     };

//     const createPeer = (userToSignal, callerID, stream) => {
//         const peer = new Peer({
//             initiator: true,
//             trickle: false,
//             stream,
//         });

//         peer.on('signal', (signal) => {
//             socketRef.current.emit('sending-signal', { userToSignal, callerID, signal });
//         });

//         return peer;
//     };

//     const addPeer = (incomingSignal, callerID, stream) => {
//         const peer = new Peer({
//             initiator: false,
//             trickle: false,
//             stream,
//         });

//         peer.on('signal', (signal) => {
//             socketRef.current.emit('returning-signal', { signal, callerID });
//         });

//         peer.signal(incomingSignal);

//         return peer;
//     };

//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//         }
//     }, [messages]);

//     const [time, setTime] = useState(0);
//     const [isMicOn, setIsMicOn] = useState(true);
//     const [isCameraOn, setIsCameraOn] = useState(true);
//     const [isScreenSharingOn, setIsScreenSharingOn] = useState(false);
//     const [localStream, setLocalStream] = useState(null);
//     const [screenStream, setScreenStream] = useState(null);
//     const [isPeopleOpen, setIsPeopleOpen] = useState(false);
//     const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
//     const [isInterviewQuestionsOpen, setIsInterviewQuestionsOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [isAllMuted, setIsAllMuted] = useState(false);

//     const startCall = (roomId) => {
//         setIsCallPopupOpen(true);
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
//             localStreamRef.current = stream;
//             setLocalStream(stream);
//             if (userVideo.current) {
//                 userVideo.current.srcObject = stream;
//             }
//             socketRef.current.emit('join-room', roomId, socketRef.current.id, userName);

//             socketRef.current.on('user-connected', ({ userId, userName, isAdmin }) => {
//                 console.log("User Connected Event Received:", userId, userName); // Log user connection
//                 const peer = createPeer(userId, socketRef.current.id, stream);
//                 peersRef.current.push({
//                     peerID: userId,
//                     peer,
//                 });
//                 setPeers((prevPeers) => [...prevPeers, peer]);
//                 setUserNames((prevUserNames) => ({ ...prevUserNames, [userId]: userName }));
//             });

//             socketRef.current.on('receiving-signal', (payload) => {
//                 const peer = addPeer(payload.signal, payload.callerID, stream);
//                 peersRef.current.push({
//                     peerID: payload.callerID,
//                     peer,
//                 });
//                 setPeers(peersRef.current.map((p) => p.peer));
//             });

//             socketRef.current.on('user-disconnected', (userId) => {
//                 const peerObj = peersRef.current.find((p) => p.peerID === userId);
//                 if (peerObj && peerObj.peer) {
//                     peerObj.peer.destroy();
//                     peersRef.current = peersRef.current.filter((p) => p.peerID !== userId);
//                     setPeers(peersRef.current.map((p) => p.peer));
//                 }
//             });

//             socketRef.current.on('receiving-returned-signal', (payload) => {
//                 const item = peersRef.current.find((p) => p.peerID === payload.id);
//                 if (item && item.peer) {
//                     item.peer.signal(payload.signal);
//                 }
//             });

//             socketRef.current.on('end-call', () => {
//                 stopVideoCall();
//             });

//             return () => {
//                 socketRef.current.disconnect();
//             };

//         });
//     };
//     const stopVideoCall = () => {
//         socketRef.current.disconnect();
//         setPeers([]);
//         setRoomId(null);

//         setTime(0);
//         setIsPeopleOpen(false);
//         setIsFeedbackOpen(false);
//         setIsInterviewQuestionsOpen(false);

//         if (localStreamRef.current) {
//             localStreamRef.current.getTracks().forEach((track) => track.stop());
//         }

//         userVideo.current.srcObject = null;
//         peersRef.current = [];

//         window.location.href = '/home';
//     };
//     const toggleMic = () => {
//         const audioTracks = localStreamRef.current.getAudioTracks();
//         if (audioTracks.length === 0) return;

//         const newMicStatus = !isMicOn;
//         audioTracks[0].enabled = newMicStatus;
//         setIsMicOn(newMicStatus);

//         socketRef.current.emit('toggle-mic', socketRef.current.id, !newMicStatus);
//     };


//     const toggleCamera = () => {
//         const videoTracks = localStreamRef.current.getVideoTracks();
//         if (videoTracks.length === 0) return;

//         const enabled = videoTracks[0].enabled;
//         videoTracks[0].enabled = !enabled;
//         setIsCameraOn(!enabled);

//         peersRef.current.forEach(peerObj => {
//             const sender = peerObj.peer.streams[0].getVideoTracks()[0];
//             sender.enabled = !enabled;
//         });

//         socketRef.current.emit('toggle-video', socketRef.current.id, !enabled);

//         if (userVideo.current) {
//             userVideo.current.srcObject = null;
//             userVideo.current.srcObject = localStreamRef.current;
//             userVideo.current.play();
//         }
//     };

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTime((prevTime) => prevTime + 1);
//         }, 1000);
//         return () => clearInterval(timer);
//     }, []);




//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then((stream) => {
//                 setLocalStream(stream);
//             })
//             .catch((error) => {
//                 console.error("Error accessing media devices:", error);
//             });
//     }, []);

//     const startScreenSharing = () => {
//         navigator.mediaDevices.getDisplayMedia({ video: true })
//             .then((stream) => {
//                 setScreenStream(stream);
//                 setIsScreenSharingOn(true);

//                 peersRef.current.forEach(peerObj => {
//                     const sender = peerObj.peer.streams[0].getVideoTracks()[0];
//                     peerObj.peer.replaceTrack(sender, stream.getVideoTracks()[0], peerObj.peer.streams[0]);
//                 });

//                 if (userVideo.current) {
//                     userVideo.current.srcObject = stream;
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error accessing display media:", error);
//             });
//     };

//     const [videoOnParticipants, setVideoOnParticipants] = useState({});


//     const handleVideo = (participant) => {
//         setVideoOnParticipants((prevVideoOn) => ({ ...prevVideoOn, [participant]: !prevVideoOn[participant] }));
//     };
    
//     const stopScreenSharing = () => {
//         if (screenStream) {
//             screenStream.getTracks().forEach(track => track.stop());
//             setScreenStream(null);
//             setIsScreenSharingOn(false);

//             peersRef.current.forEach(peerObj => {
//                 const sender = peerObj.peer.streams[0].getVideoTracks()[0];
//                 peerObj.peer.replaceTrack(sender, localStreamRef.current.getVideoTracks()[0], peerObj.peer.streams[0]);
//             });

//             if (userVideo.current) {
//                 userVideo.current.srcObject = localStreamRef.current;
//             }
//         }
//     };
//     const handleScreenShareToggle = () => {
//         if (isScreenSharingOn) {
//             stopScreenSharing();
//         } else {
//             startScreenSharing();
//         }
//     };


//     const togglePeople = () => {
//         setIsPeopleOpen(!isPeopleOpen);
//         setIsFeedbackOpen(false);
//         setIsInterviewQuestionsOpen(false);
//         setIsChatOpen(false);
//     };


//     const toggleFeedback = () => {
//         setIsFeedbackOpen(!isFeedbackOpen);
//         setIsPeopleOpen(false);
//         setIsInterviewQuestionsOpen(false);
//         setIsChatOpen(false);
//     };
//     const toggleInterviewQuestions = () => {
//         setIsInterviewQuestionsOpen(!isInterviewQuestionsOpen);
//         setIsPeopleOpen(false);
//         setIsFeedbackOpen(false);
//         setIsChatOpen(false);
//     };

//     const [availableHeight, setAvailableHeight] = useState(window.innerHeight - 80);

//     useEffect(() => {
//         const handleResize = () => {
//             const navbarHeight = 80;
//             setAvailableHeight(window.innerHeight - navbarHeight);
//         };

//         window.addEventListener('resize', handleResize);
//         handleResize();

//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const sendMessage = () => {
//         if (messageInput.trim() !== "") {
//             const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time to HH:MM
//             const msg = { sender: userName, text: messageInput, time };
//             setMessages((prevMessages) => [...prevMessages, { ...msg, sender: "me" }]);
//             socketRef.current.emit("send-message", { roomId, userName, message: messageInput, time });
//             setMessageInput("");
//         }
//     };

//     const isPeerMicOn = (userId) => {
//         const participant = participants.find(p => p.userId === userId);
//         return participant ? !participant.muted : true;
//     };

//     const isPeerCameraOn = (userId) => {
//         const participant = participants.find(p => p.userId === userId);
//         return participant ? participant.videoOn : true;
//     };

//     const handleMuteAll = (mute) => {
//         socketRef.current.emit('mute-all', roomId, mute);
//         setIsAllMuted(mute);
//     };
//     const handleToggleMic = (userId, muted) => {
//         if (isAdmin) {
//             socketRef.current.emit('toggle-mic', userId, muted);

//             setParticipants((prevParticipants) => {
//                 const updatedParticipants = prevParticipants.map((participant) => {
//                     if (participant.userId === userId) {
//                         return { ...participant, muted };
//                     }
//                     return participant;
//                 });

//                 const allUnmuted = updatedParticipants.every((participant) => !participant.muted);
//                 if (allUnmuted) {
//                     setIsAllMuted(false);
//                 }

//                 return updatedParticipants;
//             });
//         }
//     };

//     const currentUser = participants.find(participant => participant.userName === userName);
//     const otherParticipants = participants.filter(participant => participant.userName !== userName);

//     const getRandomColor = () => {
//         const letters = '0123456789ABCDEF';
//         let color = '#';
//         for (let i = 0; i < 6; i++) {
//             color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     };
//     const userColorRef = useRef(getRandomColor());


//     const [isRecording, setIsRecording] = useState(false);
//     const [recordingTime, setRecordingTime] = useState(0);
//     const mediaRecorderRef = useRef(null);
//     const recordedChunksRef = useRef([]);
//     const timerRef = useRef(null);

//     const startRecording = async () => {
//         try {
//             const screenStream = await navigator.mediaDevices.getDisplayMedia({
//                 video: true,
//                 audio: true
//             });

//             const audioStream = await navigator.mediaDevices.getUserMedia({
//                 audio: true
//             });

//             const combinedStream = new MediaStream([
//                 ...screenStream.getVideoTracks(),
//                 ...audioStream.getAudioTracks()
//             ]);

//             const options = { mimeType: "video/webm; codecs=vp9" };
//             const mediaRecorder = new MediaRecorder(combinedStream, options);

//             mediaRecorder.ondataavailable = (event) => {
//                 if (event.data.size > 0) {
//                     recordedChunksRef.current.push(event.data);
//                 }
//             };

//             mediaRecorder.onstop = () => {
//                 const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
//                 const url = URL.createObjectURL(blob);
//                 const a = document.createElement("a");
//                 a.style.display = "none";
//                 a.href = url;
//                 a.download = "recording.webm";
//                 document.body.appendChild(a);
//                 a.click();
//                 window.URL.revokeObjectURL(url);
//                 recordedChunksRef.current = [];
//             };

//             mediaRecorder.start();
//             mediaRecorderRef.current = mediaRecorder;
//             setIsRecording(true);
//             setRecordingTime(0);

//             timerRef.current = setInterval(() => {
//                 setRecordingTime((prevTime) => prevTime + 1);
//             }, 1000);
//         } catch (err) {
//             console.error("Error: " + err);
//         }
//     };

//     const stopRecording = () => {
//         if (mediaRecorderRef.current) {
//             mediaRecorderRef.current.stop();
//             setIsRecording(false);
//             clearInterval(timerRef.current);
//         }
//     };
//     const formatTime = (timeInSeconds) => {
//         const minutes = Math.floor(timeInSeconds / 60);
//         const seconds = timeInSeconds % 60;
//         return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
//     };

//     const onclickstart = () => {
//         setIsCallPopupOpen(false);
//         setTime(0);
//         setIsMaincontenthide(true);
//     };

//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;

//     return (
//         <div className="flex flex-col h-screen bg-gray-100">
//             <>
//                 {isMaincontenthide && (
//                     <div className="flex flex-grow">
//                         <div className={`flex-grow flex-col transition-width duration-300`}>
//                             <>
//                                 <div className="bg-white px-6 shadow-md h-20 flex items-center justify-between">
//                                     <p className="font-semibold text-xl">
//                                         {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} `}
//                                     </p>
//                                     <div className="flex space-x-4 items-center">
//                                         <button onClick={toggleChat} className="flex flex-col items-center">
//                                             <MdOutlineMessage className="w-5 h-5" />
//                                             <span className="text-xs">Chat</span>
//                                         </button>
//                                         <button onClick={togglePeople} className="flex flex-col items-center">
//                                             <MdOutlinePeopleAlt className="w-5 h-5" />
//                                             <span className="text-xs">People</span>
//                                         </button>
//                                         {isAdmin && (
//                                             <>
//                                                 <button onClick={toggleInterviewQuestions} className="flex flex-col items-center">
//                                                     <BsQuestionSquare className="w-5 h-5 mb-1 mt-5" />
//                                                     <span className="text-xs">Interview <br />Questions</span>
//                                                 </button>
//                                                 <button onClick={toggleFeedback} className="flex flex-col items-center">
//                                                     <RiFeedbackLine className="w-5 h-5" />
//                                                     <span className="text-xs">Feedback</span>
//                                                 </button>
//                                             </>
//                                         )}
//                                         <div className="h-10 border-l border-gray-500" />
//                                         <button onClick={toggleCamera} className="flex flex-col items-center">
//                                             {isCameraOn ? (
//                                                 <BsCameraVideo className="w-5 h-5" />
//                                             ) : (
//                                                 <BsCameraVideoOff className="w-5 h-5" />
//                                             )}
//                                             <span className="text-xs">Camera</span>
//                                         </button>


//                                         <button onClick={toggleMic} className="flex flex-col items-center">
//                                             {isMicOn ? (
//                                                 <FiMic className="w-5 h-5" />
//                                             ) : (
//                                                 <FiMicOff className="w-5 h-5" />
//                                             )}
//                                             <span className="text-xs">Mic</span>
//                                         </button>
//                                         <button onClick={handleScreenShareToggle} className="flex flex-col items-center">
//                                             <FiShare className="w-5 h-5" />
//                                             <span className="text-xs">{isScreenSharingOn ? 'Stop Sharing' : 'Share'}</span>
//                                         </button>
//                                         {isAdmin && (
//                                             <div className="flex flex-col items-center relative">
//                                                 <button onClick={isRecording ? stopRecording : startRecording} className="flex flex-col items-center">
//                                                     <FiVideo className={`w-5 h-5 ${isRecording ? "text-red-500" : "text-gray-800"}`} />
//                                                     <span className={`text-xs ${isRecording ? "text-red-500" : "text-gray-800"}`}>{isRecording ? 'Stop Recording' : 'Record'}</span>
//                                                 </button>
//                                                 {isRecording && (
//                                                     <div className=" text-xs text-red-500 absolute top-full left-1/2 transform -translate-x-1/2 whitespace-nowrap">
//                                                         Recording Time: {formatTime(recordingTime)}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         )}
//                                         <button onClick={stopVideoCall} className="flex flex-col items-center">
//                                             <MdOutlineCallEnd className="w-5 h-5 text-white bg-red-500 p-1 rounded-full" />
//                                             <span className="text-xs">Leave</span>
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div
//                                     className="flex-grow flex flex-col transition-width duration-300"
//                                     style={{ marginRight: isPeopleOpen || isChatOpen ? "25%" : isFeedbackOpen || isInterviewQuestionsOpen ? "40%" : "0", }}
//                                 >
//                                     <div className="flex-grow flex flex-col relative">
//                                         <div className="w-full h-full grid" style={{
//                                             gridTemplateColumns: peers.length === 1 ? '1fr' : `repeat(${Math.ceil(Math.sqrt(peers.length))}, 1fr)`,
//                                             gridTemplateRows: peers.length === 1 ? '1fr' : `repeat(${Math.ceil(peers.length / Math.ceil(Math.sqrt(peers.length)))}, 1fr)`,
//                                             height: availableHeight,
//                                         }}>
//                                             {peers.length === 0 ? (
//                                                 <div className="flex items-center justify-center w-full h-full relative flex-col">

//                                                     <div className="w-60 h-60 text-9xl flex items-center justify-center rounded-full uppercase text-center" style={{ backgroundColor: userColorRef.current }}>
//                                                         {userName && userName.charAt(0)}
//                                                     </div>
//                                                     <div className="mt-2 text-xl font-medium">{userName}</div>
//                                                     <div className="absolute left-2 bottom-2 bg-black rounded-lg bg-opacity-50 text-white text-sm p-1 px-3 flex items-center">
//                                                         <span>{userName}</span>
//                                                         {isMicOn ? (
//                                                             <FiMic className="ml-2 text-sm text-white" />
//                                                         ) : (
//                                                             <FiMicOff className="ml-2 text-sm text-white" />
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             ) : (
//                                                 peers.map((peer, index) => {
//                                                     const userId = peersRef.current[index].peerID;
//                                                     const userName = userNames[userId];
//                                                     const isCameraOn = isPeerCameraOn(userId);
//                                                     return (
//                                                         <div
//                                                             key={index}
//                                                             className="w-full h-full"
//                                                             style={{
//                                                                 height: peers.length === 1 ? '100%' : `calc(${availableHeight}px / ${Math.ceil(peers.length / Math.ceil(Math.sqrt(peers.length)))})`,
//                                                                 width: peers.length === 1 ? '100%' : 'auto'
//                                                             }}
//                                                         >
//                                                             {isCameraOn ? (
//                                                                 <Video1 peer={peer} userName={userName} isPeerMicOn={isPeerMicOn(userId)} className="w-full h-full object-cover" />
//                                                             ) : (
//                                                                 <div className="flex items-center justify-center w-full h-full relative flex-col">

//                                                                     <div className="w-60 h-60 text-9xl flex items-center justify-center rounded-full uppercase text-center" style={{ backgroundColor: userColorRef.current }}>
//                                                                         {userName && userName.charAt(0)}
//                                                                     </div>
//                                                                     <div className="mt-2 text-xl font-medium">{userName}</div>
//                                                                     <div className="absolute left-2 bottom-2 bg-black rounded-lg bg-opacity-50 text-white text-sm p-1 px-3 flex items-center">
//                                                                         <span>{userName}</span>
//                                                                         {isPeerMicOn(userId) ? (
//                                                                             <FiMic className="ml-2 text-sm text-white" />

//                                                                         ) : (

//                                                                             <FiMicOff className="ml-2 text-sm text-white" />

//                                                                         )}
//                                                                     </div>
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                     );
//                                                 })
//                                             )}
//                                         </div>

//                                         <div className="absolute bottom-2 right-2 w-1/4 h-1/4 z-50 bg-white border border-gray-400 rounded">
//                                             <video
//                                                 ref={userVideo}
//                                                 autoPlay
//                                                 muted
//                                                 className="w-full h-full object-cover shadow-lg rounded"
//                                                 style={{ display: isCameraOn ? 'block' : 'none' }}
//                                             />
//                                             {!isCameraOn && (
//                                                 <div className="flex items-center justify-center w-full h-full">
//                                                     <div className="w-14 h-14 text-4xl flex items-center bg-white justify-center rounded-full uppercase text-center" style={{ backgroundColor: userColorRef.current }}>
//                                                         {currentUser?.userName.charAt(0)}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </>
//                         </div>
//                     </div>

//                 )}

//                 {isPeopleOpen && (
//                     <div
//                         className="absolute bottom-0 right-0 h-[calc(100vh-80px)] bg-white border-t border-l border-gray-200 shadow-lg flex flex-col"
//                         style={{ width: "25%" }}
//                     >
//                         <div className="flex justify-between items-center p-4 border-b border-gray-200">
//                             <h2 className="text-lg font-semibold">People</h2>
//                             <button onClick={togglePeople}>
//                                 <AiOutlineClose className="w-5 h-5" />
//                             </button>
//                         </div>

//                         <div className="flex-grow p-4 overflow-y-auto">
//                             <div className="mb-4">
//                                 <input
//                                     type="search"
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                     placeholder="Search by name or email"
//                                     className="w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 hover:border-gray-500 rounded-md"
//                                 />
//                             </div>

//                             <div className="flex items-center mb-2">
//                                 <p className="text-gray-500">Currently in this call ({participants.length})</p>
//                                 {isAdmin && (
//                                     <button className="flex items-center space-x-1 ml-auto bg-blue-500 text-white text-sm p-2 rounded-lg" onClick={() => handleMuteAll(!isAllMuted)}>
//                                         {isAllMuted ? 'Unmute All' : 'Mute All'}
//                                     </button>
//                                 )}
//                             </div>

//                             <div>
//                                 {currentUser && (
//                                     <li key={currentUser.userId} className="flex items-center space-x-2 py-1">
//                                         <div className="flex-1">
//                                             <div className="flex items-center">
//                                                 <div className="w-8 h-8 flex items-center justify-center rounded-full uppercase text-center" style={{ backgroundColor: userColorRef.current }}>
//                                                     {currentUser.userName && currentUser.userName.charAt(0)}
//                                                 </div>
//                                                 <span className="ml-2">You</span>
//                                             </div>
//                                         </div>
//                                         <div className="ml-auto">
//                                             <button onClick={() => handleToggleMic(currentUser.userId, !currentUser.muted)}>
//                                                 {currentUser.muted ? (
//                                                     <FiMicOff className="w-4 h-4" />
//                                                 ) : (
//                                                     <FiMic className="w-4 h-4" />
//                                                 )}
//                                             </button>
//                                             <button className="ml-2" onClick={() => handleVideo(currentUser.userId)}>
//                                                 {isPeerCameraOn(currentUser.userId) ? (
//                                                     <BsCameraVideo className="w-4 h-4" />
//                                                 ) : (
//                                                     <BsCameraVideoOff className="w-4 h-4" />
//                                                 )}
//                                             </button>
//                                         </div>
//                                     </li>
//                                 )}

//                                 {otherParticipants
//                                     .filter((participant) => {
//                                         const searchTerm = searchQuery.toLowerCase();
//                                         const nameMatch = participant.userName ? participant.userName.toLowerCase().includes(searchTerm) : false;
//                                         return nameMatch;
//                                     })
//                                     .map((participant, index) => (
//                                         <li key={participant.userId} className="flex items-center space-x-2 py-1">
//                                             <div className="flex-1">
//                                                 <div className="flex items-center">
//                                                     <div className="w-8 h-8 flex items-center justify-center rounded-full uppercase text-center" style={{ backgroundColor: userColorRef.current }}>
//                                                         {participant.userName && participant.userName.charAt(0)}
//                                                     </div>
//                                                     <span className="ml-2">{participant.userName}</span>
//                                                 </div>
//                                             </div>
//                                             <div className="ml-auto">
//                                                 <button onClick={() => handleToggleMic(participant.userId, !participant.muted)}>
//                                                     {participant.muted ? (
//                                                         <FiMicOff className="w-4 h-4" />
//                                                     ) : (
//                                                         <FiMic className="w-4 h-4" />
//                                                     )}
//                                                 </button>
//                                                 <button className="ml-2" onClick={() => handleVideo(participant.userId)}>
//                                                     {isPeerCameraOn(participant.userId) ? (
//                                                         <BsCameraVideo className="w-4 h-4" />
//                                                     ) : (
//                                                         <BsCameraVideoOff className="w-4 h-4" />
//                                                     )}
//                                                 </button>
//                                             </div>
//                                         </li>
//                                     ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {isChatOpen && (
//                     <div
//                         className="absolute bottom-0 right-0 h-[calc(100vh-80px)] bg-white border-t border-l border-gray-200 shadow-lg flex flex-col"
//                         style={{ width: "25%" }}
//                     >
//                         <div className="flex justify-between items-center p-4 border-b border-gray-200">
//                             <h2 className="text-lg font-semibold">Chat</h2>
//                             <button onClick={toggleChat}>
//                                 <AiOutlineClose className="w-5 h-5" />
//                             </button>
//                         </div>
//                         <div className="flex-1 overflow-y-auto p-4" id="chat-messages">
//                             {messages.map((msg, index) => (
//                                 <div
//                                     key={index}
//                                     className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} `}
//                                 >
//                                     <div
//                                         className={`p - 2 rounded - lg mb - 2 ${msg.sender === "me" ? "bg-gray-200 p-2 rounded-lg mb-2" : "bg-gray-200"
//                                             } `}
//                                     >
//                                         {msg.sender !== "me" && (
//                                             <div className="font-semibold">{msg.sender}</div>
//                                         )}
//                                         <div>{msg.text}</div>
//                                         <div className="text-xs text-gray-500">{msg.time}</div>
//                                     </div>
//                                 </div>
//                             ))}
//                             <div ref={messagesEndRef} />
//                         </div>
//                         <div className="p-4 border-t border-gray-200">
//                             <input
//                                 type="text"
//                                 className="w-full p-2 border border-gray-300 rounded-lg"
//                                 placeholder="Type a message..."
//                                 value={messageInput}
//                                 onChange={(e) => setMessageInput(e.target.value)}
//                                 onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//                             />
//                             <button
//                                 className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg"
//                                 onClick={sendMessage}
//                             >
//                                 Send
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {isFeedbackOpen && (
//                     <Feedbackform toggleFeedback={toggleFeedback} />
//                 )}

//                 {isInterviewQuestionsOpen && <InterviewQA toggleInterviewQuestions={toggleInterviewQuestions} />}

//                 {isCallPopupOpen && <CallPopup
//                     link={link}
//                     stopVideoCall={stopVideoCall}
//                     localStream={localStream}
//                     isCameraOn={isCameraOn}
//                     userColorRef={userColorRef}
//                     currentUser={currentUser}
//                     toggleMic={toggleMic}
//                     toggleCamera={toggleCamera}
//                     isMicOn={isMicOn}
//                     onclickstart={onclickstart}
//                     isAdmin={isAdmin}
//                 />}

//             </>

//         </div>
//     );
// };

// export default CandidateVC;
import React from 'react'

const CandidateCV = () => {
  return (
    <div>CandidateCV</div>
  )
}

export default CandidateCV