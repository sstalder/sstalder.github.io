import React from "react";
import { FaCloudDownload } from "react-icons/lib/fa";

import profilePic from "../assets/images/profilepic.jpg";

const About = () => (
  <section id="about">
    <div className="row">
      <div className="three columns">
        <img className="profile-pic" src={profilePic} alt="" />
      </div>
      <div className="nine columns main-col">
        <div className="row">
          <div className="columns contact-details">
            <h2>Contact Details</h2>
            <p className="address">
              <span>Steve Stalder</span>
              <br />
              <span>steve@stevestalder.com</span>
            </p>
          </div>
          {/* <div className="columns download">
            <p>
              <a href="#" className="button">
                <FaCloudDownload /> Download Resume
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  </section>
);

export default About;
