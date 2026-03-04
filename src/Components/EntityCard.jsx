// EntityCard component - fix the destructuring
import React from "react";
import { Link } from "react-router-dom";

const EntityCard = ({
  id,
  name,
  rating,
  location,
  image,
  price,
  originalPrice,
  discount,
  entityType,
}) => {
  return (
    <Link to={`/${entityType}/${id}`}>
      <div
        itemScope
        itemType="http://schema.org/LocalBusiness"
        className="w-84 my-3 mx-auto rounded-lg shadow-lg bg-white overflow-hidden relative shadow-gray-400"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover"
          onError={(e) => (e.target.src = "/no-image.jpg")}
          itemProp="image"
        />

        <div className="p-4 pb-5">
          <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {name}
          </h2>
          <p className="text-xs text-gray-500 line-clamp-1">{location}</p>

          <div className="mt-1 flex items-center text-xs space-x-2">
            <span className="text-gray-900 font-bold">₹{price}</span>
            <span className="line-through text-gray-400">₹{originalPrice}</span>
            <span className="text-green-600 font-semibold">
              ({discount}% OFF)
            </span>
          </div>

          <div className="mt-2 px-2 py-0.5 mb-0.5 flex items-center text-sm  font-medium z-20 absolute top-36  rounded-sm  bg-gray-50 shadow-sm">
            <span className="text-yellow-500 text-sm">⭐</span>
            <span className="text-gray-900 text-xs font-semibold">
              {rating}/5
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EntityCard;
