import React from "react";
import images from "../../constants/images";

const BrandLogoSection = () => {
  return (
    <section className="bg-bg py-13 px-4 md:px-18">
      <div className="relative overflow-hidden">
        <div className="flex flex-wrap gap-16 items-center justify-center lg:justify-between w-full px-6">
          <img src={images.herbalHouse} alt="Logo 1" className="w-auto" />
          <img src={images.mistletoeCosmetic} alt="Logo 2" className="w-auto" />
          <img src={images.beyondStore} alt="Logo 3" className="w-auto" />
          <img src={images.bloomingBeauty} alt="Logo 4" className="w-auto" />
          <img src={images.flora} alt="Logo 5" className="w-auto" />
        </div>
      </div>
    </section>
  );
};

export default BrandLogoSection;
