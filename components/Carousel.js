'use client';

const images = [
  'https://res.cloudinary.com/dn23oe6gg/image/upload/v1762096955/home-hero4_ykskbt.webp',
];

export default function CustomCarousel() {
  return (
    <div className="relative w-full">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="relative w-full h-[900px] md:h-[800px] lg:h-[800px] overflow-hidden"
        >
          {/* Background Image */}
          <img
            src={img}
            alt={`Slide ${idx + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* LEFT CONTENT (moved toward bottom) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute inset-0 flex items-end pb-32">
            <div className="z-10 text-left text-white max-w-[600px]">
              <h1 className="mttit123 mb-2 uppercase">
                Inside the Financial Crime
              </h1>
              <p className="mttit1231 mb-3">
                We help businesses, regulators, and individuals uncover hidden fraud using advanced AI-driven data analytics.
              </p>

              <button
                className="text-lg md:text-xl bg-transparent text-white px-7 py-3 border border-white uppercase transition-colors duration-200 hover:bg-white hover:text-black"
                onClick={() => { window.location.href = `/contact`; }}
              >
                Book a Call
              </button>
            </div>
          </div>

          {/* BLOB IMAGE DIVIDER (FULL WIDTH, SMALL HEIGHT) */}
{/* BLOB IMAGE DIVIDER (FULL WIDTH, SMALL HEIGHT) */}
<div className="absolute bottom-0 left-0 w-screen overflow-hidden">
  <img
    src="https://res.cloudinary.com/dn23oe6gg/image/upload/v1762028092/download_iteir8.svg"
    alt="shape divider"
    className="w-full stylemob object-cover block"  // <-- add block here
  />
</div>

        </div>
      ))}
    </div>
  );
}
