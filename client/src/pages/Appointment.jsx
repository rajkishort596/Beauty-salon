import React from "react";
import BookingForm from "../components/Form/BookingForm";
import { useSelector } from "react-redux";
import Container from "../components/container/Container";

const Appointment = () => {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  return <BookingForm isAuthenticated={isAuthenticated} />;
};

export default Appointment;
