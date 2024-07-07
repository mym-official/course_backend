import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/videoPlayer.css';

export default function VideoPlayer({ video }) {
  const { base_url } = require('../config');
  const videoUrl = `${base_url}play_video/${encodeURIComponent(video.filename)}`;
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    axios.get('https://api.ipify.org?format=json')
      .then(response => {
        setIpAddress(response.data.ip);
      })
      .catch(error => {
        console.error('Error fetching the IP address:', error);
      });

    const videoElement = document.getElementById('video-player');
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    if (videoElement) {
      videoElement.addEventListener('contextmenu', handleContextMenu);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, [video.filename]);

  return (
    <div className="video-player-container">
      <video
        id="video-player"
        className="video"
        controls
        disablePictureInPicture
        controlsList="nodownload" 
        src={videoUrl}
      >
        Your browser does not support the video tag.
      </video>
      <div className="overlay">
        <span className="overlay-text">NIHIT: {ipAddress}</span>
      </div>
    </div>
  );
}
