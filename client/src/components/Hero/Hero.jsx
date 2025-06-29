import React from "react";
import images from "../../constants/images";

const Hero = ({ HeadingText, HeroImg }) => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Heading Section with faded logo */}
      <div className="relative pt-[58px] pb-8">
        {/* Faded Background Logo */}
        <img
          src={images.logo}
          alt="Background Logo"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none h-[140px] md:h-[256px] md:w-[256px] w-[140px] object-contain"
        />

        {/* Main Heading */}
        <h1 className="relative z-10 text-[clamp(48px,8vw,100px)] font-imperial text-primary drop-shadow-xl backdrop-blur-sm px-4">
          {HeadingText}
        </h1>
      </div>

      {/* Stylish Hero Image */}
      <div className="relative w-full px-4">
        <div className="overflow-hidden rounded-xl shadow-2xl group">
          {/* Image with hover zoom and overlay */}
          <img
            src={HeroImg}
            alt="Hero"
            className="w-full h-[320px] sm:h-[350px] md:h-[450px] lg:h-[480px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute top-0 bottom-0 left-4 right-4 rounded-xl bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
