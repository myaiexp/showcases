// Sigma.js example: HTML labels that follow clusters while the camera moves
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'HTML cluster labels synced with the camera',
  summary:
    'One HTML label per cluster, placed at the cluster centroid with graphToViewport() inside an afterRender listener, over a pointer-events: none overlay.',
  section: 'Adding layers',
  tags: ['html overlay', 'graphToViewport', 'afterRender', 'camera'],
  docs: [`${DOCS}/how-to/layers/sync-html-svg.mdx`],
  provenance: 'pure',
  added: '2026-11-13',
});
