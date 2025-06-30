import React from "react";
import ContactSection from "../../sections/Contact Us/ContactSection";
import BookingForm from "../../components/Form/BookingForm";
import InstagramSection from "../../sections/Home/InstagramSection";
import MapSection from "../../sections/Contact Us/MapSection";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getContactInfo } from "../../api/contact.Api";
import Spinner from "../../components/Spinner";
const Contact = () => {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  const [contactInfo, setContactInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await getContactInfo();
        setContactInfo(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <Spinner />
      </div>
    );

  return (
    <div>
      <MapSection location={contactInfo.location} />
      <ContactSection contactInfo={contactInfo} />
      <BookingForm isAuthenticated={isAuthenticated} />
      <InstagramSection />
    </div>
  );
};

export default Contact;
