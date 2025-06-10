import React from "react";
import images from "../../constants/images";

const Footer = () => {
  return (
    <footer className="bg-bg py-20 px-4 text-center relative overflow-hidden">
      {/* Background flower logo*/}
      <div className="absolute inset-0 flex justify-center items-center opacity-3">
        <img
          src={images.lotusBg}
          alt="Background Logo"
          className="object-contain"
        />
      </div>

      <div>
        <img src={images.logo} alt="Logo" className="mx-auto h-12 mb-2" />
        <h2 className=" text-[40px] md:text-[50px] font-imperial text-primary">
          Beauty Salon
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mt-2 text-sm">
          Est tortor egestas sed feugiat elementum. Viverra nulla amet a
          ultrices massa dui. Tortor est purus morbi vitae arcu suspendisse
          amet.
        </p>

        {/* Social icons */}
        <div className="flex justify-center gap-4 mt-4 text-primary">
          <a href="#">
            <img src={images.fbIcon} className="hover:text-black transition" />
          </a>
          <a href="#">
            <img src={images.xIcon} className="hover:text-black transition" />
          </a>
          <a href="#">
            <img
              src={images.instaIcon}
              className="hover:text-black transition"
            />
          </a>
          <a href="#">
            <img src={images.telIcon} className="hover:text-black transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
