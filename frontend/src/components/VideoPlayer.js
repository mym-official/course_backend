import React, { useState } from 'react';
import '../styles/videoPlayer.css';

export default function VideoPlayer({ video }) {
  const { base_url } = require('../config');
  const videoUrl = `${base_url}play_video/${encodeURIComponent(video.filename)}`;
  const [showControls, setShowControls] = useState(false);

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  return (
    <div
      className="video-player-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        className="video"
        controls
        autoPlay
        muted={false}
        loop
        src={videoUrl}
      >
        Your browser does not support the video tag.
      </video>
      <div className={`overlay ${showControls ? 'show-controls' : ''}`}>
        <span className="overlay-text">MYM</span>
      </div>
    </div>
  );
}
