const ServiceCard = ({ image, icon, title }) => {
  return (
    <div className="relative overflow-hidden shadow-md group">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute bottom-0 left-0 p-4 w-full flex items-end gap-6">
        <img src={icon} alt={title} className="h-16 w-16" />
        <h3 className="capitalize font-abhaya font-bold text-2xl text-white">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default ServiceCard;
