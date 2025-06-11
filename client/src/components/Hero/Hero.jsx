import React from "react";
import images from "../../constants/images";

const Hero = ({ HeadingText, HeroImg }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative pt-[58px] pb-8">
        <img
          src={images.logo}
          alt="Background Logo"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none h-[140px] md:h-[256px] md:w-[256px] w-[140px] object-contain"
        />

        <h1 className="relative z-10 text-[clamp(60px,10vw,100px)] font-imperial text-primary">
          {HeadingText}
        </h1>
      </div>

      {/* Hero Image */}
      <div className="w-full">
        <img
          src={HeroImg}
          alt="Hero"
          className="w-full object-cover
                     h-[320px] sm:h-[350px] md:h-[450px] lg:h-[400px]"
        />
      </div>
    </div>
  );
};

export default Hero;
