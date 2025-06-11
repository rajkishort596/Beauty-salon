import images from "../../constants/images";

const InstagramSection = () => {
  const instagramImages = [
    images.img,
    images.img1,
    images.img2,
    images.img3,
    images.img4,
    images.img5,
    images.img6,
    images.img7,
    images.img8,
    images.img9,
  ];
  return (
    <section className="pt-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
        Follow our Instagram
      </h2>
      <p className="text-gray-500 max-w-xl mx-auto mb-10 px-4">
        Viverra nulla amet a ultrices massa dui. Tortor est purus morbi vitae
        arcu suspendisse amet.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5">
        {instagramImages.map((src, i) => (
          <div key={i} className="overflow-hidden">
            <img
              src={src}
              alt={`Instagram post ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;
