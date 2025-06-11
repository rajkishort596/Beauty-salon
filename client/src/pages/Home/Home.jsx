import React from "react";
import images from "../../constants/images";
import Hero from "../../components/Hero/Hero";
const Home = () => {
  return (
    <div>
      <Hero HeadingText="Beauty Salon" HeroImg={images.heroImg} />
    </div>
  );
};

export default Home;
