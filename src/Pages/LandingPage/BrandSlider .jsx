import React from "react";
import logo from "../../assets/images/comLogo.png";

const BrandSlider = () => {
  // Number of times to repeat the logo for smooth scrolling
  const repeatCount = 20;

  return (
    <section id="homeLogoScroller" className="py-8 bg-gray-50 md:pt-20">
      <div className="text-center max-w-5xl mx-auto px-4">
        <p className="text-xl font-semibold mb-6 md:my-8 md:mx-6">
          More than 2000 brands across North America rely on our services for
          their driver training
        </p>

        <div className="overflow-hidden relative">
          <div
            className="flex gap-10 animate-marquee whitespace-nowrap"
            style={{ animationDuration: "5s" }}
          >
            {[...Array(repeatCount)].map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{ width: 160 }} // fixed width for each logo container
              >
                <img
                  src={logo}
                  alt="Company Logo"
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6">
          <a
            href="/resources/learn-more/customer-stories"
            className="bg-blue-950 text-white  md:px-10 md:py-2 px-6 py-1 rounded-full hover:bg-amber-600 hover:text-blue-900 border border-blue-800 transition"
          >
            Read their stories
          </a>
        </p>
      </div>
    </section>
  );
};

export default BrandSlider;
