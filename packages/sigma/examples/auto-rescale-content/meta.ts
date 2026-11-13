// Sigma.js example: autoRescaleContent and stagePadding decide what the viewport fit encloses
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Fitting positions, nodes or labels',
  summary:
    'By default sigma fits only node centres, so big nodes and long labels near the edge clip. autoRescaleContent grows the fit to enclose node sizes or labels too, and stagePadding adds a margin.',
  section: 'Concepts',
  tags: ['autoRescaleContent', 'stagePadding', 'sizes', 'clipping'],
  docs: [`${DOCS}/concepts/sizes.md`, `${DOCS}/reference/settings.md`],
  provenance: 'pure',
  added: '2026-11-13',
});
