// Sigma.js: WebGL renderer for large graphs held in graphology
import { definePackage } from '@/types.ts';

export default definePackage({
  name: 'Sigma.js',
  npm: 'sigma',
  tagline: 'Renders and explores large networks in the browser with WebGL.',
  about:
    'Sigma draws a graphology graph (nodes, edges, labels) in one WebGL context, fast enough for tens of thousands of items. Version 4 replaces per-type renderer programs with declarative styles bound to graph attributes and state flags, plus composable primitives: node shapes and fill layers, edge paths and extremities, and ordered depth layers.',
  category: 'Data/Viz',
  homepage: 'https://www.sigmajs.org',
  docsUrl: 'https://www.sigmajs.org',
  repo: 'https://github.com/jacomyal/sigma.js',
  added: '2026-11-13',
  // The docs site's sidebar order (packages/website/astro.config.mjs at sigma@4.0.6).
  sections: [
    'Get started',
    'Styling nodes',
    'Styling edges',
    'Styling labels',
    'Adding interactivity',
    'Adding layers',
    'Technical guides',
    'Concepts',
    'Reference',
  ],
});
