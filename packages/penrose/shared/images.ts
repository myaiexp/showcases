// SVG files for Image shapes, drawn in code, served by the path resolver
//
// An Image shape's `href` is a path the renderer hands to toSVG's path resolver, which
// returns the SVG text. Every stage resolves through `resolveImage`, so `href: "star.svg"`
// in a Style program draws the star below. Unknown paths resolve to undefined, and
// Penrose draws its own "not found" picture.

const svg = (body: string, view = '0 0 100 100'): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${view}">${body}</svg>`;

export const IMAGES: Readonly<Record<string, string>> = {
  'star.svg': svg(
    '<polygon points="50,6 61,38 95,38 67,58 78,92 50,71 22,92 33,58 5,38 39,38" fill="#f2b531" stroke="#a86d0a" stroke-width="3"/>',
  ),
  'house.svg': svg(
    '<polygon points="50,8 92,46 80,46 80,92 20,92 20,46 8,46" fill="#e8795a" stroke="#7a3320" stroke-width="3"/>' +
      '<rect x="42" y="62" width="16" height="30" fill="#7a3320"/>',
  ),
  'tree.svg': svg(
    '<rect x="44" y="64" width="12" height="30" fill="#7a5230"/>' +
      '<circle cx="50" cy="40" r="32" fill="#4caf6a" stroke="#22633a" stroke-width="3"/>',
  ),
  'cloud.svg': svg(
    '<path d="M25 75 a18 18 0 0 1 2-36 a24 24 0 0 1 45-6 a20 20 0 0 1 6 42 z" fill="#dfe8f5" stroke="#6a7f9e" stroke-width="3"/>',
  ),
  'flask.svg': svg(
    '<path d="M38 8 h24 v6 h-4 v24 l26 46 a6 6 0 0 1 -5 8 h-58 a6 6 0 0 1 -5 -8 l26 -46 v-24 h-4 z" fill="#ecf3fb" stroke="#36506e" stroke-width="3"/>' +
      '<path d="M27 66 h46 l12 18 a4 4 0 0 1 -4 6 h-62 a4 4 0 0 1 -4 -6 z" fill="#5fb3d9"/>',
  ),
  'gear.svg': svg(
    '<g fill="#8a94a6" stroke="#3d4452" stroke-width="3">' +
      Array.from({ length: 8 }, (_, i) => `<rect x="44" y="4" width="12" height="20" rx="2" transform="rotate(${i * 45} 50 50)"/>`).join('') +
      '<circle cx="50" cy="50" r="30"/></g><circle cx="50" cy="50" r="11" fill="#fff" stroke="#3d4452" stroke-width="3"/>',
  ),
  'person.svg': svg(
    '<circle cx="50" cy="28" r="18" fill="#c58c62"/><path d="M18 96 a32 34 0 0 1 64 0 z" fill="#4f6dbf"/>',
  ),
  'arrow.svg': svg('<path d="M8 40 h56 v-20 l30 30 -30 30 v-20 h-56 z" fill="#5c7cfa" stroke="#2b3f8f" stroke-width="3"/>'),
  // Wide pictures (not 1:1), so preserveAspectRatio has something to fit.
  'flag.svg': svg(
    '<rect x="2" y="2" width="156" height="96" fill="#fff" stroke="#3d4452" stroke-width="3"/>' +
      '<rect x="2" y="2" width="156" height="32" fill="#d94f4f"/><rect x="2" y="66" width="156" height="32" fill="#3f6fbf"/>' +
      '<circle cx="80" cy="50" r="22" fill="#f2b531" stroke="#a86d0a" stroke-width="3"/>',
    '0 0 160 100',
  ),
  'wave.svg': svg(
    '<rect x="1" y="1" width="198" height="78" rx="6" fill="#e6f1fb" stroke="#36506e" stroke-width="2"/>' +
      '<path d="M8 50 q23 -34 46 0 t46 0 t46 0 t46 0" fill="none" stroke="#2f7fc1" stroke-width="6" stroke-linecap="round"/>',
    '0 0 200 80',
  ),
};

/** toSVG's path resolver: answers from IMAGES, never from the network. */
export const resolveImage = (path: string): Promise<string | undefined> => Promise.resolve(IMAGES[path]);
