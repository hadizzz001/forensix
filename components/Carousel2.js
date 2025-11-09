'use client';

export default function HeroImage() {
  const img =
    'https://res.cloudinary.com/dn23oe6gg/image/upload/v1762098937/6729c105bce0b1362a7da126_fintech-bg-p-1600_y2a2lq.webp';

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
      {/* Image */}
      <img
        src={img}
        alt="Hero"
        className="w-full h-full object-cover"
      />

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

     
    </div>
  );
}
