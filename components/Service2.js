'use client';

import { useEffect, useState } from 'react';
import { myFont } from '../app/fonts';
import { useSearchParams } from 'next/navigation';

export default function OurStory() { 
  const [project, setProject] = useState(null);
  const searchParams = useSearchParams();
  const search = searchParams.get('id'); // ?id=BIRTHDAY etc.

  const fetchProject = async () => {
    try {
      const res = await fetch(`https://forensix-dash.netlify.app/api/project/${search}`);

      const data = await res.json();
      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  useEffect(() => {
    if (search) fetchProject();
  }, [search]);

  return (
    <>
      {/* Hero Section — video or fallback image with button */}
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        {project?.img && project.img.length > 0 ? (
          <img
            src={project.img[0]}
            alt={project?.title || "Hero"}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src="https://res.cloudinary.com/dn23oe6gg/image/upload/v1762098937/6729c105bce0b1362a7da126_fintech-bg-p-1600_y2a2lq.webp"
            alt="Hero fallback"
            className="w-full h-full object-cover"
          />
        )}


        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Contact Us Button */}
        <button
          className="text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-transparent text-white px-7 py-3 border border-white z-10
            uppercase transition-colors duration-200 hover:bg-white hover:text-black"
          onClick={() => {
            const encodedTitle = encodeURIComponent(project?.title);
            window.location.href = `/contact`;
          }}

        >
          <span className="inline-flex items-center gap-2">
            Contact Us
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M8 5l7 7-7 7" stroke="none" />
            </svg>
          </span>
        </button>
      </div>

      {/* Content Section */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12">
        <div className="  mb-12">
          <h1 className={`mttit1232 mb-10`}>
            {project?.title
              ? project.title 
              : 'Loading...'}
          </h1>

          <p className='mySerText'
            dangerouslySetInnerHTML={{
              __html: project?.description || `Loading...`,
            }}
          ></p>
        </div>

        {/* Gallery Section */}
        {project ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.img?.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden group w-full aspect-square cursor-default"
              >
                <img
                  src={image}
                  alt={project.title || `Project Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
            ))}


          </div>
        ) : (
          <p className="text-center text-gray-500">Loading project...</p>
        )}





{/* Sub Sections Grid */}
{project?.sections && project.sections.length > 0 && (
  <section className="w-full max-w-7xl mx-auto px-6 mt-20 mb-20">
    <div className="text-center mb-12">
      <h1 className="mttit1232 mb-10">More In This Service</h1>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {project.sections.map((section, index) => (
        <a
          key={section.id || index}
          href={`/service1?id=${section.id}`}
        >
          <div className="flex flex-col cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-500 hover:scale-105 h-full">
            
            {/* Image */}
            <img
              src={section.img?.[0] || '/fallback.jpg'}
              alt={section.title}
              className="w-full h-[250px] md:h-[300px] object-cover"
            />

            {/* Content */}
            <div className="flex flex-col flex-1 mt-3 px-4 pb-4 text-left">

              <h2 className="mttit12322 mt-1">{section.title}</h2>

              {/* Cleaned Description Preview */}
              <p className="text-sm text-gray-600 mt-2 mb-3 flex-1">
                {section.description
                  .replace(/<[^>]+>/g, '') // remove HTML tags
                  .slice(0, 250)}
                {section.description.length > 250 ? '...' : ''}
              </p>

              <span className="text-blue-600 font-medium text-sm hover:underline mt-auto cursor-pointer">
                Read More
              </span>
            </div>

          </div>
        </a>
      ))}
    </div>
  </section>
)}












      </section>
    </>
  );
}
