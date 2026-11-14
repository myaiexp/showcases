// Widgets chapter: SVG icon data URLs, a card-side auto-clicker and a wrapped drift
import type { MapViewState } from '@deck.gl/core';

/** A 24x24 black-filled SVG as a data URL: widgets use it as a CSS mask, so only its shape counts. */
export function svgIcon(body: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="black">${body}</g></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const ICONS = {
  layers: svgIcon('<path d="M12 2 2 8l10 6 10-6z"/><path d="M2 13l10 6 10-6-2-1.2-8 4.8-8-4.8z"/>'),
  eye: svgIcon('<path d="M12 5C6 5 2 12 2 12s4 7 10 7 10-7 10-7-4-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>'),
  eyeOff: svgIcon('<path d="M3 4.3 4.3 3 21 19.7 19.7 21l-3-3A10 10 0 0 1 12 19C6 19 2 12 2 12a18 18 0 0 1 4-4.8z"/>'),
  star: svgIcon('<path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7-6.2-3.5-6.2 3.5 1.4-7L2 9.3l7-.8z"/>'),
  pin: svgIcon('<path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.500A2.5 2.5 0 1 1 12 6.500a2.5 2.5 0 0 1 0 5z"/>'),
  dots: svgIcon('<circle cx="6" cy="12" r="3"/><circle cx="12" cy="12" r="3"/><circle cx="18" cy="12" r="3"/>'),
  square: svgIcon('<rect x="4" y="4" width="16" height="16" rx="2"/>'),
  circle: svgIcon('<circle cx="12" cy="12" r="8"/>'),
  triangle: svgIcon('<path d="M12 3 22 20H2z"/>'),
  bolt: svgIcon('<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>'),
};

/** Cards have no pointer: click widget buttons from code, one selector per tick, cycling. */
export function clickEvery(root: HTMLElement, selectors: string | string[], ms: number): () => void {
  const list = Array.isArray(selectors) ? selectors : [selectors];
  let i = 0;
  const id = window.setInterval(() => {
    root.querySelector<HTMLElement>(list[i++ % list.length]!)?.click();
  }, ms);
  return () => window.clearInterval(id);
}

/** Eastward drift of a view state, with the longitude wrapped so the MapView keeps drawing. */
export function drift(base: MapViewState, t: number, degPerSecond = 6): MapViewState {
  return { ...base, longitude: ((base.longitude + t * degPerSecond + 180) % 360) - 180 };
}
