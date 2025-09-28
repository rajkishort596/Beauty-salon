import React from "react";
import images from "../../constants/images";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-bg py-20 px-4 text-center relative overflow-hidden">
      <div className="relative z-10">
        <Link to="/">
          <img
            src={images.logo}
            alt="Logo"
            className="cursor-pointer mx-auto h-12 mb-2"
          />
        </Link>
        <h2 className=" text-[40px] md:text-[50px] font-imperial text-primary">
          Beauty Salon
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mt-2 text-sm">
          Step into our salon and leave the everyday behind. We are dedicated to
          providing personalized beauty services, from the latest hair trends to
          luxurious spa treatments. Our goal is simple: to make you feel
          beautiful, confident, and completely revitalized from the moment you
          walk through the door.
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
      {/* Background flower logo*/}
      <div className="absolute inset-0 flex justify-center items-center opacity-3">
        <img
          src={images.lotusBg}
          alt="Background Logo"
          className="object-contain"
        />
      </div>
    </footer>
  );
};

export default Footer;
