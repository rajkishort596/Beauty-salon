import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(true);
  const { discounts } = useSelector((state) => state.discounts);

  if (!visible || !discounts) return null;

  console.log(discounts);

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
          🔥
          {discounts?.[0]?.title?.toUpperCase()} &nbsp;— Get{" "}
          {discounts?.[0]?.percentage}% OFF on{" "}
          {discounts?.[0]?.category
            ?.map((item) => item.toUpperCase())
            .join(" & ")}{" "}
          | Valid from{" "}
          {new Date(discounts?.[0]?.validFrom).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}{" "}
          till{" "}
          {new Date(discounts?.[0]?.validTill).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
