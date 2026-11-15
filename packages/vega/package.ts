// vega: a declarative grammar for interactive visualization, as JSON specs
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Vega',
  npm: 'vega',
  tagline: 'A visualization grammar: JSON specs of data, transforms, scales, marks and reactive signals.',
  about:
    'A Vega spec is a JSON object: data sets and the transforms that reshape them, scales that map values to pixels and colours, axes and legends, marks that draw, and signals, the reactive variables that event streams and expressions update. vega.parse turns the spec into a dataflow and a View runs and renders it. Every example here writes its whole spec in its main.ts and runs on vega 6.4.0; the sample files the docs load (airports, flights, US and world topojson) are bundled, so nothing fetches. The docs site\'s example gallery stays out: these are built from the reference pages, the two tutorials and the API docs alone.',
  category: 'Data/Viz',
  homepage: 'https://vega.github.io/vega/',
  docsUrl: 'https://vega.github.io/vega/docs/',
  repo: 'https://github.com/vega/vega',
  added: '2026-11-15',
  // The site's order: Tutorials, then the docs index (specification reference, then the
  // API reference), then Usage. Transforms follow the transforms page's five groups and the
  // mark types follow the marks page's list.
  sections: [
    "Tutorial: Let's Make a Bar Chart",
    'Tutorial: Airports',
    'Specification',
    'Config',
    'Data',
    'Transforms: Basic',
    'Transforms: Geographic',
    'Transforms: Layout',
    'Transforms: Hierarchy',
    'Transforms: Cross-Filter',
    'Triggers',
    'Projections',
    'Scales',
    'Schemes',
    'Axes',
    'Legends',
    'Title',
    'Marks',
    'Mark Types',
    'Signals',
    'Event Streams',
    'Expressions',
    'Layout',
    'Types',
    'View API',
    'Locale',
    'Extensibility',
    'Statistics',
    'Time',
    'Util',
    'Debugging',
    'Usage',
  ],
});
