import React from 'react'
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <div className="landing-page w-100">
      <div className="inner-container">
        <div className="left-container">
          <h1>
            Store Organize and Watch{" "}
            <span>
              Videos
            </span>{" "}
            Seamlessly
          </h1>
          <Link to={"/view"}><button className='border-0'>Explore</button></Link>
        </div>
        <div className="right-container">
          <img src="/img/img.gif" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Landing