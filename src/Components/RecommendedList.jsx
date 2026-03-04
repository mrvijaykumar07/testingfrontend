import axios from "axios";
import React, { useEffect, useState } from "react";
import EntityCard from "../Components/EntityCard.jsx";
import config from "../app/env.js";
import LoaderBoyRunning from "./LoaderBoyRunning.jsx";

const BACKEND_URL = config.BACKEND_URL;

const RecommendedList = ({ type }) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const endpoint =
    type === "coaching"
      ? `${BACKEND_URL}/coaching/recommended`
      : `${BACKEND_URL}/library/recommendedLibraries`;

  useEffect(() => {
    setLoading(true);

    axios
      .get(endpoint)
      .then((res) => {
        const data =
          type === "coaching"
            ? res?.data?.data?.coachings
            : res?.data?.data?.libraries;

        if (!Array.isArray(data)) {
          setError("Invalid response format");
          setList([]);
          return;
        }

        setList(data);
        setError("");
      })
      .catch(() => {
        setError(`Failed to fetch recommended ${type}s.`);
      })
      .finally(() => setLoading(false));
  }, [type]);

return (
  <div className="max-w-4xl mx-auto px-4 my-8 pb-16">
    <h2 className="text-base md:text-lg font-semibold mb-4 text-center text-[var(--text-dark)]">
      Some Recommended {type.charAt(0).toUpperCase() + type.slice(1)}s for You
    </h2>

    {/* 🔥 Custom Loader */}
    {loading ? (
      <div className="flex justify-center items-center py-10">
        <LoaderBoyRunning 
          loaderMsg={`Loading  ${type}s for you...`} 
        />
        
      </div>
    ) : list.length > 0 ? (
      list.map((place) => (
        <EntityCard
          key={place._id}
          id={place._id}
          entityType={type}
          name={place.name}
          rating={place.rating_avg}
          location={`${place.area}, ${place.city}`}
          image={place.images?.[0]}
          price={place.plans?.[0]?.price}
          originalPrice={place.plans?.[0]?.originalPrice}
          discount={place.plans?.[0]?.discount}
        />
      ))
    ) : (
      <div className="flex flex-col items-center justify-center text-center py-6 bg-white rounded-lg border border-gray-200 shadow-sm">

        <p className="text-lg text-center font-semibold text-gray-800">
          😕 No Recommended {type}s Available
        </p>

        <p className="text-gray-500 text-sm mt-1 text-center">
          We couldn’t find any recommended {type} results.
        </p>

        {error && (
          <div className="mt-3 px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-md text-center text-xs font-medium">
            {error}
          </div>
        )}
      </div>
    )}
  </div>
);
};

export default RecommendedList;
