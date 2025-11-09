"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { ArrowRight } from "lucide-react";

export default function OurServices() {
  const [services, setServices] = useState([]);
    const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check the hash manually
    if (typeof window !== "undefined") {
      const hash = window.location.hash; // e.g. "#myservscroll"
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 150); // small delay to allow rendering
        }
      }
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services", { cache: "no-store" }); // change URL if needed
        const data = await res.json();

        // ✅ Get only last 6 items
        const lastSix = data ;

        setServices(lastSix);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="flex flex-col items-center my-20 gap-10 py-16 " id="myservscroll">
      <div className="max-w-[900px] text-center">
        <h1 className="mb-6 mttit1232">Our Services</h1>
        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#555",
            marginBottom: "20px",
          }}
        >
          We empower financial crime investigators with advanced AI tools to
          detect, analyze, and prevent fraudulent activities.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex w-[550px] md:w-[620px] bg-[#e8eff3] h-[250px]"
          >
            {/* Left line */}
            <div className="w-[4px] bg-[#0b2556] shrink-0"></div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-between text-left">
              <h3 className="mttit12322 mb-3">{service.title}</h3>

              <p
                className="mttit123223 mb-6"
                dangerouslySetInnerHTML={{
                  __html: service?.description?.slice(0, 60) + "..."
                }}
              />

<a href={`/service?id=${service._id}`}>
              <button className="flex items-center gap-2 text-[#2c9fd5] hover:opacity-70 transition">
                Learn more
                <ArrowRight className="w-4 h-4 text-[#2c9fd5]" />
              </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
