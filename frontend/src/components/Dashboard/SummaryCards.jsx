import React from "react";

const SummaryCards = ({
  icon,
  category,
  totalnum,
  color = "#62466B",
}) => {
  return (
    <div className="group flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Icon */}

      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl text-white shadow-md"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      {/* Text */}

      <div>

        <p className="text-sm font-medium text-[#776D8A]">
          {category}
        </p>

        <h2 className="mt-1 text-3xl font-bold text-[#2D2327]">
          {totalnum}
        </h2>

      </div>

    </div>
  );
};

export default SummaryCards;