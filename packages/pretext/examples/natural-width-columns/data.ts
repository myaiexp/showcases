// Sample table for the auto-sized columns example
export const HEADERS = ['Package', 'Description', 'Maintainers', 'Status'];

// A "\n" inside a cell is an explicit line break; only those apply to a natural width.
export const ROWS: string[][] = [
  ['pretext', 'Multiline text measurement and layout without touching the DOM', 'Cheng Lou', 'stable'],
  ['tiny', 'Small', 'Ada\nBen', 'beta'],
  ['grid-kit', 'A JavaScript-driven grid that sizes its tracks from content', 'Maya Okafor\nLeo Brandt\nSun Wei', 'stable'],
  ['ellipsis', 'Clamps text to a number of lines', 'Ines', 'deprecated'],
  ['春天', '春天到了，万物复苏。A short mixed-language description 🚀', 'Hana', 'stable'],
];
