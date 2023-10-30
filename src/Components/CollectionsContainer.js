import React, { useEffect, useState } from "react";
import {
  deleteCollection,
  dltCollectionItem,
  getCollection,
  getSingleCollection,
  getSingleVideo,
  putVideo,
  setHistory,
} from "../Services/allReqs";

import { FaChevronDown, FaTrashAlt } from "react-icons/fa";

import Accordion from "react-bootstrap/Accordion";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Modal from "react-bootstrap/Modal";

import uniqid from "uniqid";
import { format } from "date-fns";

const CollectionsContainer = ({ category }) => {
  const [collection, setcollection] = useState([]);
  const [dlt, setdlt] = useState(null);
  const [updt, setupdt] = useState();
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});

  const handleClose = () => setShow(false);

  const handleShow = async (vdoId, colId) => {
    let {data:{videos}}=await getSingleCollection(colId)
    setData(videos.find((vdo) => vdo.id === vdoId));
    setShow(true);
  };

  const getData = async () => {
    let response = await getCollection();
    setcollection(response.data);
  };

  const handledlt = async (id) => {
    let response = await deleteCollection(id);
    setdlt(response.data);
  };

  useEffect(() => {
    getData();
  }, [category, dlt, updt]);

  const dragover = (e) => {
    e.preventDefault();
  };

  const drop = async (e, colId) => {
    let cardId = e.dataTransfer.getData("cardId");
    const { data } = await getSingleVideo(cardId);
    let coll = collection.find((item) => item.id == colId);
    if (coll.videos.some((vdo) => vdo.id === data.id)) {
      toast.error("Video already exists in the collection", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      coll.videos.push(data);
      let response = await putVideo(colId, coll);
      setupdt(response.data);
    }
  };

  const dltItem = async (vdoId, colId) => {
    let { data } = await getSingleCollection(colId);
    let index = data.videos.findIndex((video) => video.id === vdoId);
    data.videos.splice(index, 1);
    let response = await putVideo(colId, data);
    if (response.status >= 200 && response.status < 300) {
      toast.success("Item removed from collection", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    // console.log(response);
    setdlt(response.data);
  };

  return (
    <div className="categories w-100 p-3">
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
      <h3>Collections</h3>
      <Accordion
        defaultActiveKey={["0"]}
        alwaysOpen
        className="mt-md-5 mt-3 mx-auto "
      >
        {collection.length > 0 ? (
          collection.map((item, index) => (
            <Accordion.Item
              eventKey={index}
              droppable
              onDragOver={(e) => dragover(e)}
              onDrop={(e) => drop(e, item.id)}
            >
              <Accordion.Header>
                {" "}
                <h5>{item.collectionName}</h5>
              </Accordion.Header>
              <Accordion.Body>
                <button
                  className="btn mb-3 w-100"
                  onClick={() => handledlt(item.id)}
                  style={{ background: "#3b3b3b", color: "#fefefe" }}
                >
                  Delete collection
                </button>
                {item.videos.length > 0 ? (
                  item.videos.map((vdo) => (
                    <div
                      className="d-flex align-items-center justify-content-between px-md-3 py-1 w-100 acc-content"
                      style={{ gap: "15px", placeItems: "start" }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-start"
                        style={{ gap: "10px" }}
                      >
                        <img
                          src={vdo.cover_img}
                          alt=""
                          style={{ width: "60px" }}
                        />
                        <h6
                          style={{
                            maxWidth: "250px",
                            textAlign: "left",
                            cursor: "pointer",
                          }}
                          onClick={() => handleShow(vdo.id, item.id)}
                        >
                          {vdo.video_title?.length > 50
                            ? vdo.video_title.slice(0, 50) + "..."
                            : vdo.video_title}
                        </h6>
                      </div>
                      <FaTrashAlt
                        style={{
                          width: "30px",
                          alignContent: "end",
                          cursor: "pointer",
                        }}
                        onClick={() => dltItem(vdo.id, item.id)}
                      />
                    </div>
                  ))
                ) : (
                  <p>No videos added</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <p className="text-light">Fetching Collections</p>
        )}
      </Accordion>
      <ToastContainer />
    </div>
  );
};

export default CollectionsContainer;
