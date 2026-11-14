// Chart.js example: Plugin hooks in order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plugin hooks in order',
  summary:
    'One plugin implements every hook and logs each call, so you can read the order in which Chart.js initialises, updates, lays out, draws and destroys a chart.',
  section: 'Developers',
  tags: ['plugin', 'hooks', 'lifecycle'],
  docs: ['repo/docs/developers/plugins.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
