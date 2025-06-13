import React from "react";

const PurposeSection = () => {
  return (
    <section className="py-15 px-4 md:px-18 bg-white">
      <div className="max-w-6xl mx-auto m-w-[1076px] px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-10 font-abhaya">
          We can create what you imagine
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left items-end">
          <div>
            <h3 className="text-xl font-semibold font-abhaya text-primary mb-2">
              Blandit at maecenas
            </h3>
            <p className="text-text-muted mb-4">
              Blandit at maecenas dui sed amet sit enim vitae. Amet purus dictum
              urna sagittis dignissim. At fermentum nisl ullamcorper orci.
              Pellentesque id tempor lacus aliquet tempus vitae nibh habitasse
              consectetur. Augue quis cras blandit habitant neque. Faucibus
              vestibulum id nisi ligula ultricies et vehicula.
            </p>
            <p className="text-text-muted">
              Et adipiscing mattis egestas mi placerat duis congue id.
              Scelerisque...
            </p>
          </div>

          <div>
            <p className="text-text-muted mb-4">
              Lorem ipsum dolor sit amet consectetur. Blandit at maecenas dui
              sed amet sit enim vitae. Amet purus dictum urna sagittis
              dignissim. At fermentum nisl ullamcorper orci.
            </p>
            <p className="text-text-muted">
              Pellentesque id tempor lacus aliquet tempus vitae nibh habitasse
              consectetur. Augue quis cras blandit habitant neque. Faucibus
              vestibulum id nisi ligula ultricies et vehicula....
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;
