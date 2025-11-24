'use client';

import { useEffect, useState } from 'react';

export default function OurStory() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/servicesz', { cache: 'no-store' });
        const data = await res.json();

        // Take last 6 blogs
        const latestBlogs = data.slice(-6).reverse();

        setProjects(latestBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 mt-20 mb-20">
      <div className="text-center mb-12">
        <h1 className="mttit1232 mb-10">Our Services</h1>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a key={project._id || index} href={`/service?id=${project._id}`}>
              <div className="flex flex-col cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105 h-full">
                <img
                  src={project.img?.[0] || '/fallback.jpg'}
                  alt={project.title}
                  className="w-full h-[250px] md:h-[300px] object-cover"
                />
                <div className="flex flex-col flex-1 mt-3 px-4 pb-4 text-left">
                  {project.author && (
                    <p className="text-sm text-gray-500">{project.author}</p>
                  )}

                  <h2 className="mttit12322 mt-1">{project.title}</h2>

                  <p className="text-sm text-gray-600 mt-2 mb-3 flex-1">
                    {project.description
                      .replace(/<[^>]+>/g, '')
                      .slice(0, 400)}
                    {project.description.length > 400 ? '...' : ''}
                  </p>

                  <a
                    href={`/service?id=${project._id}`}
                    className="text-blue-600 font-medium text-sm hover:underline mt-auto"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading blogs...</p>
      )}

      <div className="flex justify-center mt-10">
        <a href={`/services`}>
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
