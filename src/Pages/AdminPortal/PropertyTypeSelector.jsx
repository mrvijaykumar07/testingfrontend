import React, { useState } from "react";
import { Check } from "lucide-react"; // ⬅️ Clean right-check icon from lucide-react

const PropertyTypeSelector = () => {
  const [selected, setSelected] = useState("Library");

  const options = [
    {
      type: "Library",
      description: "Accommodations with facilities like Books, private rooms & more",
    },
    {
      type: "Coaching Center",
      description: "Best Result with us",
    },
  ];

  return (
    <section className="bg-white p-6 rounded shadow">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Which property type would you like to list?
        </h1>
        <p className="text-gray-600">
          Please select your property type from below options
        </p>
      </div>

      <ul className="flex flex-col md:flex-row gap-6 mt-6">
        {options.map((option) => {
          const isSelected = selected === option.type;
          return (
            <li
              key={option.type}
              onClick={() => setSelected(option.type)}
              className={`${
                isSelected ? "bg-blue-100 border-blue-500" : "bg-white"
              } border rounded px-4 py-3 flex-1 shadow-md cursor-pointer hover:shadow-lg transition`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">{option.type}</h3>
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                    isSelected ? "bg-blue-500 border-blue-500" : "bg-gray-100 border-gray-300"
                  }`}
                >
                  {isSelected && <Check size={20} className="text-white" />}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{option.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PropertyTypeSelector;
