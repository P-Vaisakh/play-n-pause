import React, { useEffect, useState } from "react";
import { getHistory, deleteHistory } from "../Services/allReqs";
import Table from "react-bootstrap/Table";
import { FaTrash } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const History = () => {
  const[delt, setDelt]=useState()
  const [history, sethistory] = useState([]);
  const displayHistory = async () => {
    let response = await getHistory();
    sethistory(response.data);
  };

  const dlt = async (id) => {
    let response = await deleteHistory(id);
    console.log(response);
    if(response.status>=200 && response.status<300){
      setDelt(response.data);
      toast.success("item deleted succesfully", {
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
  };

  useEffect(() => {
    displayHistory();
  }, [delt]);

  return (
    <div
      className="pt-5 px-2 px-md-0 table-container text-center "
      style={{ minHeight: "100vh", background: "#3b3b3b" }}
    >
      <div className="setWidth">
        <Table
          striped
          bordered
          className={`mt-5 m-auto w-100`}
          hover
          variant="light"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Time</th>
              <th>Video title</th>
              <th></th>
            </tr>
          </thead>
          <tbody >
            {history.length > 0 ? (
              history.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.d_and_t}</td>
                  <td>{item.name}</td>
                  <td style={{ color: "white" }}>
                    <FaTrash
                      onClick={() => dlt(item.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-light">
                Fetching History....
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default History;
