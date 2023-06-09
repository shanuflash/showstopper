import React from "react";

function YoutubeEmbed({ embedId }) {
  return (
    <div className="video">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Movie player"
      />
    </div>
  );
}

export default YoutubeEmbed;
