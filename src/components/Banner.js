import React from "react";
import SocialLinks from "./SocialLinks";

const Banner = () => (
  <div className="row banner">
    <div className="banner-text">
      <h1 className="responsive-headline">Steve Stalder</h1>
      <h3>
        An Ohio based Full Stack Web Developer. <a className="smoothscroll" href="#about">Learn more about me</a>.
      </h3>

      <hr />
      
      <SocialLinks />
    </div>
  </div>
);

export default Banner;
