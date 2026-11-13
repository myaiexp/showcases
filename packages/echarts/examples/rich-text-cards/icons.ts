// Small weather icons as inline SVG data URLs, used as rich-text background images
const svg = (body: string): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${body}</svg>`)}`;

export const ICONS = {
  sunny: svg('<circle cx="16" cy="16" r="7" fill="#ffc53d"/><g stroke="#ffc53d" stroke-width="2.5" stroke-linecap="round"><path d="M16 2v4M16 26v4M2 16h4M26 16h4M6 6l3 3M23 23l3 3M6 26l3-3M23 9l3-3"/></g>'),
  cloudy: svg('<path d="M9 24a6 6 0 0 1 .6-12A8 8 0 0 1 25 13a5.5 5.5 0 0 1-.5 11z" fill="#c9d3e3"/>'),
  showers: svg('<path d="M9 18a6 6 0 0 1 .6-12A8 8 0 0 1 25 7a5.5 5.5 0 0 1-.5 11z" fill="#9fb0c8"/><g stroke="#5b8ff9" stroke-width="2.5" stroke-linecap="round"><path d="M11 22l-2 5M17 22l-2 5M23 22l-2 5"/></g>'),
};

export type Weather = keyof typeof ICONS;
