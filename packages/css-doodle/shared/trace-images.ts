// Pictures for the @trace examples, drawn as SVG data URLs so nothing is fetched

const url = (svg: string): string => `"data:image/svg+xml,${encodeURIComponent(svg)}"`;

/** A cat's head with see-through eyes and nose on a transparent background. 200 × 200 px. */
export const CAT = url(
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <path fill="#000" fill-rule="evenodd" d="M40 30 L80 70 L120 70 L160 30 L165 110 A70 62 0 1 1 35 110 Z
      M62 112 a13 9 0 0 0 26 0 a13 9 0 0 0 -26 0 M112 112 a13 9 0 0 0 26 0 a13 9 0 0 0 -26 0
      M92 140 L108 140 L100 150 Z"/>
  </svg>`,
);

/**
 * An opaque picture in three tones (white, mid grey, near black), 240 × 240 px: tracing it
 * at a low level takes in only the dark parts, at a high level the grey too.
 */
export const MOUNTAINS = url(
  `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
    <rect width="240" height="240" fill="#fff"/>
    <circle cx="175" cy="60" r="28" fill="#999"/>
    <path d="M0 200 L60 110 L100 160 L150 80 L240 200 L240 240 L0 240 Z" fill="#999"/>
    <path d="M0 240 L40 170 L80 210 L130 140 L190 220 L240 180 L240 240 Z" fill="#222"/>
  </svg>`,
);
