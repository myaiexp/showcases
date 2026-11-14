// g6 example: Plugin API: setPlugins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plugin API: setPlugins',
  summary: 'graph.setPlugins swaps the plugin list: add one with a function update, remove one by filtering, or clear them all. A readout lists getPlugins() after each change.',
  section: 'Plugin',
  tags: ['setPlugins', 'getPlugins', 'minimap', 'grid-line'],
  docs: ['repo/packages/site/docs/manual/plugin/overview.en.md', 'repo/packages/site/docs/api/plugin.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
