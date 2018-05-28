import React from "react";

const Education = () => (
  <div className="row education">
    <div className="three columns header-col">
      <h1>
        <span>Education</span>
      </h1>
    </div>

    <div className="nine columns main-col">
      <div className="row item">
        <div className="twelve columns">
          <h3>DeVry University</h3>
          <p className="info">
            Computer Information Systems
            <span>&bull;</span>
            <em className="date">2004</em>
          </p>
        </div>
      </div>

      <div className="row item">
        <div className="twelve columns">
          <h3>Hocking College</h3>
          <p className="info">
            Network Administration
            <span>&bull;</span>
            <em className="date">2003</em>
          </p>
        </div>
      </div>
      
    </div>
  </div>
);

export default Education;
