import React from 'react';

function YoutubeVideo(url) {
  return (
    <div data-testid="video">
      <iframe
        width="853"
        height="480"
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
