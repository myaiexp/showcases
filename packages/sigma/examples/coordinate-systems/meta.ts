// Sigma.js example: converting one point between sigma's coordinate spaces
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Four coordinate spaces',
  summary:
    'A marker node is placed from the pointer with viewportToGraph(), and a readout shows its position as graph, framedGraph, viewport and clipspace values using the renderer conversion methods.',
  section: 'Concepts',
  tags: ['coordinates', 'viewportToGraph', 'framedGraph', 'camera'],
  docs: [
    `${DOCS}/concepts/coordinate-systems.md`,
    `${DOCS}/how-to/interactivity/camera-viewport.mdx`,
    `${DOCS}/reference/sigma-api.md`,
    `${DOCS}/reference/events.md`,
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
