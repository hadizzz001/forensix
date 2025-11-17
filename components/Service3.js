'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SubSectionPage() {
  const [subSection, setSubSection] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const sectionId = searchParams.get('id'); // <-- page?id=SUBSECTION_ID

  const fetchSubSection = async () => {
    try {
      // Fetch all services
      const res = await fetch(`api/services`);
      const allServices = await res.json();

      // Find the service that contains this subsection
      let found = null;

      for (const service of allServices) {
        const match = service.sections?.find(sec => sec.id === sectionId);
        if (match) {
          found = match;
          break;
        }
      }

      setSubSection(found || null);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching subsection:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sectionId) fetchSubSection();
  }, [sectionId]);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (!subSection)
    return <p className="text-center py-20">Sub-section not found</p>;

  return (
    <>
      {/* Hero */}
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
        <img
          src={subSection.img?.[0] || "https://via.placeholder.com/1200"}
          alt={subSection.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <button
          className="text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            bg-transparent text-white px-7 py-3 border border-white z-10
            uppercase transition-colors duration-200 hover:bg-white hover:text-black"
          onClick={() => (window.location.href = "/contact")}
        >
          Contact Us
        </button>
      </div>

      {/* Content */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12">
        <h1 className="mttit1232 mb-10">{subSection.title}</h1>

        <p
          className="mySerText"
          dangerouslySetInnerHTML={{ __html: subSection.description }}
        ></p>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {subSection.img?.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden group w-full aspect-square cursor-default"
            >
              <img
                src={image}
                alt={`${subSection.title} image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
