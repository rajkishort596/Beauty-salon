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
import { fetchAllDiscounts } from "../../api/discount.Api";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const About = () => {
  const [specialists, setSpecialists] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch all specialists
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchSpecialists();
        const discount = await fetchAllDiscounts();
        console.log(discount.data.data);
        setSpecialists(res.data.data);
        setDiscounts(discount.data.data);
      } catch (error) {
        const msg = error.response?.data?.message;
        toast.error(msg);
        console.error("Data Loading Failed", msg);
      } finally {
        setLoading(false);
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
      <Hero HeadingText="About Us" HeroImg={images.aboutHeroImg} />
      <PurposeSection />
      <SpaProcudureSection />
      <CityStyleSection />
      <BrandLogoSection />
      <OurTeam specialists={specialists} />
      <DiscountSection discounts={discounts} />
    </div>
  );
};

export default About;
