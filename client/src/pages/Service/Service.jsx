import React from "react";
import images from "../../constants/images";
import Hero from "../../components/Hero/Hero";
import ServicesSection from "../../sections/Services/ServicesSection";
import BookingForm from "../../components/Form/BookingForm";
import { useSelector } from "react-redux";
const Service = () => {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  return (
    <div>
      <Hero HeadingText="Services" HeroImg={images.serviceHeroImg} />
      <ServicesSection />
      <BookingForm isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default Service;
