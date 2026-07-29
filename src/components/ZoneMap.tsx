"use client";

import { useEffect, useRef } from "react";

interface MapPoint {
  lat: number;
  lng: number;
  label: string;
  type: "fire" | "evacuation" | "animals" | "needs";
}

const POINTS: MapPoint[] = [
  { lat: 44.88, lng: -0.88, label: "Départ du feu · Saumos", type: "fire" },
  { lat: 44.8378, lng: -0.5795, label: "Parc des Expositions · Centre d'accueil", type: "evacuation" },
  { lat: 44.84, lng: -0.62, label: "Mérignac · Pompiers tombés", type: "fire" },
  { lat: 45.02, lng: -1.13, label: "Lacanau · Kinés secours", type: "needs" },
  { lat: 44.39, lng: 0.31, label: "Tonneins · Centre LPO faune sauvage", type: "animals" },
  { lat: 44.50, lng: -1.13, label: "Bassin d'Arcachon · Zone évacuée", type: "fire" },
  { lat: 44.89, lng: -0.51, label: "Bordeaux · Protection Civile", type: "needs" },
];

const ICONS: Record<string, string> = {
  fire: "🔥",
  evacuation: "🏥",
  animals: "🐾",
  needs: "🤝",
};

export function ZoneMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current || !containerRef.current) return;
    loadedRef.current = true;

    const L = (window as any).L;
    if (!L) return;

    const map = L.map(containerRef.current, {
      center: [44.70, -0.70],
      zoom: 9,
      zoomControl: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    POINTS.forEach((p) => {
      const marker = L.marker([p.lat, p.lng], {
        title: p.label,
      }).addTo(map);
      marker.bindTooltip(ICONS[p.type] + " " + p.label, {
        direction: "top",
        offset: [0, -8],
        className: "map-tooltip",
      });
    });

    // Fire zone circle
    L.circle([44.88, -0.88], {
      color: "#dc2626",
      fillColor: "#ef4444",
      fillOpacity: 0.15,
      radius: 30000,
      weight: 2,
    }).addTo(map);

    // Bordeaux circle
    L.circle([44.8378, -0.5795], {
      color: "#e85d3a",
      fillColor: "#f07050",
      fillOpacity: 0.1,
      radius: 15000,
      weight: 1.5,
    }).addTo(map);

    return () => { map.remove(); loadedRef.current = false; };
  }, []);

  return (
    <div className="border border-border rounded-sm overflow-hidden">
      <div ref={containerRef} className="h-[320px] w-full" />
      <div className="bg-card px-4 py-2.5 border-t border-border flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span>🔥 Foyers</span>
        <span>🏥 Évacuation</span>
        <span>🐾 Animaux</span>
        <span>🤝 Besoins</span>
        <span className="ml-auto">
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">© OSM</a>
        </span>
      </div>
    </div>
  );
}
