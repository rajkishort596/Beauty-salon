import React, { useEffect, useState } from "react";
import images from "../../constants/images";
import Hero from "../../components/Hero/Hero";
import ServicesSection from "../../sections/Services/ServicesSection";
import BookingForm from "../../components/Form/BookingForm";
import { useSelector } from "react-redux";
import { fetchAllServices } from "../../api/service.Api";
import Spinner from "../../components/Spinner";
const Service = () => {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch all services
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchAllServices();

        setServices(res.data.data);
        console.log("Fetched services:", res.data.data);
      } catch (error) {
        console.error("Service loading error", error);
      } finally {
        setLoading(false);
        // console.log(loading);
      }
    };
    loadData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <Spinner />
      </div>
    );

  return (
    <div>
      <Hero HeadingText="Services" HeroImg={images.serviceHeroImg} />
      <ServicesSection services={services} />
      <BookingForm isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default Service;
