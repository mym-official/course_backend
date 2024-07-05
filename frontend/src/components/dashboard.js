import React, { useState, useEffect } from 'react';
import Header from './Header';
import VideoPlayer from './VideoPlayer';
import '../styles/dashboard.css';
import axios from 'axios';

export default function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { base_url } = require('../config');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    axios.get(`${base_url}/list_videos`)
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log("Logout clicked");
  };

  return (
    <div className="dashboard-container">
      <Header onLogout={handleLogout} />
      <div className="dashboard">
        <div className="video-list">
          {videos.map(video => (
            <div
              key={video.title}
              className={`video-item ${video === selectedVideo ? 'selected' : ''}`}
              onClick={() => handleVideoClick(video)}
            >
              {video.title}
            </div>
          ))}
        </div>
        <div className="video-player">
          {selectedVideo && <VideoPlayer video={selectedVideo} />}
        </div>
      </div>
    </div>
  );
}
