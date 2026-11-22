import React from 'react';

interface TeddyIllustrationProps {
  mode: 'asking' | 'celebrating' | 'cafe';
}

export const TeddyIllustration: React.FC<TeddyIllustrationProps> = ({ mode }) => {
  const ariaLabels: Record<TeddyIllustrationProps['mode'], string> = {
    asking: 'Two cute brown and white teddy bears hugging with a Reply me speech bubble',
    celebrating: 'Brown and white teddy bears happily hugging with floating hearts',
    cafe: 'Brown and white teddy bears enjoying a cute cafe date with coffee and dessert',
  };

  return (
    <div className="animate-teddy-float relative mx-auto flex items-center justify-center rounded-[22px] bg-white p-3 sm:p-4 shadow-[0_10px_28px_rgba(255,23,68,0.12)] border border-white/90 w-[196px] h-[196px] sm:w-[224px] sm:h-[224px] select-none">
      {mode === 'asking' && (
        <svg
          viewBox="0 0 240 230"
          className="w-full h-full overflow-visible"
          role="img"
          aria-label={ariaLabels.asking}
        >
          <defs>
            <filter id="bubbleShadow" x="-15%" y="-15%" width="130%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#FFB3C6" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Speech Bubble: "Reply me" */}
          <g className="animate-bubble-bob" filter="url(#bubbleShadow)">
            <rect
              x="92"
              y="10"
              width="86"
              height="34"
              rx="17"
              fill="#FFFFFF"
              stroke="#3B2828"
              strokeWidth="2.4"
            />
            <path
              d="M126 43 L118 55 L138 43 Z"
              fill="#FFFFFF"
              stroke="#3B2828"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path d="M124 41.8 L139.5 41.8 L127 45 Z" fill="#FFFFFF" />
            <text
              x="135"
              y="32"
              textAnchor="middle"
              fill="#3B2828"
              fontSize="13.5"
              fontWeight="800"
              fontFamily="Poppins, Nunito, sans-serif"
            >
              Reply me
            </text>
          </g>

          <ellipse cx="120" cy="212" rx="76" ry="9" fill="#F8D6E0" opacity="0.7" />

          <path
            d="M120 68 C117 62, 108 62, 108 69 C108 75, 120 82, 120 82 C120 82, 132 75, 132 69 C132 62, 123 62, 120 68 Z"
            fill="#FF4D79"
          />

          {/* BROWN BEAR (LEFT) */}
          <g>
            <circle cx="52" cy="96" r="16" fill="#A86D44" stroke="#3B2828" strokeWidth="3" />
            <circle cx="52" cy="96" r="8.5" fill="#E6B995" />
            <circle cx="107" cy="94" r="15" fill="#A86D44" stroke="#3B2828" strokeWidth="3" />
            <circle cx="107" cy="94" r="8" fill="#E6B995" />

            <path
              d="M44 166 C42 198, 62 208, 86 208 C108 208, 124 198, 122 164 C120 144, 104 136, 84 136 C60 136, 46 146, 44 166 Z"
              fill="#A86D44"
              stroke="#3B2828"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <ellipse cx="83" cy="176" rx="22" ry="20" fill="#E6B995" opacity="0.65" />

            <ellipse cx="62" cy="205" rx="14" ry="9.5" fill="#A86D44" stroke="#3B2828" strokeWidth="3" />
            <ellipse cx="62" cy="205" rx="7" ry="4.5" fill="#E6B995" />

            <ellipse cx="80" cy="122" rx="40" ry="34" fill="#B5784D" stroke="#3B2828" strokeWidth="3" />
            <ellipse cx="83" cy="130" rx="15" ry="11.5" fill="#F2D2B4" />
            <ellipse cx="83" cy="125" rx="4.5" ry="3.2" fill="#3B2828" />
            <path
              d="M78 131 Q83 136 88 131"
              fill="none"
              stroke="#3B2828"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            <circle cx="65" cy="118" r="4.3" fill="#2A1C1C" />
            <circle cx="63.7" cy="116.5" r="1.5" fill="#FFFFFF" />
            <circle cx="101" cy="118" r="4.3" fill="#2A1C1C" />
            <circle cx="99.7" cy="116.5" r="1.5" fill="#FFFFFF" />

            <ellipse cx="56" cy="127" rx="7" ry="4" fill="#FF8FA3" opacity="0.72" />
            <ellipse cx="108" cy="127" rx="6.5" ry="4" fill="#FF8FA3" opacity="0.72" />

            <path
              d="M47 156 C35 162, 36 177, 50 175 C57 174, 60 166, 56 158"
              fill="#B5784D"
              stroke="#3B2828"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* WHITE BEAR (RIGHT) */}
          <g>
            <circle cx="132" cy="96" r="15" fill="#FFFFFF" stroke="#3B2828" strokeWidth="3" />
            <circle cx="132" cy="96" r="8" fill="#FFD1DC" />
            <circle cx="187" cy="98" r="16" fill="#FFFFFF" stroke="#3B2828" strokeWidth="3" />
            <circle cx="187" cy="98" r="8.5" fill="#FFD1DC" />

            <path
              d="M116 164 C114 198, 130 208, 154 208 C178 208, 196 196, 194 166 C192 146, 178 136, 154 136 C134 136, 118 144, 116 164 Z"
              fill="#FFFFFF"
              stroke="#3B2828"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            <ellipse cx="175" cy="205" rx="14" ry="9.5" fill="#FFFFFF" stroke="#3B2828" strokeWidth="3" />
            <ellipse cx="175" cy="205" rx="7" ry="4.5" fill="#FFD1DC" />

            <ellipse cx="158" cy="123" rx="39" ry="33.5" fill="#FFFFFF" stroke="#3B2828" strokeWidth="3" />

            <circle cx="138" cy="119" r="4.3" fill="#2A1C1C" />
            <circle cx="136.8" cy="117.5" r="1.5" fill="#FFFFFF" />
            <circle cx="172" cy="119" r="4.3" fill="#2A1C1C" />
            <circle cx="170.8" cy="117.5" r="1.5" fill="#FFFFFF" />

            <ellipse cx="154" cy="125" rx="4.2" ry="3" fill="#3B2828" />
            <path
              d="M149 130 Q154 135 159 130"
              fill="none"
              stroke="#3B2828"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            <ellipse cx="130" cy="128" rx="6.8" ry="4" fill="#FF8FA3" opacity="0.78" />
            <ellipse cx="181" cy="128" rx="6.8" ry="4" fill="#FF8FA3" opacity="0.78" />

            <path
              d="M126 156 C108 156, 98 164, 102 174 C106 183, 122 180, 130 171"
              fill="#FFFFFF"
              stroke="#3B2828"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M191 157 C203 163, 202 178, 188 176 C182 175, 179 167, 183 159"
              fill="#FFFFFF"
              stroke="#3B2828"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          <path
            d="M108 156 C122 152, 136 160, 132 172 C128 180, 114 178, 106 170"
            fill="#B5784D"
            stroke="#3B2828"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M119 156 C117 151, 110 151, 110 157 C110 162, 119 168, 119 168 C119 168, 128 162, 128 157 C128 151, 121 151, 119 156 Z"
            fill="#FF1744"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {mode === 'celebrating' && (
        <svg
          viewBox="0 0 240 230"
          className="w-full h-full overflow-visible"
          role="img"
          aria-label={ariaLabels.celebrating}
        >
          <ellipse cx="120" cy="212" rx="78" ry="9.5" fill="#F8D6E0" opacity="0.75" />

          <path
            d="M120 34 C115 25, 101 25, 101 36 C101 46, 120 58, 120 58 C120 58, 139 46, 139 36 C139 25, 125 25, 120 34 Z"
            fill="#FF1744"
          />
          <path
            d="M72 52 C69 47, 61 47, 61 53 C61 59, 72 66, 72 66 C72 66, 83 59, 83 53 C83 47, 75 47, 72 52 Z"
            fill="#FF6B93"
          />
          <path
            d="M170 50 C167 45, 159 45, 159 51 C159 57, 170 64, 170 64 C170 64, 181 57, 181 51 C181 45, 173 45, 170 50 Z"
            fill="#FF6B93"
          />

          {/* WHITE BEAR (LEFT) */}
          <g transform="rotate(-6 88 150)">
            <circle cx="58" cy="86" r="15.5" fill="#FFFFFF" stroke="#3B2828" strokeWidth="3" />
            <circle cx="58" cy="86" r="8" fill="#FFD1DC" />
            <circle cx="110" cy="84" r="15" fill="#FFFFFF" stroke="#3B2828" strokeWidth="3" />
            <circle cx="110" cy="84" r="8" fill="#FFD1DC" />

            <path
              d="M52 156 C50 192, 66 204, 90 204 C114 204, 128 192, 126 156 C124 136, 108 128, 88 128 C66 128, 54 138, 52 156 Z"
              fill="#FFFFFF"
              stroke="#3B2828"
              strokeWidth="3"
            />
            <ellipse cx="70" cy="202" rx="14" ry="9" fill="#FFFFFF" stroke="#3B2828" strokeWidth="3" />
            <ellipse cx="70" cy="202" rx="7" ry="4.5" fill="#FFD1DC" />

            <ellipse cx="86" cy="112" rx="39" ry="33.5" fill="#FFFFFF" stroke="#3B2828" strokeWidth="3" />

            <path d="M65 110 Q71 102 77 110" fill="none" stroke="#3B2828" strokeWidth="3" strokeLinecap="round" />
            <path d="M97 110 Q103 102 109 110" fill="none" stroke="#3B2828" strokeWidth="3" strokeLinecap="round" />

            <ellipse cx="88" cy="116" rx="4.2" ry="3" fill="#3B2828" />
            <path
              d="M82 121 Q88 129 94 121 Z"
              fill="#FF7597"
              stroke="#3B2828"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            <ellipse cx="62" cy="120" rx="7.5" ry="4.5" fill="#FF8FA3" opacity="0.85" />
            <ellipse cx="111" cy="120" rx="7" ry="4.5" fill="#FF8FA3" opacity="0.85" />
          </g>

          {/* BROWN BEAR (RIGHT) */}
          <g transform="rotate(6 154 150)">
            <circle cx="132" cy="84" r="15" fill="#A86D44" stroke="#3B2828" strokeWidth="3" />
            <circle cx="132" cy="84" r="8" fill="#E6B995" />
            <circle cx="185" cy="86" r="15.5" fill="#A86D44" stroke="#3B2828" strokeWidth="3" />
            <circle cx="185" cy="86" r="8" fill="#E6B995" />

            <path
              d="M114 156 C112 192, 128 204, 152 204 C176 204, 192 192, 190 156 C188 138, 174 128, 152 128 C132 128, 116 136, 114 156 Z"
              fill="#A86D44"
              stroke="#3B2828"
              strokeWidth="3"
            />
            <ellipse cx="152" cy="172" rx="20" ry="18" fill="#E6B995" opacity="0.6" />

            <ellipse cx="171" cy="202" rx="14" ry="9" fill="#A86D44" stroke="#3B2828" strokeWidth="3" />
            <ellipse cx="171" cy="202" rx="7" ry="4.5" fill="#E6B995" />

            <ellipse cx="156" cy="112" rx="39" ry="33.5" fill="#B5784D" stroke="#3B2828" strokeWidth="3" />
            <ellipse cx="154" cy="120" rx="15" ry="11.5" fill="#F2D2B4" />

            <path d="M133 110 Q139 102 145 110" fill="none" stroke="#3B2828" strokeWidth="3" strokeLinecap="round" />
            <path d="M165 110 Q171 102 177 110" fill="none" stroke="#3B2828" strokeWidth="3" strokeLinecap="round" />

            <ellipse cx="154" cy="115" rx="4.2" ry="3" fill="#3B2828" />
            <path d="M148 121 Q154 128 160 121" fill="none" stroke="#3B2828" strokeWidth="2.4" strokeLinecap="round" />

            <ellipse cx="130" cy="120" rx="7" ry="4.5" fill="#FF8FA3" opacity="0.75" />
            <ellipse cx="179" cy="120" rx="7.5" ry="4.5" fill="#FF8FA3" opacity="0.75" />
          </g>

          <path
            d="M84 152 C104 146, 128 156, 126 170 C124 180, 102 178, 86 168"
            fill="#FFFFFF"
            stroke="#3B2828"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M158 152 C138 146, 114 156, 116 170 C118 180, 140 178, 156 168"
            fill="#B5784D"
            stroke="#3B2828"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M121 154 C118 148, 110 148, 110 155 C110 162, 121 169, 121 169 C121 169, 132 162, 132 155 C132 148, 124 148, 121 154 Z"
            fill="#FF1744"
            stroke="#FFFFFF"
            strokeWidth="1.8"
          />
        </svg>
      )}

      {mode === 'cafe' && (
        <svg
          viewBox="0 0 240 230"
          className="w-full h-full overflow-visible"
          role="img"
          aria-label={ariaLabels.cafe}
        >
          {/* Warm cafe backdrop glow */}
          <circle cx="120" cy="112" r="92" fill="#FFF0F5" />

          {/* Floating Hearts */}
          <path
            d="M120 34 C116 27, 105 27, 105 36 C105 44, 120 53, 120 53 C120 53, 135 44, 135 36 C135 27, 124 27, 120 34 Z"
            fill="#FF1744"
          />
          <path
            d="M72 48 C70 44, 64 44, 64 49 C64 53, 72 58, 72 58 C72 58, 80 53, 80 49 C80 44, 74 44, 72 48 Z"
            fill="#FF7597"
          />
          <path
            d="M170 46 C168 42, 162 42, 162 47 C162 51, 170 56, 170 56 C170 56, 178 51, 178 47 C178 42, 172 42, 170 46 Z"
            fill="#FF7597"
          />

          {/* BROWN BEAR (LEFT, sitting at cafe) */}
          <g>
            <circle cx="48" cy="84" r="14" fill="#A86D44" stroke="#3B2828" strokeWidth="3" />
            <circle cx="48" cy="84" r="7.5" fill="#E6B995" />
            <circle cx="96" cy="84" r="14" fill="#A86D44" stroke="#3B2828" strokeWidth="3" />
            <circle cx="96" cy="84" r="7.5" fill="#E6B995" />

            <path
              d="M44 156 C42 134, 56 124, 74 124 C92 124, 104 134, 102 156 Z"
              fill="#A86D44"
              stroke="#3B2828"
              strokeWidth="3"
            />
            <ellipse cx="72" cy="106" rx="34" ry="29" fill="#B5784D" stroke="#3B2828" strokeWidth="3" />
            <ellipse cx="74" cy="113" rx="13" ry="10" fill="#F2D2B4" />
            <ellipse cx="74" cy="108.5" rx="3.8" ry="2.7" fill="#3B2828" />
            <path d="M70 114 Q74 118 78 114" fill="none" stroke="#3B2828" strokeWidth="2.2" strokeLinecap="round" />

            <circle cx="60" cy="103" r="3.8" fill="#2A1C1C" />
            <circle cx="59" cy="101.8" r="1.3" fill="#FFFFFF" />
            <circle cx="88" cy="103" r="3.8" fill="#2A1C1C" />
            <circle cx="87" cy="101.8" r="1.3" fill="#FFFFFF" />
            <ellipse cx="52" cy="111" rx="6" ry="3.5" fill="#FF8FA3" opacity="0.75" />
            <ellipse cx="94" cy="111" rx="5.8" ry="3.5" fill="#FF8FA3" opacity="0.75" />
          </g>

          {/* WHITE BEAR (RIGHT, sitting at cafe) */}
          <g>
            <circle cx="144" cy="84" r="14" fill="#FFFFFF" stroke="#3B2828" strokeWidth="3" />
            <circle cx="144" cy="84" r="7.5" fill="#FFD1DC" />
            <circle cx="192" cy="84" r="14" fill="#FFFFFF" stroke="#3B2828" strokeWidth="3" />
            <circle cx="192" cy="84" r="7.5" fill="#FFD1DC" />

            <path
              d="M138 156 C136 134, 148 124, 166 124 C184 124, 198 134, 196 156 Z"
              fill="#FFFFFF"
              stroke="#3B2828"
              strokeWidth="3"
            />
            <ellipse cx="168" cy="106" rx="34" ry="29" fill="#FFFFFF" stroke="#3B2828" strokeWidth="3" />
            <ellipse cx="166" cy="108.5" rx="3.8" ry="2.7" fill="#3B2828" />
            <path d="M162 114 Q166 118 170 114" fill="none" stroke="#3B2828" strokeWidth="2.2" strokeLinecap="round" />

            {/* Happy eyes */}
            <path d="M150 104 Q154 98 158 104" fill="none" stroke="#3B2828" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M174 104 Q178 98 182 104" fill="none" stroke="#3B2828" strokeWidth="2.6" strokeLinecap="round" />

            <ellipse cx="146" cy="111" rx="6" ry="3.5" fill="#FF8FA3" opacity="0.8" />
            <ellipse cx="188" cy="111" rx="6" ry="3.5" fill="#FF8FA3" opacity="0.8" />
          </g>

          {/* CAFE TABLE */}
          <ellipse cx="120" cy="212" rx="84" ry="9" fill="#F8D6E0" opacity="0.8" />
          <rect x="112" y="164" width="16" height="44" rx="4" fill="#E6B995" stroke="#3B2828" strokeWidth="2.8" />
          <ellipse cx="120" cy="208" rx="32" ry="7" fill="#E6B995" stroke="#3B2828" strokeWidth="2.8" />
          {/* Table Top */}
          <rect x="30" y="152" width="180" height="16" rx="8" fill="#FFE5EC" stroke="#3B2828" strokeWidth="3" />

          {/* Left Coffee Mug + Steam */}
          <path d="M68 124 Q65 117 70 112" fill="none" stroke="#FF7597" strokeWidth="2" strokeLinecap="round" />
          <path d="M77 124 Q74 116 79 111" fill="none" stroke="#FF7597" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M58 134 H86 V147 C86 151, 82 153, 72 153 C62 153, 58 151, 58 147 Z"
            fill="#FFFFFF"
            stroke="#3B2828"
            strokeWidth="2.6"
          />
          <path d="M86 137 C92 137, 92 146, 86 146" fill="none" stroke="#3B2828" strokeWidth="2.4" strokeLinecap="round" />

          {/* Center Strawberry Cake Slice */}
          <path
            d="M106 152 L134 152 L134 136 L106 144 Z"
            fill="#FFD1DC"
            stroke="#3B2828"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle cx="122" cy="133" r="4.5" fill="#FF1744" stroke="#3B2828" strokeWidth="2" />

          {/* Right Pink Mug + Steam */}
          <path d="M164 124 Q161 117 166 112" fill="none" stroke="#FF7597" strokeWidth="2" strokeLinecap="round" />
          <path d="M173 124 Q170 116 175 111" fill="none" stroke="#FF7597" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M154 134 H182 V147 C182 151, 178 153, 168 153 C158 153, 154 151, 154 147 Z"
            fill="#FFB3C6"
            stroke="#3B2828"
            strokeWidth="2.6"
          />
          <path d="M154 137 C148 137, 148 146, 154 146" fill="none" stroke="#3B2828" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};
