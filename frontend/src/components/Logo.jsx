import React from "react";

const Logo = ({ size = 100 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Wing */}
      <path
        d="M28 145
           C20 95,45 55,78 28
           L95 45
           C70 65,56 90,56 145
           Z"
        fill="#B5C2B7"
      />

      {/* Right Wing */}
      <path
        d="M192 145
           C200 95,175 55,142 28
           L125 45
           C150 65,164 90,164 145
           Z"
        fill="#B5C2B7"
      />

      {/* Head */}
      <circle
        cx="110"
        cy="40"
        r="22"
        fill="#62466B"
      />

      {/* Suit */}
      <path
        d="
          M72 72
          L110 98
          L148 72
          Q170 88 170 110
          V180
          Q110 215 50 180
          V110
          Q50 88 72 72
          Z
        "
        fill="#62466B"
      />

      {/* Collar */}
      <polygon
        points="95,72 110,92 125,72"
        fill="white"
      />

      {/* Tie Knot */}
      <polygon
        points="100,92 120,92 110,104"
        fill="white"
      />

      {/* Tie */}
      <path
        d="M110 104
           L124 170
           Q110 194 96 170
           Z"
        fill="white"
      />

      {/* Left Sleeve */}
      <rect
        x="68"
        y="122"
        width="9"
        height="55"
        rx="4"
        fill="white"
      />

      {/* Right Sleeve */}
      <rect
        x="143"
        y="122"
        width="9"
        height="55"
        rx="4"
        fill="white"
      />
    </svg>
  );
};

export default Logo;