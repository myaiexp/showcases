// g6 example: Plugin config: string, object and function forms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plugin config: string, object and function forms',
  summary: 'The plugins array takes a type name, an options object with a key, or a function returning one. The full view lists what getPlugins() reports for each.',
  section: 'Plugin',
  tags: ['plugins', 'getPlugins', 'snapline', 'minimap', 'watermark'],
  docs: ['repo/packages/site/docs/manual/plugin/overview.en.md', 'repo/packages/site/docs/api/plugin.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
