import { useEffect, useState } from "react";
import axios from "axios";
import images from "../../constants/images";
import ServiceItem from "../../components/Services/ServiceItem";

const ServicesSection = () => {
  const services = [
    {
      name: "Daily make up",
      price: 35,
      category: "Make up",
      image: images.makeupServiceImg,
    },
    {
      name: "Night make up",
      price: 40,
      category: "Make up",
      image: images.makeupServiceImg,
    },
    {
      name: "Bridal make up",
      price: 50,
      category: "Make up",
      image: images.makeupServiceImg,
    },
    {
      name: "Ocassion make up",
      price: 50,
      category: "Make up",
      image: images.makeupServiceImg,
    },
    {
      name: "Television make up",
      price: 50,
      category: "Make up",
      image: images.makeupServiceImg,
    },
    {
      name: "Simple haircut",
      price: 30,
      category: "Hair styling",
      image: images.hairstyleServiceImg,
    },
    {
      name: "Hair Styling",
      price: 25,
      category: "Hair styling",
      image: images.hairstyleServiceImg,
    },
    {
      name: "Full hair color",
      price: 99,
      category: "Hair styling",
      image: images.hairstyleServiceImg,
    },
    {
      name: "Protein treatment",
      price: 50,
      category: "Hair styling",
      image: images.hairstyleServiceImg,
    },
    {
      name: "Hair mask",
      price: 25,
      category: "Hair styling",
      image: images.hairstyleServiceImg,
    },
    {
      name: "Manicure",
      price: 15,
      category: "Nail care",
      image: images.nailcareServiceImg,
    },
    {
      name: "Padicure",
      price: 35,
      category: "Nail care",
      image: images.nailcareServiceImg,
    },
    {
      name: "French manicure",
      price: 20,
      category: "Nail care",
      image: images.nailcareServiceImg,
    },
    {
      name: "Manicure & gel nails",
      price: 40,
      category: "Nail care",
      image: images.nailcareServiceImg,
    },
    {
      name: "Gel polish + reaplication",
      price: 25,
      category: "Nail care",
      image: images.nailcareServiceImg,
    },
    {
      name: "Botox",
      price: 80,
      category: "Cosmetology",
      image: images.cosmetologyServiceImg,
    },
    {
      name: "Chemical Peel",
      price: 75,
      category: "Cosmetology",
      image: images.cosmetologyServiceImg,
    },
    {
      name: "Laser Skin Resurfacing",
      price: 50,
      category: "Cosmetology",
      image: images.cosmetologyServiceImg,
    },
    {
      name: "Laser Hair Removal",
      price: 25,
      category: "Cosmetology",
      image: images.cosmetologyServiceImg,
    },
    {
      name: "Tattoo Removal",
      price: 25,
      category: "Cosmetology",
      image: images.cosmetologyServiceImg,
    },
    {
      name: "Body scrub & smoothing",
      price: 50,
      category: "SPA procedures",
      image: images.spaServiceImg,
    },
    {
      name: "Indulge & relax",
      price: 60,
      category: "SPA procedures",
      image: images.spaServiceImg,
    },
    {
      name: "Slimming & drainage",
      price: 55,
      category: "SPA procedures",
      image: images.spaServiceImg,
    },
    {
      name: "Aromatherapy",
      price: 60,
      category: "SPA procedures",
      image: images.spaServiceImg,
    },
    {
      name: "Foot revive treatment",
      price: 50,
      category: "SPA procedures",
      image: images.spaServiceImg,
    },
  ];
  //   const [services, setServices] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get("/api/v1/services")
  //       .then((res) => setServices(res.data))
  //       .catch((err) => console.error("Error fetching services:", err));
  //   }, []);

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
            image={servicesList[0]?.image || "/default.jpg"}
            order={index % 2 === 0 ? "left" : "right"}
          />
        );
      })}
    </section>
  );
};

export default ServicesSection;
