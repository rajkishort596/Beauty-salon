import React from "react";

const MapSection = () => {
  const latitude = 26.46987;
  const longitude = 85.697411;

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    longitude - 0.01
  }%2C${latitude - 0.01}%2C${longitude + 0.01}%2C${
    latitude + 0.01
  }&marker=${latitude}%2C${longitude}`;

  return (
    <div className="w-full h-[400px] border border-primary rounded-lg shadow-md">
      <iframe
        width="100%"
        height="100%"
        src={mapUrl}
        title="Static Map"
      ></iframe>
    </div>
  );
};

export default MapSection;
