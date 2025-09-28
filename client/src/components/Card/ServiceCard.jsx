const ServiceCard = ({ image, icon, title }) => {
  return (
    <div className="relative overflow-hidden rounded-sm shadow-md h-72 w-full">
      {/* Image with zoom on hover */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      />

      {/* Dark overlay always visible */}
      <div className="absolute inset-0 bg-black/40 transition duration-500" />

      {/* Icon and title container*/}
      <div className="absolute bottom-0 left-0 p-4 w-full flex items-end gap-4">
        <img
          src={icon}
          alt={title}
          className=" rounded-sm h-10 w-10 xl:h-16 xl:w-16"
        />
        <h3 className="capitalize font-abhaya font-bold text-2xl text-white">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ServiceCard;
