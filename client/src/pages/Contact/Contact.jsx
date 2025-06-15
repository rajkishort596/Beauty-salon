import React from "react";
import ContactSection from "../../sections/Contact Us/ContactSection";
import BookingForm from "../../components/Form/BookingForm";
import InstagramSection from "../../sections/Home/InstagramSection";
import MapSection from "../../sections/Contact Us/MapSection";

const Contact = () => {
  return (
    <div>
      <MapSection />
      <ContactSection />
      <BookingForm />
      <InstagramSection />
    </div>
  );
};

export default Contact;
