"use client";

import Link from "next/link";
import { useState } from "react";

interface Hotspot {
  id: string;
  href: string;
  label: string;
  // Position as percentages
  top: string;
  left: string;
  width: string;
  height: string;
}

const hotspots: Hotspot[] = [
  {
    id: "books",
    href: "/books",
    label: "Books",
    top: "28%",
    left: "3%",
    width: "18%",
    height: "45%",
  },
  {
    id: "papers",
    href: "/papers",
    label: "Conferences & Papers",
    top: "70%",
    left: "22%",
    width: "18%",
    height: "18%",
  },
  {
    id: "courses",
    href: "/courses",
    label: "Courses",
    top: "30%",
    left: "55%",
    width: "25%",
    height: "40%",
  },
  {
    id: "hobbies",
    href: "/hobbies",
    label: "Hobbies",
    top: "35%",
    left: "80%",
    width: "18%",
    height: "35%",
  },
  {
    id: "about",
    href: "/about",
    label: "About",
    top: "45%",
    left: "38%",
    width: "18%",
    height: "42%",
  },
  {
    id: "contact",
    href: "/contact",
    label: "Contact",
    top: "8%",
    left: "82%",
    width: "14%",
    height: "18%",
  },
];

export default function InteractiveStorefront() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Storefront Image */}
      <img
        src="/storefront.png"
        alt="Zeina's Corner Storefront"
        className="w-full h-auto rounded-lg shadow-lg"
        style={{
          border: '4px solid var(--color-vintage-teal-500)',
          boxShadow: '0 8px 32px rgba(95, 158, 160, 0.3)',
        }}
      />

      {/* Clickable Hotspots */}
      {hotspots.map((hotspot) => (
        <Link
          key={hotspot.id}
          href={hotspot.href}
          className="absolute transition-all duration-300 rounded-md"
          style={{
            top: hotspot.top,
            left: hotspot.left,
            width: hotspot.width,
            height: hotspot.height,
            backgroundColor: activeHotspot === hotspot.id
              ? 'rgba(95, 158, 160, 0.3)'
              : 'transparent',
            border: activeHotspot === hotspot.id
              ? '2px solid rgba(95, 158, 160, 0.6)'
              : '2px solid transparent',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setActiveHotspot(hotspot.id)}
          onMouseLeave={() => setActiveHotspot(null)}
          title={hotspot.label}
        >
          {/* Tooltip */}
          {activeHotspot === hotspot.id && (
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-10 px-3 py-1.5 rounded-md whitespace-nowrap z-10 font-serif font-semibold text-sm"
              style={{
                backgroundColor: 'var(--color-vintage-teal-600)',
                color: 'var(--color-cream-50)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              }}
            >
              {hotspot.label}
              {/* Arrow */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45"
                style={{ backgroundColor: 'var(--color-vintage-teal-600)' }}
              />
            </div>
          )}
        </Link>
      ))}

      {/* Helper text */}
      <p
        className="text-center mt-4 text-sm italic"
        style={{ color: 'var(--color-cream-700)' }}
      >
        Click on different parts of the shop to explore
      </p>
    </div>
  );
}
