import React from "react";
import Hero from "../../components/Hero/Hero";
import images from "../../constants/images";

const Contact = () => {
  return (
    <div>
      <Hero HeadingText="Contact Us" HeroImg={images.contactHeroImg} />
    </div>
  );
};

export default Contact;
