'use client';

export default function HeroImage() {
  const img =
    'https://res.cloudinary.com/duln5xyix/image/upload/v1760987013/shine-wedding-altar-newlyweds-stands-backyard-decorated-with-balloons_or7way.webp';

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
