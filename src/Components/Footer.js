import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer d-flex justify-content-center align-items-center">
      <div>
        <h4>Navigate to</h4>
        <Link to={"/view"}>Home</Link>
        <br />
        <Link to={"/history"}>History</Link>
      </div>
      <div>
        <Link to={"/"}>
          <h3 className="mb-2">Play n Pause</h3>
        </Link>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          impedit, sit ipsam nihil vel similique molestias saepe iusto commodi
          neque deserunt suscipit labore doloribus dolor eaque aperiam ad
          assumenda ex!
        </p>
      </div>
      <div className="w-100 bg-light">©All rights reserved</div>
    </div>
  );
};

export default Footer;
