import React from "react";
import Hero from "../../components/Hero/Hero";
import images from "../../constants/images";
import PurposeSection from "../../sections/About Us/PurposeSection";
import SpaProcudureSection from "../../sections/About Us/SpaProcudureSection";
import CityStyleSection from "../../sections/About Us/CityStyleSection";
import DiscountSection from "../../sections/About Us/DiscountSection";
import BrandLogoSection from "../../sections/About Us/BrandLogoSection";

const About = () => {
  return (
    <div>
      <Hero HeadingText="About Us" HeroImg={images.aboutHeroImg} />
      <PurposeSection />
      <SpaProcudureSection />
      <CityStyleSection />
      <BrandLogoSection />
      <DiscountSection />
    </div>
  );
};

export default About;
