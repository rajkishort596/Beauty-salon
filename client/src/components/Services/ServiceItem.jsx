const ServiceItem = ({ title, subtitle, items, image, order = "left" }) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        order === "right" ? "md:flex-row-reverse" : ""
      } items-center gap-6 my-12`}
    >
      <div className="w-full md:w-1/2 max-h-[600px] rounded-md flex justify-center items-center overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      <div className="w-full md:w-1/2 text-left px-4 lg:px-25 lg:py-19">
        <h3 className="text-5xl font-bold font-abhaya text-primary mb-2">
          {title}
        </h3>
        <p className="text-gray-500 mb-4">{subtitle}</p>
        <ul className="space-y-2">
          {items.map((service, idx) => (
            <li key={idx} className="flex justify-between items-center pb-3">
              <span className="text-black font-semibold">{service.name}</span>
              <span className="w-1/3 lg:w-1/2 h-0.5 border-b border-dashed"></span>
              <span className="text-primary font-semibold">
                ${service.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceItem;
