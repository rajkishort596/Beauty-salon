import { useEffect, useState } from "react";
import axios from "axios";
import images from "../../constants/images";
import ServiceItem from "../../components/Services/ServiceItem";

const ServicesSection = ({ services }) => {
  console.log(services);
  // Group services by category
  const groupedServices = services.reduce((acc, service) => {
    const { category } = service;
    if (!acc[category]) acc[category] = [];
    acc[category].push(service);
    return acc;
  }, {});

  const categories = Object.keys(groupedServices);

  return (
    <section className="py-15 px-4 md:px-18 bg-white text-center">
      <h2 className="text-center text-5xl font-bold font-abhaya text-primary mb-6">
        Services and Prices
      </h2>
      <p className="font-inter text-[16px] text-text-muted mb-10">
        Est tortor egestas sed feugiat elementum. Viverra nulla amet a ultrices
        massa dui. Tortor est <br /> purus morbi vitae arcu suspendisse amet.
      </p>
      {categories.map((category, index) => {
        const servicesList = groupedServices[category];
        return (
          <ServiceItem
            key={category}
            title={category}
            subtitle={`Best ${category.toLowerCase()} services`}
            items={servicesList}
            image={servicesList[0]?.image.url || "/default.jpg"}
            order={index % 2 === 0 ? "left" : "right"}
          />
        );
      })}
    </section>
  );
};

export default ServicesSection;
