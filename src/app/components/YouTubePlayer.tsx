"use client";
import React, { useEffect, useState } from "react";
import YTPlayer from "react-player/youtube";

export const YouTubePlayer = () => {
  const [isEthereumAvailable, setIsEthereumAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsEthereumAvailable(true);
    }
  }, []);
  return (
    <>
      {isEthereumAvailable ? (
        <YTPlayer
          style={{ margin: "auto" }}
          url={"https://www.youtube.com/watch?v=K_03kFqWfqs"}
          controls
        />
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

