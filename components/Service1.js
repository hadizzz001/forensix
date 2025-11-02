'use client';

import { useEffect, useState } from 'react';
import { myFont } from '../app/fonts';
import Link from 'next/link';

export default function OurStory() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('https://Forensix-dash.netlify.app/api/project');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className={`${myFont.className} myparhal2 mb-10`}>Our Services</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <a href={`/service?id=${project.id}`} key={project.id || index}>
              <div className="relative overflow-hidden group w-full aspect-square cursor-pointer">
                {/* Image */}
                <img
                  src={project.img?.[0] || '/fallback.jpg'}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out
                             group-hover:scale-105 group-hover:brightness-[1]"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-0 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
<h2 className="text-white text-2xl md:text-3xl font-semibold mb-4 text-center">
  {project.title
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())}
</h2>

                  <button
                    className="text-xl md:text-2xl relative bg-transparent text-white border border-white px-7 py-3
                               uppercase transition-colors duration-200 hover:bg-white hover:text-black"
                  >
                    <span className="inline-flex items-center gap-2">
                      Contact Us
                    </span>
                  </button>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">Loading services...</p>
        )}
      </div>

   
    </section>
  );
}
