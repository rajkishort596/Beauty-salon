import React from "react";

const PurposeSection = () => {
  return (
    <section className="py-15 px-4 md:px-18 bg-white">
      <div className="max-w-6xl mx-auto m-w-[1076px] px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-10 font-abhaya">
          We can create what you imagine
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left items-end">
          <div>
            <h3 className="text-xl font-semibold font-abhaya text-primary mb-2">
              Artistry in Every Detail
            </h3>
            <p className="text-text-muted mb-4">
              From subtle transformations to bold new looks, our expert stylists
              bring your vision to life with creativity, precision, and care.
              Whether it’s a timeless style or something uniquely you, we’re
              here to make it happen.
            </p>
            <p className="text-text-muted">
              Every treatment is tailored to reflect your individuality,
              ensuring you leave feeling confident, refreshed, and radiant —
              inside and out.
            </p>
          </div>

          <div>
            <p className="text-text-muted mb-4">
              The skill and precision of our stylists are what sets us apart.
              Our team continuously trains in the latest global trends and
              advanced techniques, ensuring we offer cutting-edge artistry
              alongside timeless elegance.
            </p>
            <p className="text-text-muted">
              This commitment to both mastery and exceptional materials
              guarantees that your style is not only gorgeous the day you leave
              but maintains its health and vibrancy long after your appointment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;
