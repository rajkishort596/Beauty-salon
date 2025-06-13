import React from "react";
import Hero from "../../components/Hero/Hero";
import images from "../../constants/images";
import ContactSection from "../../sections/Contact Us/ContactSection";
import BookingForm from "../../components/Form/BookingForm";
import InstagramSection from "../../sections/Home/InstagramSection";

const Contact = () => {
  return (
    <div>
      <Hero HeadingText="Contact Us" HeroImg={images.contactHeroImg} />
      <ContactSection />
      <BookingForm />
      <InstagramSection />
    </div>
  );
};

export default Contact;
