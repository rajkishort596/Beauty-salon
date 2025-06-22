import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import images from "../../constants/images";
import PurposeSection from "../../sections/About Us/PurposeSection";
import SpaProcudureSection from "../../sections/About Us/SpaProcudureSection";
import CityStyleSection from "../../sections/About Us/CityStyleSection";
import DiscountSection from "../../sections/About Us/DiscountSection";
import BrandLogoSection from "../../sections/About Us/BrandLogoSection";
import OurTeam from "../../sections/About Us/OurTeam";
import { fetchSpecialists } from "../../api/specialist.Api";

const About = () => {
  const [specialists, setSpecialists] = useState([]);
  // Fetch all specialists
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchSpecialists();
        // console.log(res);
        setSpecialists(res.data.data);
      } catch (error) {
        console.error("Specialist loading error", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  return (
    <div>
      <Hero HeadingText="About Us" HeroImg={images.aboutHeroImg} />
      <PurposeSection />
      <SpaProcudureSection />
      <CityStyleSection />
      <BrandLogoSection />
      <OurTeam specialists={specialists} />
      <DiscountSection />
    </div>
  );
};

export default About;
