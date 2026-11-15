// Offline illustrations: a flat scene drawn in code around a keyword's icon
//
// Templates with an `illus` field expect a picture the app supplies (the docs leave loading
// illustrations to you). The gallery draws one per keyword: a soft blob, a few accent shapes
// and the keyword's icon large in front, coloured from a fixed set picked by the keyword.
import { iconSvg } from './icons.ts';

const SCHEMES = [
  { blob: '#dbeafe', accent: '#60a5fa', ink: '#1d4ed8' },
  { blob: '#dcfce7', accent: '#4ade80', ink: '#15803d' },
  { blob: '#fef3c7', accent: '#fbbf24', ink: '#b45309' },
  { blob: '#fce7f3', accent: '#f472b6', ink: '#be185d' },
  { blob: '#ede9fe', accent: '#a78bfa', ink: '#6d28d9' },
  { blob: '#cffafe', accent: '#22d3ee', ink: '#0e7490' },
];

function hash(text: string): number {
  let h = 7;
  for (const c of text) h = (h * 33 + c.charCodeAt(0)) >>> 0;
  return h;
}

/** A 400×300 illustration <svg> for `keyword`. Call after loadIcons(). */
export function illusSvg(keyword: string): string {
  const h = hash(keyword);
  const s = SCHEMES[h % SCHEMES.length] as (typeof SCHEMES)[number];
  // The icon's own <svg> nested inside the scene, recoloured by its `color`.
  const icon = iconSvg(keyword).replace('<svg ', `<svg x="130" y="70" width="140" height="140" color="${s.ink}" `);
  const tilt = (h % 2 ? 1 : -1) * 8;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
<path d="M70 160c0-80 60-125 140-120s130 50 125 125-60 110-140 105S70 240 70 160z" fill="${s.blob}"/>
<circle cx="${60 + (h % 40)}" cy="70" r="18" fill="${s.accent}" opacity=".55"/>
<rect x="300" y="${190 + (h % 30)}" width="46" height="46" rx="10" fill="${s.accent}" opacity=".4" transform="rotate(${tilt} 323 213)"/>
<path d="M40 250h320" stroke="${s.ink}" stroke-width="4" stroke-linecap="round" opacity=".25"/>
<circle cx="335" cy="80" r="7" fill="${s.ink}" opacity=".35"/>
${icon}
</svg>`;
}
