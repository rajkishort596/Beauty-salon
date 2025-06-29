import React from "react";
import images from "../../constants/images"; // Fallback images
import { useNavigate } from "react-router-dom";

const DiscountSection = ({ discounts = [] }) => {
  const activeDiscount = discounts.find((d) => d.isActive);

  if (!activeDiscount) return null;

  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/appointment");
  };

  return (
    <section className="bg-bg relative px-4 w-full py-30 md:px-18 flex justify-center items-center">
      {/* Background lotus graphics */}
      <div className="absolute bottom-0 -left-[217px] z-10">
        <img
          src={images.lotusBg}
          className="w-full h-full object-cover opacity-5"
          alt="lotus-left"
        />
      </div>
      <div className="absolute top-0 -right-[217px] rotate-180 z-10">
        <img
          src={images.lotusBg}
          className="w-full h-full object-cover opacity-5"
          alt="lotus-right"
        />
      </div>

      {/* Main discount container */}
      <div className="relative w-full h-[372px] max-w-4xl px-4 py-10 border-2 overflow-hidden flex items-center justify-center">
        {/* Discount background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeDiscount?.image?.url || images.discountBanner}
            alt={activeDiscount?.title || "Discount Banner"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/25 z-0"></div>

        {/* Discount content */}
        <div className="relative z-10 flex flex-col items-center gap-10 text-center">
          <p className="text-white font-abhaya text-3xl md:text-4xl">
            -{activeDiscount.percentage}% off
          </p>
          <h3 className="text-white font-abhaya text-3xl md:text-5xl">
            {activeDiscount.category?.join(" & ")}
          </h3>
          <button
            onClick={handleBookNow}
            className="btn-primary md:px-18 text-2xl"
          >
            Book now
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
