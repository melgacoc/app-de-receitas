import React from 'react';

function YoutubeVideo(url) {
  return (
    <div className="video" data-testid="video">
      <iframe
        width="360"
        height="400"
        src={ `https://www.youtube.com/embed/${url}` }
        frameBorder="0"
        allow="accelerometer;
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

export default YoutubeVideo;
