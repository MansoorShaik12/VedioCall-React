
import React, { useEffect, useRef } from "react";
import { FiMic } from "react-icons/fi";
import { FiMicOff } from "react-icons/fi";
const Video1 = ({ peer, userName, className, isPeerMicOn }) => {
    const ref = useRef();

    useEffect(() => {
        peer.on('stream', (stream) => {
            ref.current.srcObject = stream;
        });
    }, [peer]);

    return (
        <div className="relative w-full h-full">
            <video ref={ref} autoPlay className={className} />
            <div className="absolute left-2 bottom-2 bg-black rounded-lg bg-opacity-50 text-white text-sm p-1 px-3 flex items-center">
                <span>{userName}</span>
                {isPeerMicOn ? (
                    <FiMic className="ml-2 text-sm text-white" />
                ) : (
                    <FiMicOff className="ml-2 text-sm text-white" />
                )}
            </div>

        </div>
    );
};
export default Video1;