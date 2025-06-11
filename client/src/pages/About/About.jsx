import React from "react";
import Hero from "../../components/Hero/Hero";
import images from "../../constants/images";

const About = () => {
  return (
    <div>
      <Hero HeadingText="About Us" HeroImg={images.aboutHeroImg} />
    </div>
  );
};

export default About;
