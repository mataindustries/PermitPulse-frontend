// src/components/CityButtons.tsx
import React from "react";

type Props = {
  value: string;
    onChange: (key: string) => void;
    };

    const choices: { key: string; label: string; badge?: string }[] = [
      { key: "weho", label: "WeHo" },
        { key: "beverly hills", label: "Beverly Hills" },
          { key: "altadena", label: "Altadena", badge: "New" },
            { key: "palisades", label: "Palisades" },
              { key: "san diego", label: "San Diego", badge: "Beta" },
                { key: "sacramento", label: "Sacramento", badge: "Beta" },
                  { key: "combined", label: "Combined" }, // your existing combined view
                  ];

                  export default function CityButtons({ value, onChange }: Props) {
                    return (
                        <div className="flex flex-wrap gap-3">
                              {choices.map((c) => {
                                      const active = value.toLowerCase() === c.key;
                                              return (
                                                        <button
                                                                    key={c.key}
                                                                                onClick={() => onChange(c.key)}
                                                                                            className={
                                                                                                          "px-4 py-2 rounded-xl border transition-colors " +
                                                                                                                        (active
                                                                                                                                        ? "bg-white/10 border-white/20 text-white"
                                                                                                                                                        : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10")
                                                                                                                                                                    }
                                                                                                                                                                                aria-pressed={active}
                                                                                                                                                                                          >
                                                                                                                                                                                                      <span className="inline-flex items-center gap-2">
                                                                                                                                                                                                                    {c.label}
                                                                                                                                                                                                                                  {c.badge && (
                                                                                                                                                                                                                                                  <span className="text-[10px] px-2 py-[2px] rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                                                                                                                                                                                                                                                                    {c.badge}
                                                                                                                                                                                                                                                                                    </span>
                                                                                                                                                                                                                                                                                                  )}
                                                                                                                                                                                                                                                                                                              </span>
                                                                                                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                      })}
                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                            }