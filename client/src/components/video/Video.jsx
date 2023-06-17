import React from 'react';

const Video = () => {
  return (
    <div className="video-background">
      <video id="background-video" loop autoPlay muted playsInline>
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
