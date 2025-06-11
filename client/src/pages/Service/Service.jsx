import React from "react";
import images from "../../constants/images";
import Hero from "../../components/Hero/Hero";

const Service = () => {
  return (
    <div>
      <Hero HeadingText="Services" HeroImg={images.serviceHeroImg} />
    </div>
  );
};

export default Service;
