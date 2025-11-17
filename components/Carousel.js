'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function CustomCarousel() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banner');
        const data = await res.json();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        slidesPerView={1}
        className="w-full"
      >
        {banners.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="relative w-full h-[900px] md:h-[800px] lg:h-[800px] overflow-hidden">
              
              {/* Background Image */}
              <img
                src={item.img?.[0]}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>

              {/* Text Content */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute inset-0 flex items-end pb-32">
                <div className="z-10 text-left text-white max-w-[600px]">
                  <h1 className="mttit123 mb-2 uppercase">{item.title}</h1>
                  <p className="mttit1231 mb-3">{item.description}</p>

                  <button
                    className="text-lg md:text-xl bg-transparent text-white px-7 py-3 border border-white uppercase transition-colors duration-200 hover:bg-white hover:text-black"
                    onClick={() => { window.location.href = '/contact'; }}
                  >
                    Book a Call
                  </button>
                </div>
              </div>

              {/* Divider SVG */}
              <div className="absolute bottom-0 left-0 w-screen overflow-hidden">
                <img
                  src="https://res.cloudinary.com/dn23oe6gg/image/upload/v1762028092/download_iteir8.svg"
                  alt="shape divider"
                  className="w-full stylemob object-cover block"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
