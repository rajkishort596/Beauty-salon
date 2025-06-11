import React from "react";
import facialVideo from "../../assets/videos/Facial-Video.mp4";
import images from "../../constants/images";
const VideoInfoSection = () => {
  const infoPoints = [
    {
      icon: images.mirrorIcon,
      title: "Professional Care",
      description: "Eleifend arcu non lorem justo in tempus purus gravida.",
    },
    {
      icon: images.brandIcon,
      title: "Premium brands",
      description: "Eleifend arcu non lorem justo in tempus purus gravida.",
    },
    {
      icon: images.lotusIcon,
      title: "Natural cosmetic",
      description: "Eleifend arcu non lorem justo in tempus purus gravida.",
    },
  ];

  return (
    <section className="flex flex-col pb-12 pt-[250px]">
      {/* Video Container */}
      <div className="w-full flex justify-center items-center">
        <video src={facialVideo} autoPlay muted loop playsInline />
      </div>

      {/* Info Points */}
      <div className="bg-bg py-10 px-4 flex flex-col md:flex-row justify-center gap-8 text-center">
        {infoPoints.map(({ icon, title, description }, index) => (
          <div
            key={index}
            className="flex flex-col items-center max-w-sm mx-auto"
          >
            <img src={icon} alt={title} className="h-12 mb-2" />
            <h3 className="font-semibold text-primary mb-1">{title}</h3>
            <p className="text-sm max-w-[240px] text-text-muted">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoInfoSection;
