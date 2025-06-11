import React from "react";
import images from "../../constants/images";
import Hero from "../../components/Hero/Hero";
import ServicesOverview from "../../sections/Home/ServicesOverview";
import TreatmentSection from "../../sections/Home/TreatmentSection";
import VideoInfoSection from "../../sections/Home/VideoInfoSection";
import Testimonials from "../../sections/Home/Testimonials";
import InstagramSection from "../../sections/Home/InstagramSection";
const Home = () => {
  return (
    <div>
      <Hero HeadingText="Beauty Salon" HeroImg={images.heroImg} />
      <ServicesOverview />
      <TreatmentSection />
      <Testimonials />
      <VideoInfoSection />
      <InstagramSection />
    </div>
  );
};

export default Home;
