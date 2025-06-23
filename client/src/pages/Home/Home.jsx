import React, { useEffect, useState } from "react";
import images from "../../constants/images";
import Hero from "../../components/Hero/Hero";
import ServicesOverview from "../../sections/Home/ServicesOverview";
import TreatmentSection from "../../sections/Home/TreatmentSection";
import VideoInfoSection from "../../sections/Home/VideoInfoSection";
import Testimonials from "../../sections/Home/Testimonials";
import InstagramSection from "../../sections/Home/InstagramSection";
import { getAllReviews } from "../../api/review.Api";
import Spinner from "../../components/Spinner";
const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data.filter((review) => review.status === "Approved"));
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <Spinner />
      </div>
    );

  return (
    <div>
      <Hero HeadingText="Beauty Salon" HeroImg={images.heroImg} />
      <ServicesOverview />
      <TreatmentSection />
      <Testimonials reviews={reviews} />
      <VideoInfoSection />
      <InstagramSection />
    </div>
  );
};

export default Home;
