// Chart.js example: A small plugin from the guide
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A small plugin from the guide',
  summary:
    "The guide's chartAreaBorder plugin: an object with an id and a beforeDraw hook that strokes a frame around the plot, configured from options.plugins. Change the border style live.",
  section: 'Getting started',
  tags: ['plugin', 'inline plugin', 'bubble', 'beforeDraw'],
  docs: ['repo/docs/getting-started/usage.md', 'repo/docs/developers/plugins.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
