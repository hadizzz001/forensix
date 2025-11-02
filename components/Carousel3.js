'use client';

export default function HeroImage() {
  const img =
    'https://res.cloudinary.com/duln5xyix/image/upload/v1760992804/aliceahnhawaiiweddingphotography-ab-353_4x_c3rgt4.webp';

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
