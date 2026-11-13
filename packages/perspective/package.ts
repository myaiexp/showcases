// Perspective: a WebAssembly data engine and <perspective-viewer> pivot grid and charts
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Perspective',
  npm: '@perspective-dev/viewer',
  tagline:
    'A WebAssembly query engine and the <perspective-viewer> Web Component: pivot, filter, aggregate and chart large or streaming tables in the browser.',
  about:
    'Data lives in a Table inside a Web Worker running the C++ engine compiled to WebAssembly. A View is a query over it (group_by, split_by, filter, sort, expressions), and <perspective-viewer> is the UI that builds those queries and renders them through plugins: the Datagrid, and WebGL charts. Every example here shares one worker and the Pro Dark theme, uses generated sample data, and was built from the docs book and the package READMEs alone; the official project gallery was never opened.',
  category: 'Data/Viz',
  homepage: 'https://perspective-dev.github.io',
  docsUrl: 'https://perspective-dev.github.io',
  repo: 'https://github.com/perspective-dev/perspective',
  added: '2026-11-13',
  // The docs book's chapter order (docs/md/SUMMARY.md): use cases, then the Concepts
  // chapters, then the JavaScript chapters, with the plugin READMEs after the viewer.
  sections: [
    'Use Cases',
    'Table',
    'View',
    'Grouping and Pivots',
    'Selection and Ordering',
    'Expressions',
    'Window Columns',
    'Advanced View',
    'Derived Tables',
    'Join',
    'Engine Library',
    'Viewer',
    'Theming',
    'Save and Restore',
    'Layouts',
    'Events',
    'Plugin Settings',
    'Datagrid',
    'Charts',
    'Virtual Servers',
  ],
});
