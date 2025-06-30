import React from "react";
import SpecialistCard from "../../components/Card/SpecialistCard";

// Dummy Data (You can map real fetched data here)
// const specialists = [
//   {
//     name: "Marianna Holder",
//     role: "Hairdresser",
//     image: "/assets/images/placeholder-female.png",
//   },
//   {
//     name: "Tiffany Anderson",
//     role: "Hairdresser",
//     image: "/assets/images/placeholder-female.png",
//   },
//   {
//     name: "Brianna Fitzgerald",
//     role: "Hairdresser",
//     image: "/assets/images/placeholder-female.png",
//   },
//   {
//     name: "Jaqueline Colon",
//     role: "Hairdresser",
//     image: "/assets/images/placeholder-female.png",
//   },
//   {
//     name: "Wanda Cummerata",
//     role: "Hairdresser",
//     image: "/assets/images/placeholder-female.png",
//   },
//   {
//     name: "Cameron Banks",
//     role: "Hairdresser",
//     image: "/assets/images/placeholder-female.png",
//   },
// ];

const OurTeam = ({ specialists }) => {
  return (
    <section className="py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-semibold text-primary">Our Team</h2>
        <p className="text-gray-500 mt-2">Meet our professionals</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {specialists.map((s, idx) => (
          <SpecialistCard
            key={idx}
            name={s.name}
            role={s.expertise.name}
            image={s.image.url}
          />
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
