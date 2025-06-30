import { useState } from "react";
import { FaFire, FaTimes } from "react-icons/fa";

const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-primary relative overflow-hidden">
      {/* Close button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-300 z-20"
      >
        <FaTimes size={16} />
      </button>

      {/* Marquee wrapper */}
      <div className="flex items-center justify-center py-2 w-full">
        <div className="marquee text-white font-medium text-sm whitespace-nowrap">
          ONLY THIS MONTH 20% DISCOUNT ON MAKEUP & NAIL CARE
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
