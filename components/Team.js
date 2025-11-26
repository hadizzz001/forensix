'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

export default function OurStory() {
  const [projects, setProjects] = useState([]);
  const [expanded, setExpanded] = useState(null); // Track which slide is expanded

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('/api/team', { cache: 'no-store' });
        const data = await res.json();

        // Last 4 items
        const latest = data.slice(-4).reverse();
        setProjects(latest);
      } catch (error) {
        console.error("Failed to fetch team:", error);
      }
    };

    fetchTeam();
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-6 mt-20 mb-20">
      <div className="text-center mb-12">
        <h1 className="mttit1232 mb-10">Our Team</h1>
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
          {projects.map((project, index) => {
            const isExpanded = expanded === project._id;
            const shortText =
              project.description?.length > 70
                ? project.description.slice(0, 70) + "..."
                : project.description;

            return (
              <SwiperSlide key={project._id || index}>
                <div className="flex flex-col items-center cursor-pointer p-4">
                  
                  {/* Circle Image */}
                  <img
                    src={project.img?.[0] || '/fallback.jpg'}
                    alt={project.title}
                    className="w-[150px] h-[150px] rounded-full object-cover shadow-md transition-transform duration-500 hover:scale-105"
                  />

                  <div className="mt-4 text-center">
                    {/* Title */}
                    <h2 className="mttit12322 mt-1">
                      {project.title
                        ?.toLowerCase()
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 mt-2">
                      {isExpanded ? project.description : shortText}

                      {project.description?.length > 70 && (
                        <span
                          className="text-blue-600 ml-2 cursor-pointer underline"
                          onClick={() => toggleExpand(project._id)}
                        >
                          {isExpanded ? "View Less" : "View More"}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">Loading team...</p>
      )}
    </section>
  );
}
