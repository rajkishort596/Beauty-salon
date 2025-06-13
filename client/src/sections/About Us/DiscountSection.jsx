import React from "react";
import images from "../../constants/images";

const DiscountSection = () => {
  return (
    <section className="bg-bg relative px-4 w-full py-30 md:px-18 flex justify-center items-center">
      <div className="absolute bottom-0 -left-[217px] z-10">
        <img
          src={images.lotusBg}
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      <div className="absolute top-0 -right-[217px] rotate-180 z-10">
        <img
          src={images.lotusBg}
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      <div className="relative w-full h-[372px] max-w-4xl px-4 py-10 border-2 overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={images.discountBanner}
            alt="Discount Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/25 z-0"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-10 text-center">
          <p className="text-white font-abhaya text-3xl md:text-4xl">
            -25% off
          </p>
          <h3 className="text-white font-abhaya text-3xl md:text-5xl">
            Make up & Nail care
          </h3>
          <button className="btn-primary md:px-18  text-2xl">Book now</button>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
