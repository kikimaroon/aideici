"use client";

import { useState, useMemo } from "react";
import { Need } from "@/types";

const CATEGORY_EMOJI: Record<string, string> = {
  Solidarité: "🤝",
  Animaux: "🐾",
  Environnement: "🌿",
  Logistique: "📦",
  Mentorat: "🧭",
  Éducation: "📚",
  Social: "🤝",
};

type FilterProps = {
  needs: Need[];
  onFilter: (filtered: Need[]) => void;
};

export function NeedFilter({ needs, onFilter }: FilterProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [onlyUrgent, setOnlyUrgent] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(needs.map((n) => n.category).filter(Boolean));
    return [...cats].sort();
  }, [needs]);

  const filtered = useMemo(() => {
    let result = needs;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          (n.summary && n.summary.toLowerCase().includes(q)) ||
          (n.location && n.location.toLowerCase().includes(q))
      );
    }
    if (category) result = result.filter((n) => n.category === category);
    if (onlyUrgent) result = result.filter((n) => n.title.toUpperCase().startsWith("URGENT"));
    return result;
  }, [needs, search, category, onlyUrgent]);

  // Notify parent
  useMemo(() => {
    onFilter(filtered);
  }, [filtered, onFilter]);

  return (
    <div className="flex flex-wrap items-end gap-2.5">
      {/* Search */}
      <div className="flex-1 min-w-[180px]">
        <label htmlFor="filter-search" className="sr-only">Rechercher un besoin</label>
        <input
          id="filter-search"
          type="text"
          placeholder="Rechercher un besoin…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-[44px] w-full rounded-sm border border-border bg-secondary px-3 text-[14px] text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/70 hover:border-foreground/30 focus:border-foreground"
        />
      </div>

      {/* Category filter */}
      <div>
        <label htmlFor="filter-cat" className="sr-only">Catégorie</label>
        <select
          id="filter-cat"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-[44px] rounded-sm border border-border bg-secondary px-3 text-[13px] text-foreground outline-none transition-colors duration-200 hover:border-foreground/30 focus:border-foreground"
        >
          <option value="">Toutes catégories</option>
          {categories.map((c) => (
            <option key={c ?? ""} value={c ?? ""}>
              {c ? CATEGORY_EMOJI[c] || "" : ""} {c}
            </option>
          ))}
        </select>
      </div>

      {/* Urgent toggle */}
      <button
        type="button"
        onClick={() => setOnlyUrgent(!onlyUrgent)}
        className={`h-[44px] shrink-0 rounded-sm border px-3 text-[13px] font-semibold transition-colors duration-200 ${
          onlyUrgent
            ? "border-red-300 bg-red-100 text-red-700"
            : "border-border bg-secondary text-muted-foreground hover:border-foreground/30"
        }`}
      >
        🔴 Urgences
      </button>

      {/* Clear */}
      {(search || category || onlyUrgent) && (
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setCategory("");
            setOnlyUrgent(false);
          }}
          className="h-[44px] shrink-0 rounded-sm border border-border bg-secondary px-3 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ✕ Effacer
        </button>
      )}

      {/* Count */}
      <span className="text-[11px] tabular-nums text-muted-foreground">
        {filtered.length} besoin{filtered.length > 1 ? "s" : ""}
      </span>
    </div>
  );
}
