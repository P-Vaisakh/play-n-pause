import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import uniqid from "uniqid";

import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import { postData } from "../Services/allReqs";

const AddVideoCard = ({setCard}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputData, setInputData] = useState({
    id: "",
    video_title: "",
    cover_img: "",
    video_url: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const setUrl = (e) => {
    const { value, name } = e.target;
    if (value.includes("v=")) {
      let vdoId = value.split("v=")[1];
      if (vdoId.length > 11) {
        vdoId = vdoId.split("&")[0];
        let vdoUrl = `https://www.youtube.com/embed/${vdoId}?autoplay=1`;
        let coverUrl = `https://img.youtube.com/vi/${vdoId}/hqdefault.jpg`;
        setInputData({
          ...inputData,
          cover_img: coverUrl,
          [name]: vdoUrl,
        });
      } else {
        let vdoUrl = `https://www.youtube.com/embed/${vdoId}?autoplay=1`;
        let coverUrl = `https://img.youtube.com/vi/${vdoId}/hqdefault.jpg`;

        setInputData({
          ...inputData,
          cover_img: coverUrl,
          [name]: vdoUrl,
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = uniqid();
    setInputData({ ...inputData, id: id });
    if (inputData.video_title == "" || inputData.video_url == "") {
        console.log(inputData.video_url);
      toast.error("All feilds are required!", {
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
      const response = await postData(inputData);
      console.log(response);
      setCard(response.data)
      if (response.status >= 200 && response.status < 300) {
        toast.success("Video added Succesfully", {
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
      setShow(false);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="text-center">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Video Title"
                onChange={(e) => handleInput(e)}
                name="video_title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Video Url"
                onChange={(e) => setUrl(e)}
                name="video_url"
              />
            </Form.Group>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className="px-2 py-1 border-0 rounded"
            >
              Submit
            </button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-2 py-1 border-none rounded border-0"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>

      <div className="card me-md-2">
        <h5>Add Video</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quidem
          ut sit aperiam? Nesciunt dolore labore cum ex velit placeat?
        </p>
        <button
          onClick={handleShow}
          className="px-2 py-1 rounded"
          style={{ background: "#fefefe" }}
        >
          Add a Video
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddVideoCard;
