import React from 'react';

export type FoodId =
  | 'pizza'
  | 'burger'
  | 'pasta'
  | 'ice-cream'
  | 'coffee-dessert'
  | 'chinese'
  | 'something-else';

interface FoodIllustrationProps {
  id: FoodId;
}

export const FoodIllustration: React.FC<FoodIllustrationProps> = ({ id }) => {
  switch (id) {
    case 'pizza':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
          <path
            d="M32 8 L54 50 Q32 58 10 50 Z"
            fill="#FFD166"
            stroke="#3B2828"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <path
            d="M10 50 Q32 58 54 50 L51 43 Q32 50 13 43 Z"
            fill="#E09F5A"
            stroke="#3B2828"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="27" r="4" fill="#FF1744" />
          <circle cx="24" cy="39" r="3.6" fill="#FF1744" />
          <circle cx="40" cy="38" r="3.8" fill="#FF1744" />
          <circle cx="32" cy="36" r="2" fill="#4ADE80" />
        </svg>
      );
    case 'burger':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
          <path
            d="M12 28 C12 14, 52 14, 52 28 Z"
            fill="#F4A261"
            stroke="#3B2828"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="20" r="1.4" fill="#FFF8E7" />
          <circle cx="33" cy="18" r="1.4" fill="#FFF8E7" />
          <circle cx="41" cy="21" r="1.4" fill="#FFF8E7" />
          <path
            d="M10 31 Q18 27 25 31 T40 31 T54 31"
            fill="none"
            stroke="#4ADE80"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <rect
            x="11"
            y="34"
            width="42"
            height="8"
            rx="4"
            fill="#7F4F24"
            stroke="#3B2828"
            strokeWidth="2.4"
          />
          <path d="M18 34 L25 40 L32 34 L39 40 L46 34" fill="#FFD166" />
          <path
            d="M13 43 H51 V47 C51 51, 47 53, 32 53 C17 53, 13 51, 13 47 Z"
            fill="#F4A261"
            stroke="#3B2828"
            strokeWidth="2.6"
          />
        </svg>
      );
    case 'pasta':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
          <path
            d="M12 34 H52 C52 47, 43 54, 32 54 C21 54, 12 47, 12 34 Z"
            fill="#FFFFFF"
            stroke="#3B2828"
            strokeWidth="2.6"
          />
          <ellipse cx="32" cy="34" rx="18" ry="8" fill="#FFD166" stroke="#3B2828" strokeWidth="2.4" />
          <path d="M21 33 Q28 27 36 33 T44 33" fill="none" stroke="#E09F3E" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="29" cy="30" r="4" fill="#FF1744" stroke="#3B2828" strokeWidth="1.8" />
          <circle cx="36" cy="32" r="3.5" fill="#FF1744" stroke="#3B2828" strokeWidth="1.8" />
          <path d="M42 14 L34 28" stroke="#3B2828" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );
    case 'ice-cream':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
          <path
            d="M21 31 L32 56 L43 31 Z"
            fill="#F4A261"
            stroke="#3B2828"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle cx="25" cy="26" r="9" fill="#FF8FA3" stroke="#3B2828" strokeWidth="2.4" />
          <circle cx="39" cy="26" r="9" fill="#FFF0F3" stroke="#3B2828" strokeWidth="2.4" />
          <circle cx="32" cy="18" r="9" fill="#FF4D79" stroke="#3B2828" strokeWidth="2.4" />
          <circle cx="32" cy="8" r="3.5" fill="#FF1744" stroke="#3B2828" strokeWidth="2" />
        </svg>
      );
    case 'coffee-dessert':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
          <path d="M24 18 Q21 12 26 8" fill="none" stroke="#FF7597" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M33 18 Q30 12 35 8" fill="none" stroke="#FF7597" strokeWidth="2.2" strokeLinecap="round" />
          <path
            d="M14 25 H42 V39 C42 46, 36 50, 28 50 C20 50, 14 46, 14 39 Z"
            fill="#FFFFFF"
            stroke="#3B2828"
            strokeWidth="2.6"
          />
          <path d="M42 29 C49 29, 49 41, 42 41" fill="none" stroke="#3B2828" strokeWidth="2.6" strokeLinecap="round" />
          <path
            d="M28 33 C26.5 30, 22 30, 22 34 C22 37.5, 28 41, 28 41 C28 41, 34 37.5, 34 34 C34 30, 29.5 30, 28 33 Z"
            fill="#FF4D79"
          />
          <path d="M10 53 H48" stroke="#3B2828" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );
    case 'chinese':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
          <path
            d="M12 32 H52 C52 46, 43 54, 32 54 C21 54, 12 46, 12 32 Z"
            fill="#FF7597"
            stroke="#3B2828"
            strokeWidth="2.6"
          />
          <path d="M18 32 Q24 22 32 24 T46 32" fill="#FFF3B0" stroke="#3B2828" strokeWidth="2.2" />
          <path d="M22 14 L34 27" stroke="#3B2828" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M30 11 L38 27" stroke="#3B2828" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      );
    case 'something-else':
    default:
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12" aria-hidden="true">
          <circle cx="32" cy="32" r="21" fill="#FFE5EC" stroke="#3B2828" strokeWidth="2.4" />
          <path
            d="M32 25 C29 19, 20 19, 20 27 C20 35, 32 44, 32 44 C32 44, 44 35, 44 27 C44 19, 35 19, 32 25 Z"
            fill="#FF1744"
          />
          <path d="M47 14 L49 18 L53 19 L49 20 L47 24 L45 20 L41 19 L45 18 Z" fill="#FF7597" />
        </svg>
      );
  }
};
