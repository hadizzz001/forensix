'use client';

import { useEffect, useState } from 'react';

export default function OurStory() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blog', { cache: 'no-store' });
        const data = await res.json();

        // Show ALL blogs (no slice)
        setProjects(data.reverse()); // reverse → latest first
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-6 mt-20 mb-20">
      <div className="text-center mb-12">
        <h1 className="mttit1232 mb-10">Our Blogs</h1>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a href={`/blog?id=${project._id}`} key={project._id || index}>
              <div className="flex flex-col cursor-pointer">
                <img
                  src={project.img?.[0] || '/fallback.jpg'}
                  alt={project.title}
                  className="w-full h-[250px] md:h-[300px] object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                />

                <div className="mt-3 text-center">
                  {project.author && (
                    <p className="text-sm text-gray-500">{project.author}</p>
                  )}

                  <h2 className="mttit12322 mt-1">
                    {project.title
                      ?.toLowerCase()
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
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading blogs...</p>
      )}
 
    </section>
  );
}
