import React from "react";
import { useState } from "react";
import uniqid from "uniqid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import { deleteData, postCollection } from "../Services/allReqs";

const AddCategoryCard = ({setCategory}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [collection, setcollection] = useState({
    id: "",
    collectionName: "",
    videos:[]
  });

  const setData = (e) => {
    const { name, value } = e.target;
    setcollection({ ...collection, [name]: value });
  };

  const handleInput = async (e) => {
    e.preventDefault();
    let id = uniqid();
    setcollection({ ...collection, id: id });
    if (collection == "") {
      toast.error("Collection name cannot be blank", {
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
      let response = await postCollection(collection);
      setCategory(response.data);
      toast.success("Collection created succesfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleClose()
    }
  };

  return (
    <>
      <div className="card me-lg-2 mb-2 mb-lg-0">
        <h5>Create Collections</h5>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus
          aperiam explicabo, totam ipsam beatae ex.
        </p>
        <button className="px-2 py-1 rounded" style={{background:"#fefefe"}} onClick={handleShow}>
          Create Collection
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a collection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleInput(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: "white" }}>
                Collection name:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter collection name"
                onChange={(e) => setData(e)}
                name="collectionName"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default AddCategoryCard;
