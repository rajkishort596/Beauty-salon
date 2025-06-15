import React from "react";
import ServiceCard from "../../components/Card/ServiceCard.jsx";
import images from "../../constants/images.js";
const ServicesOverview = () => {
  const services = [
    {
      title: "make up",
      image: images.makeupImg,
      icon: images.brushIcon,
    },
    {
      title: "hair styling",
      image: images.hairstyleImg,
      icon: images.combIcon,
    },
    {
      title: "nail care",
      image: images.nailcareImg,
      icon: images.nailIcon,
    },
    {
      title: "cosmetology",
      image: images.cosmetologyImg,
      icon: images.cosmeticIcon,
    },
  ];
  return (
    <section className="px-4 py-12 md:px-18 md:py-15 text-center">
      <h2 className="text-3xl md:text-5xl font-semibold text-primary mb-4">
        Elegance comes from being as <br /> beautiful inside as outside
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-10">
        Eleifend arcu non lorem justo in tempus purus gravida. Est tortor
        egestas sed feugiat elementum. Viverra nulla amet a ultrices massa dui.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesOverview;
