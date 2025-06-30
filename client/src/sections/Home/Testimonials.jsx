// import images from "../../constants/images";

import React, { useState } from "react";

const Testimonials = ({ reviews }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = reviews[activeIndex];

  if (!reviews || reviews.length === 0) {
    return (
      <section className="relative py-10 px-5 bg-bg text-center h-[300px] md:h-[372px]">
        <h2 className="text-primary text-3xl md:text-4xl font-semibold">
          Testimonials
        </h2>
        <p className="text-gray-600 mt-2 mb-8 text-sm md:text-base max-w-xl mx-auto">
          Eleifend arcu non lorem justo in tempus purus gravida tortor egestas
          sed feugiat elementum
        </p>
        <div className="flex items-center justify-center h-full">
          <span className="text-gray-500 text-lg">No review yet</span>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-10 px-5 bg-bg text-center h-[300px] md:h-[372px]">
      <h2 className="text-primary text-3xl md:text-4xl font-semibold">
        Testimonials
      </h2>
      <p className="text-gray-600 mt-2 mb-8 text-sm md:text-base max-w-xl mx-auto">
        Eleifend arcu non lorem justo in tempus purus gravida tortor egestas sed
        feugiat elementum
      </p>
      <div className="absolute top-1/2 w-[90%] md:w-1/2 h-[300px] md:h-[372px] left-1/2 -translate-x-1/2 bg-white max-w-3xl mx-auto shadow-lg rounded-md ">
        <div className="relative h-[100%] flex flex-col justify-center items-center px-8 py-10">
          <span className="absolute -left-6 -top-6 text-9xl text-primary font-serif">
            &lsquo;&lsquo;
          </span>
          <div className="flex flex-col items-center text-center justify-center gap-4 mb-4">
            <div>
              <h4 className="text-primary font-semibold">
                {active.user.fullName}
              </h4>
              {/* <p className="text-sm text-gray-500 ">{active.role}</p> */}
            </div>
            {/* Profile Switcher */}
            <div className="flex justify-center gap-6">
              {reviews.map((r, index) => (
                <img
                  key={index}
                  src={r.user.avatar.url}
                  alt={r.user.fullName}
                  className={`w-20 h-20 rounded-full cursor-pointer border-3 ${
                    index === activeIndex ? "border-primary" : "border-gray-300"
                  }`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-700 text-center text-sm md:text-base">
            {active.comment}
          </p>
          <span className="absolute top-[calc(100%-25px)] text-9xl -right-6  text-primary font-serif">
            &rsquo;&rsquo;
          </span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
