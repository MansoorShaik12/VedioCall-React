import React from 'react';
import { useNavigate } from 'react-router-dom';

const VideoCallButton = () => {
    const navigate = useNavigate();

    const handleStartVideoCall = () => {
        navigate('/candidatevc');
    };

    return (
        <div className="flex justify-center">
            <button
                className="bg-blue-500 text-white px-4 py-2 mt-4 mb-4 rounded-md"
                onClick={handleStartVideoCall}
            >
                VideoCall
            </button>
        </div>
    );
};

export default VideoCallButton;