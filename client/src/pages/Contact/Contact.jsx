import React from "react";
import ContactSection from "../../sections/Contact Us/ContactSection";
import BookingForm from "../../components/Form/BookingForm";
import InstagramSection from "../../sections/Home/InstagramSection";
import MapSection from "../../sections/Contact Us/MapSection";
import { useSelector } from "react-redux";
const Contact = () => {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  return (
    <div>
      <MapSection />
      <ContactSection />
      <BookingForm isAuthenticated={isAuthenticated} />
      <InstagramSection />
    </div>
  );
};

export default Contact;
