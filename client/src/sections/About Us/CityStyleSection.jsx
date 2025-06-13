import React from "react";
import images from "../../constants/images";

const CityStyleSection = () => {
  return (
    <section className="py-15 px-4 md:px-18 bg-white">
      <div className="mx-auto flex flex-col lg:flex-row justify-center items-center gap-18">
        {/* Left Image */}
        <div className="flex-1">
          <img
            src={images.styleImg}
            alt="Beauty model"
            className="w-full object-cover rounded-md shadow-md"
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-10 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-semibold text-primary leading-tight">
            Styles from the city, <br />
            service from out of this world
          </h2>
          <p className="text-gray-700 max-w-md mx-auto md:mx-0">
            Lorem ipsum dolor sit amet consectetur. Blandit at maecenas dui sed
            amet sit enim vitae. Amet purus dictum urna sagittis dignissim. At
            fermentum nisl ullamcorper orci.
          </p>
          <button className="btn-primary hover:translate-y-1 md:max-w-[200px] px-6 py-2 rounded-sm transition">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default CityStyleSection;
