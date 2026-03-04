import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EntityCard from "../../Components/EntityCard.jsx";
import config from "../../app/env.js";

const BACKEND_URL = config.BACKEND_URL;

const MyPropertiesComponent = () => {
  const [properties, setProperties] = useState([]); // ✅ merged data (libraries + coachings)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        setLoading(true);
        console.log("📡 Fetching libraries & coachings for owner...");

        // 🔹 Run both requests in parallel
        const [librariesRes, coachingsRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/library/my-libraries`, {
            withCredentials: true,
            headers: { client_secret: "vijayrequest" },
          }),
          axios.get(`${BACKEND_URL}/coaching/my-coachings`, {
            withCredentials: true,
            headers: { client_secret: "vijayrequest" },
          }),
        ]);

        const libraries = librariesRes.data?.data?.libraries || [];
        const coachings = coachingsRes.data?.data?.coachings || [];

        console.log(
          `📚 Libraries: ${libraries.length}, 🎓 Coachings: ${coachings.length}`
        );

        // ✅ Tag each entity type for UI clarity
        const allProperties = [
          ...libraries.map((item) => ({ ...item, entityType: "library" })),
          ...coachings.map((item) => ({ ...item, entityType: "coaching" })),
        ];

        setProperties(allProperties);
      } catch (err) {
        console.error("❌ Error fetching owner properties:", err);
        setError("Failed to fetch your properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10">⏳ Loading your properties...</div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        {error} <br />
        <span className="text-sm text-gray-500">
          Check console for more info.
        </span>
      </div>
    );

  return (
    <div className=" relative ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className=" ml-1 pb-0.5 text-lg font-bold text-gray-800">
          My Property ({properties.length})
        </h2>

        <Link
          to="/onboarding"
          className="px-4 py-2 text-md rounded-md bg-gray-200  text-gray-800 font-medium transition  inline-flex items-center gap-2 justify-center shadow-lg border-gray-300 "
        >
          + Add new
        </Link>
      </div>

      {/* No properties found */}
      {properties.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No properties found. Add your first one now!
        </div>
      ) : (
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 ">
          {properties.map((prop) => (
            <div key={prop._id} className="relative">
              <EntityCard
                id={prop._id}
                entityType={prop.entityType} //  "library" or "coaching"
                name={prop.name}
                rating={prop.rating_avg}
                location={`${prop.area}, ${prop.city}`}
                image={prop.images?.[0]}
                price={prop.plans?.[0]?.price}
                orginalPrice={prop.plans?.[0]?.originalPrice}
                discount={prop.plans?.[0]?.discount}
              />

              {/* Optional badge to show type */}
              <span className="absolute top-5 right-4 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md opacity-90">
                {prop.entityType === "library" ? "Library" : "Coaching"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPropertiesComponent;
