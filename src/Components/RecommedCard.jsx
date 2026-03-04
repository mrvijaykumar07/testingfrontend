import React from "react";

const RecommendCard = ({ library }) => {
  const firstPlan = library.plans?.[0];

  // 🎯 Calculate discount % if prices are available
  const discountPercent =
    firstPlan?.originalPrice && firstPlan?.price
      ? Math.round(
          ((firstPlan.originalPrice - firstPlan.price) /
            firstPlan.originalPrice) *
            100
        )
      : null;

  return (
    <div className="min-w-[200px] max-w-[220px] rounded-xl shadow-lg bg-white overflow-hidden relative">
      <img
        src={library.image || library.images.logo}
        alt={library.name}
        className="w-full h-24 object-cover rounded-t-xl"
      />
      <div className="p-2">
        <h3 className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">
          {library.name}
        </h3>
        <p className="text-[10px] text-gray-500">{library.location}</p>

        {firstPlan && (
          <div className="mt-1 flex items-center text-[10px] space-x-1 text-gray-600">
            <span className="font-bold text-[var(--primary-accent)]">
              ₹{firstPlan.price}
            </span>
            <span className="line-through text-gray-400">
              ₹{firstPlan.originalPrice}
            </span>
            {discountPercent !== null && (
              <span className="text-green-600 font-medium">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        )}

      

        <div
          className="absolute top-1.5 right-1.5 
bg-white px-1.5 py-0.5 
rounded-md border border-gray-200 
shadow-lg flex items-center gap-1 mb-0.5"
        >
          <span className="text-yellow-500 text-sm">⭐</span>
          <span className="text-gray-800 text-xs font-semibold">
            {library.rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecommendCard;
