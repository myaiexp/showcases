// Inline SVG icons and tiny scenes, turned into data: URLs so the example needs no network
const PATHS: Record<string, string> = {
  star: '<polygon points="12,2 15,9 22,9.5 16.5,14 18.5,21.5 12,17.5 5.5,21.5 7.5,14 2,9.5 9,9"/>',
  heart: '<path d="M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
  home: '<path d="M3 11 12 3l9 8v10h-6v-6H9v6H3z"/>',
  check: '<path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>',
  cloud: '<path d="M7 18a5 5 0 0 1-.5-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"/>',
};

export const ICON_NAMES = Object.keys(PATHS);

// SVG sources need an explicit width and height to be rasterised into the texture atlas.
function toDataUrl(body: string, viewBox: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="${viewBox}">${body}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Single-colour glyphs: in "color" drawing mode only their shape matters, the node colour tints them.
export function pictogram(name: string): string {
  return toDataUrl(`<g fill="#000">${PATHS[name] ?? ''}</g>`, '0 0 24 24');
}

// Multi-colour pictures: in "image" drawing mode they are drawn as they are.
export function scene(sky: string, sun: string, hill: string, shade: string): string {
  const body =
    `<rect width="24" height="24" fill="${sky}"/>` +
    `<circle cx="17" cy="7" r="3" fill="${sun}"/>` +
    `<path d="M0 24 8 11l6 9 4-5 6 9z" fill="${hill}"/>` +
    `<path d="M0 24 6 17l5 7z" fill="${shade}"/>`;
  return toDataUrl(body, '0 0 24 24');
}
