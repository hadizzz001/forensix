'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { UserCircle } from 'lucide-react';

const reviews = [
  { name: 'A. Johnson', desc: 'Amazing service and fast delivery!', stars: 5 },
  { name: 'M. Smith', desc: 'Very satisfied with my order.', stars: 4 },
  { name: 'Chris P.', desc: 'High quality and great customer support.', stars: 5 },
  { name: 'Jamie L.', desc: 'Love the products, will buy again!', stars: 4 },
  { name: 'Taylor G.', desc: 'Excellent experience overall.', stars: 5 },
  { name: 'Jordan M.', desc: 'Good prices and reliable!', stars: 4 },
];

const StarRating = ({ count }) => (
  <div className="flex justify-center space-x-1 mt-2">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{ color: '#E6C980', fontSize: '24px' }}>★</span>
    ))}
  </div>
);

export default function ReviewSwiper() {
  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
      >
        {reviews.map((rev, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-xl text-black flex flex-col items-center text-center shadow-md relative mt-20">
              
              {/* Top line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#BD93D8]" />

              {/* Icon in circle */}
              <div className="flex items-center justify-center w-32 h-32 rounded-full bg-[#f6e8ff] mb-4">
                <UserCircle size={60} strokeWidth={1} color="black" />
              </div>

              <p className="myGray" style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>{rev.name}</p>
              <p className="myGray" style={{ fontSize: "16px", lineHeight: "1.6", textAlign: "justify" }}>{rev.desc}</p>
              <StarRating count={rev.stars} />

              {/* Bottom line */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#BD93D8]" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
