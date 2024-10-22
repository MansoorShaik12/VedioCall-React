import React, { useEffect, useRef, useState } from "react";
import { FiLink } from "react-icons/fi";
import { MdOutlineCallEnd } from "react-icons/md";
import { FiMic } from "react-icons/fi";
import { FiMicOff } from "react-icons/fi";
import { BsCameraVideo } from "react-icons/bs";
import { BsCameraVideoOff } from "react-icons/bs";

const Calling = ({ link, stopVideoCall, localStream, isCameraOn, userColorRef, currentUser,
    toggleMic, toggleCamera, isMicOn, onclickstart, isAdmin }) => {

    const [copyStatus, setCopyStatus] = useState("Copy Link");
    const userVideoRef = useRef(null);

    useEffect(() => {
        if (userVideoRef.current && localStream) {
            userVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(link);
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus("Copy Link"), 2000);
    };

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-100">
                <div
                    className="bg-white overflow-auto rounded"
                    style={{ width: "87%", height: "84%" }}>
                    <div className="justify-center items-center mx-40">


                        <div className="flex">
                            <div className="bg-gray-300 w-full h-72 rounded-lg text-white mt-5">
                                <video
                                    ref={userVideoRef}
                                    autoPlay
                                    muted
                                    className="w-full h-full object-cover shadow-lg rounded"
                                    style={{ display: isCameraOn ? 'block' : 'none', height: '100%', width: '100%' }}
                                />
                                {!isCameraOn && (
                                    <div className="flex items-center justify-center w-full h-full">
                                        <div className="w-32 h-32 text-7xl flex items-center bg-white justify-center rounded-full uppercase text-center" style={{ backgroundColor: userColorRef.current }}>
                                            {currentUser?.userName.charAt(0)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center mt-5 space-x-6">
                            <button onClick={toggleMic} className="flex flex-col items-center">
                                {isMicOn ? (
                                    <FiMic className="w-5 h-5" />
                                ) : (
                                    <FiMicOff className="w-5 h-5" />
                                )}
                                <span className="text-xs">Mic</span>
                            </button>
                            <button onClick={toggleCamera} className="flex flex-col items-center">
                                {isCameraOn ? (
                                    <BsCameraVideo className="w-5 h-5" />
                                ) : (
                                    <BsCameraVideoOff className="w-5 h-5" />
                                )}
                                <span className="text-xs">Camera</span>
                            </button>
                            <button onClick={stopVideoCall} className="flex flex-col items-center">
                                <MdOutlineCallEnd className="w-5 h-5 text-white bg-red-500 p-1 rounded-full" />
                                <span className="text-xs">Leave</span>
                            </button>
                        </div>
                        {!isAdmin && (
                            <div className=" flex justify-end -mt-11">
                                <button
                                    onClick={onclickstart}
                                    className="text-white bg-sky-500 px-5 py-2 rounded-lg"
                                >
                                    Start
                                </button>
                            </div>
                        )}
                        {isAdmin && (
                            <>
                                <p className="mt-3 text-sm">
                                    Please share this interview link with anyone you want to include in the interview
                                </p>

                                <div className="flex justify-between mt-3 gap-56 mb-5 text-sm">
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            value={link}
                                            className="border border-gray-400 rounded-full text-sm px-4 py-2 w-full"
                                            readOnly
                                        />
                                        <button
                                            onClick={handleCopyLink}
                                            className="absolute right-0 top-0 text-white bg-sky-500 border border-sky-500 rounded-full px-4 py-2 flex items-center space-x-2 hover:bg-sky-600 transition-all duration-300"
                                        >
                                            <FiLink />
                                            <span className="text-sm">{copyStatus}</span>
                                        </button>
                                    </div>

                                    <button
                                        onClick={onclickstart}
                                        className="text-white bg-sky-500 px-5 py-2 rounded-lg mr-6"
                                    >
                                        Start
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calling;