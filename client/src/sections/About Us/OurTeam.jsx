import React from "react";
import SpecialistCard from "../../components/Card/SpecialistCard";

const OurTeam = ({ specialists }) => {
  console.log(specialists);
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
            email={s.email}
            phone={s.phone}
            role={s.expertise.name}
            image={s.image.url}
          />
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
