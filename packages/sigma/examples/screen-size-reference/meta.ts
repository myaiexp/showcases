// Sigma.js example: itemSizesReference "positions" versus "screen"
import { defineMeta } from '@/types.ts';

const DOCS = 'repo/packages/website/src/content/docs';

export default defineMeta({
  title: 'Screen pixels as size reference',
  summary:
    'Flips itemSizesReference between "positions" (sizes in the x/y coordinate space) and "screen" (pixels at the default zoom ratio) on the same graph and the same size values, and resizes the stage to show the other difference.',
  section: 'Technical guides',
  tags: ['itemSizesReference', 'sizes', 'settings', 'resize'],
  docs: [`${DOCS}/how-to/technical/custom-sizes.mdx`],
  provenance: 'pure',
  added: '2026-11-13',
});
