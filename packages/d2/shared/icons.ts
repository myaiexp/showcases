// Line icons as data: URLs for D2's icon field, so no example fetches one

const svg = (body: string, color: string): string =>
  `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`,
  )}`;

/**
 * Line icons, each a `data:image/svg+xml` URL D2 accepts wherever the docs use an
 * https icon URL. Interpolate them quoted: `server.icon: "${icons.server}"`. Unquoted, the
 * `;` in the URL ends the statement and the rest becomes a stray shape (or an error).
 */
export const icons = {
  server: svg('<rect x="8" y="6" width="32" height="14" rx="3"/><rect x="8" y="28" width="32" height="14" rx="3"/><path d="M14 13h4M14 35h4"/>', '#4f9cf9'),
  database: svg('<ellipse cx="24" cy="10" rx="15" ry="5"/><path d="M9 10v28c0 3 7 5 15 5s15-2 15-5V10M9 24c0 3 7 5 15 5s15-2 15-5"/>', '#36c28a'),
  user: svg('<circle cx="24" cy="15" r="8"/><path d="M8 42c2-9 8-13 16-13s14 4 16 13"/>', '#f2a23a'),
  cloud: svg('<path d="M14 38h22a9 9 0 0 0 0-18 12 12 0 0 0-23-2 10 10 0 0 0 1 20z"/>', '#7cc4f2'),
  gear: svg('<circle cx="24" cy="24" r="6"/><path d="M24 4v7M24 37v7M4 24h7M37 24h7M10 10l5 5M33 33l5 5M38 10l-5 5M15 33l-5 5"/>', '#b48cf2'),
  lock: svg('<rect x="10" y="22" width="28" height="20" rx="3"/><path d="M16 22v-7a8 8 0 0 1 16 0v7"/>', '#e8575a'),
  code: svg('<path d="M17 14L7 24l10 10M31 14l10 10-10 10M27 8l-6 32"/>', '#4fd1c5'),
  queue: svg('<rect x="5" y="16" width="10" height="16" rx="2"/><rect x="19" y="16" width="10" height="16" rx="2"/><rect x="33" y="16" width="10" height="16" rx="2"/>', '#f2d03a'),
  phone: svg('<rect x="14" y="4" width="20" height="40" rx="4"/><path d="M22 38h4"/>', '#9aa5b1'),
  mail: svg('<rect x="6" y="11" width="36" height="26" rx="3"/><path d="M6 13l18 13 18-13"/>', '#f28cb4'),
} as const;

export type IconName = keyof typeof icons;
