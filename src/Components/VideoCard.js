import React, { useState } from "react";
import "../Assets/videoCard.css";
import Modal from "react-bootstrap/Modal";
import { FaTrashAlt } from "react-icons/fa";
import { deleteData, setHistory } from "../Services/allReqs";
import uniqid from "uniqid";
import { format } from "date-fns";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoCard = ({ data, setDlt}) => {
  const [show, setShow] = useState(false);

  const handleClose =() => setShow(false);
  const handleShow = async () => {
    setShow(true);
    let id = uniqid();
    let name = data?.video_title;
    let url = data?.video_url;
    let d_and_t = format(new Date(), "dd-MM-yyyy hh-mm a");
    let historyData = { id, name, url, d_and_t };
    let response = await setHistory(historyData);
    console.log(response);
  };

  const handleDelete = async (id) => {
    let response = await deleteData(id);

    toast.success("Video deleted succesfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setDlt(response.data);
  };

  const dragStart=(e,id)=>{
    e.dataTransfer.setData("cardId",id)
    // console.log(e.dataTransfer);
  }

  return (
    <>
      {/* <ToastContainer /> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.video_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "500px" }}>
          <iframe
            width="100%"
            height="100%"
            src={data.video_url}
            title={data.video_title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <button className="px-2 py-1 rounded border-0" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <div className="video-card" draggable onDragStart={(e)=>dragStart(e,data.id)}>
        <img src={data.cover_img} alt="" onClick={handleShow} />
        <div
          className="d-flex align-items-center justify-content-between"
          style={{ gap: "10px" }}
        >
          <h6 style={{ flex: "70%" }}>
            {data.video_title && data.video_title.length > 30
              ? data.video_title.slice(0, 31) + "..."
              : data.video_title}
          </h6>
          <FaTrashAlt
            style={{ alignSelf: "flex-start", cursor: "pointer" }}
            onClick={() => handleDelete(data.id)}
          />
        </div>
      </div>
    </>
  );
};

export default VideoCard;
