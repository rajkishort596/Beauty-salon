import React from "react";
import images from "../../constants/images";
import Hero from "../../components/Hero/Hero";
import ServicesSection from "../../sections/Services/ServicesSection";
import BookingForm from "../../components/Form/BookingForm";

const Service = () => {
  return (
    <div>
      <Hero HeadingText="Services" HeroImg={images.serviceHeroImg} />
      <ServicesSection />
      <BookingForm />
    </div>
  );
};

export default Service;
