const ServiceCard = ({ image, icon, title }) => {
  return (
    <div className="relative overflow-hidden rounded-sm shadow-md group h-72 w-full">
      {/* Image with zoom on hover */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-opacity-60 transition duration-500" />

      {/* Icon and title container */}
      <div className="absolute bottom-0 left-0 p-4 w-full flex items-end gap-4 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <img src={icon} alt={title} className="h-16 w-16" />
        <h3 className="capitalize font-abhaya font-bold text-2xl text-white">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ServiceCard;
