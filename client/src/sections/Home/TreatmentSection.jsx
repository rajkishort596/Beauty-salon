import React from "react";
import images from "../../constants/images";
const TreatmentSection = () => {
  const treatments = [
    { name: "Nail care", price: "$25" },
    { name: "Hair Styling", price: "$30" },
    { name: "Make up", price: "$50" },
    { name: "Cosmetology", price: "$30" },
    { name: "SPA procedures", price: "$40" },
  ];
  return (
    <section className="flex flex-col lg:flex-row gap-5 px-4 py-12 md:px-18 md:py-15">
      {/* Left Image */}
      <div className="w-full">
        <img
          src={images.treatmentImg}
          alt="Our treatments"
          className="w-full h-[500px] object-cover"
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

          <button className="mt-4 text-primary underline hover:opacity-80">
            View all
          </button>
        </div>
      </div>
    </section>
  );
};

export default TreatmentSection;
