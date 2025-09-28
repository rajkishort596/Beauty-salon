import React from "react";
import images from "../../constants/images";
import spaVideo from "../../assets/videos/Facial-Video.mp4";
const SpaProcudureSection = () => {
  return (
    <section className="pt-12 bg-bg text-center relative md:mb-[372px] min-h-[372px] lg:h-[480px] px-4">
      <h2 className="text-3xl sm:text-4xl md:text-5xl mb-5 font-semibold font-abhaya text-primary">
        Our SPA procedures
      </h2>
      <p className="text-text-muted max-w-2xl mx-auto">
        Indulge in our relaxing spa therapies designed to rejuvenate your body,
        calm your mind, and restore balance to your soul. Experience the perfect
        escape from stress with treatments tailored just for you.
      </p>
      <div className="mt-6 md:mt-0 mx-auto md:absolute md:top-1/2 w-full md:left-1/2 md:-translate-x-1/2  md:w-2/3">
        <div className="w-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            src={spaVideo}
            className="w-full h-auto max-h-[480px] object-cover"
          ></video>
        </div>
      </div>
    </section>
  );
};

export default SpaProcudureSection;
