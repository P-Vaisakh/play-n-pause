import React from "react";
import { Link } from "react-router-dom";

const RandomVideoCard = () => {
  return (
    <div className="card">
      <h5>See watch History</h5>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam nobis
        culpa fugiat vero ducimus?
      </p>
      <Link to="/history" style={{textDecoration:"none" , background:"#fefefe"}} className=" btn border-2 border-dark px-2 py-1 rounded align-bottom  ">
        Go to history
      </Link>
    </div>
  );
};

export default RandomVideoCard;
