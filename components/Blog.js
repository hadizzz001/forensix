'use client';

import { useEffect, useState } from 'react';
import { myFont } from '../app/fonts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

export default function OurStory() {
  const [projects, setProjects] = useState([]);

  // ✅ STATIC DATA
  const staticProjects = [
    {
      id: '1',
      title: 'AI Fraud Detection Revolution',
      author: 'John Carter',
      img: ['https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800'],
      date: '2024-08-12',
    },
    {
      id: '2',
      title: 'How Machine Learning Detects Financial Crimes',
      author: 'Sarah Mitchell',
      img: ['https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800'],
      date: '2024-09-01',
    },
    {
      id: '3',
      title: 'Digital Forensics For Banking Systems',
      author: 'Daniel Roberts',
      img: ['https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=800'],
      date: '2024-09-14',
    },
    {
      id: '4',
      title: 'Predictive Analytics Stops Fraud Faster',
      author: 'Emma Wilson',
      img: ['https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=800'],
      date: '2024-10-01',
    },
    {
      id: '5',
      title: 'Top 5 Tools Banks Use For Fraud Prevention',
      author: 'Michael Brown',
      img: ['https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=800'],
      date: '2024-08-22',
    },
    {
      id: '6',
      title: 'Forensic Data Integrity & Compliance',
      author: 'Laura Parker',
      img: ['https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=800'],
      date: '2024-09-28',
    },
  ];

  useEffect(() => {
    // Simulating the API but using static data
    setProjects(staticProjects.slice(0, 6));
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 mt-20 mb-20">
      <div className="text-center mb-12">
        <h1 className={`mttit1232 mb-10`}>Our Blogs</h1>
      </div>

      {projects.length > 0 ? (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id || index}>
              <a href={`/blog?id=${project.id}`}>
                <div className="flex flex-col cursor-pointer">
                  <img
                    src={project.img?.[0] || '/fallback.jpg'}
                    alt={project.title}
                    className="w-full h-[250px] md:h-[300px] object-cover  transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                  <div className="mt-3 text-center">
                    {project.author && (
                      <p className="text-sm text-gray-500">{project.author}</p>
                    )}
                    <h2 className="mttit12322 mt-1">
                      {project.title
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                    </h2>
                    {project.date && (
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(project.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">Loading services...</p>
      )}

      <div className="flex justify-center mt-10">
        <a href={`/blogs`}>
          <button
            className="text-xl md:text-2xl bg-transparent text-black mybbborder border-black px-7 py-3
                 uppercase transition-colors duration-200"
          >
            <span className="inline-flex items-center gap-2">View more</span>
          </button>
        </a>
      </div>
    </section>
  );
}
