// The docs site's sidebar (.vitepress/config.ts), drawn by the tree mark
export interface Item {
  text: string;
  link?: string;
  items?: Item[];
}

const pages = (dir: string, names: string[]): Item[] =>
  names.map((text) => ({ text, link: `/${dir}/${text.toLowerCase().replace(/ /g, '-')}` }));

export const sidebar: Item[] = [
  {
    text: 'Introduction',
    items: [
      { text: 'What is Plot?', link: '/what-is-plot' },
      { text: 'Why Plot?', link: '/why-plot' },
      { text: 'Getting started', link: '/getting-started' },
      { text: 'Examples' },
    ],
  },
  {
    text: 'Features',
    items: pages('features', [
      'Plots', 'Marks', 'Scales', 'Projections', 'Transforms', 'Interactions', 'Facets',
      'Legends', 'Curves', 'Formats', 'Intervals', 'Markers', 'Shorthand', 'Accessibility',
    ]),
  },
  {
    text: 'Marks',
    items: pages('marks', [
      'Area', 'Arrow', 'Auto', 'Axis', 'Bar', 'Bollinger', 'Box', 'Cell', 'Contour', 'Delaunay',
      'Density', 'Difference', 'Dot', 'Frame', 'Geo', 'Grid', 'Hexgrid', 'Image', 'Line',
      'Linear regression', 'Link', 'Raster', 'Rect', 'Rule', 'Text', 'Tick', 'Tip', 'Tree',
      'Vector', 'Waffle',
    ]),
  },
  {
    text: 'Transforms',
    items: pages('transforms', [
      'Bin', 'Centroid', 'Dodge', 'Filter', 'Group', 'Hexbin', 'Interval', 'Map', 'Normalize',
      'Select', 'Shift', 'Sort', 'Stack', 'Tree', 'Window',
    ]),
  },
  { text: 'Interactions', items: pages('interactions', ['Crosshair', 'Pointer']) },
  { text: 'API index', link: '/api' },
];
