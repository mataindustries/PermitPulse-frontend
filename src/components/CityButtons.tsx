import React from "react";

interface City {
  key: string;
    label: string;
    }

    interface Props {
      selectedCity: string;
        setSelectedCity: (city: string) => void;
        }

        const CITIES: City[] = [
          { key: "weho", label: "WeHo" },
            { key: "beverlyhills", label: "Beverly Hills" },
              { key: "altadena", label: "Altadena" },
                { key: "palisades", label: "Palisades" },
                  { key: "sandiego", label: "San Diego" },
                    { key: "sacramento", label: "Sacramento" },
                      { key: "combined", label: "All Cities" },
                      ];

                      const CityButtons: React.FC<Props> = ({ selectedCity, setSelectedCity }) => {
                        return (
                            <div className="flex flex-wrap gap-2 mb-4">
                                  {CITIES.map((city) => (
                                          <button
                                                    key={city.key}
                                                              onClick={() => setSelectedCity(city.key)}
                                                                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                                                                    selectedCity === city.key
                                                                                                  ? "bg-blue-600 text-white"
                                                                                                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                                                                                                          }`}
                                                                                                                                  >
                                                                                                                                            {city.label}
                                                                                                                                                    </button>
                                                                                                                                                          ))}
                                                                                                                                                              </div>
                                                                                                                                                                );
                                                                                                                                                                };

                                                                                                                                                                export default CityButtons;