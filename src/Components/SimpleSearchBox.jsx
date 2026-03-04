import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import combinedSearchList from "../data/SearchData";

const entities = [
  { label: "Library", value: "library" },
  { label: "Coaching", value: "coaching" },
];

const SimpleSearchBox = ({ type = "library" }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(type);
  const navigate = useNavigate();

  // ✅ Normalization helper (lowercase + trim + fix extra spaces)
  const normalize = (text) =>
    text
      ?.toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const normalizedValue = normalize(value);

    if (!normalizedValue) {
      setFilteredResults([]);
      return;
    }

    // ✅ Updated search filter logic
    const results = combinedSearchList.filter((item) => {
      const itemName =
        typeof item === "string" ? normalize(item) : normalize(item.name);

      return itemName.includes(normalizedValue);
    });

    setFilteredResults(results);
  };

  const handleSelect = (value) => {
    setSearchText(value);
    setFilteredResults([]);
  };

  const handleSearch = () => {
    if (!normalize(searchText)) {
      alert(`Please enter a ${selectedEntity} or location name.`);
      return;
    }

    const params = new URLSearchParams();
    params.set("location", searchText.trim());
    params.set("type", selectedEntity);
    params.set("keyword", selectedEntity);

    navigate(`/search/${selectedEntity}?${params.toString()}`);
  };

  return (
    <div className="w-full px-4 pt-4 bg-[var(--bg-cream)] flex justify-center mt-6 ">
      <div className="w-full max-w-5xl bg-white shadow-gray-400 shadow-lg rounded-2xl px-6 py-8 md:px-10 md:py-10 transition-all">

        {/* Entity Buttons */}
        <div className="flex gap-4 mb-2 justify-around">
          {entities.map((item) => (
            <button
              key={item.value}
              onClick={() => setSelectedEntity(item.value)}
              className={`px-4 py-1 rounded-lg border transition text-xs ${
                selectedEntity === item.value
                  ? "bg-[var(--primary-accent)] text-white border-transparent"
                  : "bg-white border-gray-300 text-gray-700 hover:border-[var(--primary-accent)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search Input Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="flex items-center border border-black rounded-lg px-2 py-1.5 focus-within:ring-2 focus-within:ring-[var(--primary-accent)] bg-white relative">
              <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder={`Search ${selectedEntity}  eg:Bhubaneswar`}
                className="flex-1 px-2 bg-transparent outline-none text-[var(--text-dark)] text-sm placeholder:text-[var(--text-light)]"
              />
              {searchText && (
                <button
                  onClick={() => {
                    setSearchText("");
                    setFilteredResults([]);
                  }}
                  className="text-sm text-black px-2 py-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Suggestions */}
            {filteredResults.length > 0 && (
              <ul className="absolute z-30 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-md max-h-60 overflow-y-auto">
                {filteredResults.map((item, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleSelect(typeof item === "string" ? item : item.name)
                    }
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {typeof item === "string" ? item : item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Button */}
          <div className="flex items-end md:w-auto">
            <button
              onClick={handleSearch}
              className="w-full md:w-auto px-7 py-2 rounded-xl bg-gradient-to-br from-[var(--primary-accent)] to-[var(--success-accent)] text-white font-semibold shadow-md hover:shadow-lg transition"
            >
              🔍 Search Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleSearchBox;
