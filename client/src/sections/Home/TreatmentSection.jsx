import React from "react";
import images from "../../constants/images";
import { useNavigate } from "react-router-dom";
const TreatmentSection = () => {
  const navigate = useNavigate();
  const treatments = [
    { name: "Nail care", price: "$25" },
    { name: "Hair Styling", price: "$30" },
    { name: "Make up", price: "$50" },
    { name: "Cosmetology", price: "$30" },
    { name: "SPA procedures", price: "$40" },
  ];
  return (
    <section className="flex flex-col lg:flex-row gap-10 px-4 py-16 md:px-20 items-center bg-gradient-to-b from-white to-pink-50">
      {/* Left Image */}
      <div className="w-full max-w-xl overflow-hidden rounded-3xl shadow-lg group">
        <img
          src={images.treatmentImg}
          alt="Our treatments"
          className="w-full h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Right Text */}
      <div className="flex w-full justify-center items-center px-10">
        <div className="w-full max-w-md flex flex-col">
          <h2 className="text-3xl md:text-5xl font-abhaya font-bold text-primary mb-4">
            Treatments and prices
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Velit in dui dictum arcu felis tempor in feugiat in mauris...
          </p>

          <ul className="space-y-3 text-sm">
            {treatments.map(({ name, price }) => (
              <li
                key={name}
                className="flex justify-between border-b border-dotted border-gray-300 pb-1"
              >
                <span>{name}</span>
                <span className="text-primary font-semibold">from {price}</span>
              </li>
            ))}
          </ul>

          <button
            className="mt-4 btn-primary hover:translate-y-1 md:max-w-[200px] px-6 py-2 rounded-sm transition"
            onClick={() => navigate("/service")}
          >
            View all
          </button>
        </div>
      </div>
    </section>
  );
};

export default TreatmentSection;
