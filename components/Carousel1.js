'use client';

export default function HeroImage() {
  const img =
    'https://res.cloudinary.com/dn23oe6gg/image/upload/v1762098937/6729c105bce0b1362a7da126_fintech-bg-p-1600_y2a2lq.webp';

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {/* Image */}
      <img
        src={img}
        alt="Hero Background"
        className="w-full h-full object-cover object-bottom" // crop from the end
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Centered Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="mttit123 mb-2 uppercase">
          Looking for finance crimes?
        </h1>
        <p className="mttit1231 mb-3">
          Detect fraud, anomalies, and suspicious activity using AI-powered investigation tools.
        </p>

                  <button
                    className="text-lg md:text-xl bg-transparent text-white px-7 py-3 border border-white uppercase transition-colors duration-200 hover:bg-white hover:text-black"
                    onClick={() => { window.location.href = `/contact`; }}
                  >
                    Book a Call
                  </button>
      </div>
    </div>
  );
}
