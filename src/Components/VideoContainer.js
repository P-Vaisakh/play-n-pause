import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { getData } from "../Services/allReqs";

const VideoContainer = ({ card,show,setShow}) => {
  const [data, setData] = useState([]);
  const [dlt, setDlt] = useState({});
  // const [show, setShow] = useState(false);

  const getVideos = async () => {
    let response = await getData();
    if (response.status >= 200 && response.status < 300) {
      setData(response.data);
    }
  };

  useEffect(() => {
    getVideos();
  }, [card, dlt]);

  return (
    <div className="videos align-self-start  ">
      <h3>Videos</h3>
      <div
        className={`videos-container text-center ${
          data.length < 1 ? "d-flex justify-content-center" : ""
        }`}
      >
        {data.length > 0 ? (
          data.map((video, index) => (
            <VideoCard
              data={video}
              key={index}
              setDlt={setDlt}
            ></VideoCard>
          ))
        ) : (
          <p className="text-center text-light">Fetching Videos</p>
        )}
      </div>
    </div>
  );
};

export default VideoContainer;
