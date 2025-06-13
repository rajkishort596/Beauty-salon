import React from "react";
import images from "../../constants/images";

const ContactSection = () => {
  return (
    <section className="bg-white px-4 md:px-18 py-15 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10">
      <div className="relative flex flex-col items-center w-auto md:w-[300px] text-center pb-10">
        <p className="text-primary font-abhaya text-2xl">Address</p>
        <p className="font-inter text-2xl text-black mt-10">
          19 North Road Piscataway, NJ 08854
        </p>
        <div className="absolute top-8 w-full flex justify-center">
          <img
            src={images.locationIcon}
            className="max-w-[120px] lg:max-w-1/2 object-cover"
          />
        </div>
      </div>
      <div className="relative flex flex-col items-center w-auto md:w-[300px] text-center pb-10">
        <p className="text-primary font-abhaya text-2xl">Email</p>
        <p className="font-inter text-2xl text-black mt-10">
          gamma@sbcglobal.net
        </p>
        <div className="absolute top-8 w-full flex justify-center">
          <img src={images.mailIcon} className="max-w-1/2 object-cover" />
        </div>
      </div>
      <div className="relative flex flex-col items-center w-auto md:w-[300px] text-center pb-10">
        <p className="text-primary font-abhaya text-2xl">Phone</p>
        <p className="font-inter text-2xl text-black mt-10 mb-4">
          (246) 917-5787
        </p>
        <p className="font-inter text-2xl text-black">(979) 353-9935</p>
        <div className="absolute top-8 w-full flex justify-center">
          <img src={images.phoneIcon} className="max-w-1/2 object-cover" />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
