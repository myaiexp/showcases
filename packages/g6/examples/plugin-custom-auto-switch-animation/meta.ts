// g6 example: Custom plugin: switch animation by node count
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom plugin: switch animation by node count',
  summary: 'A custom plugin listens to GraphEvent.BEFORE_RENDER and turns animation off once the graph has maxLength nodes or more. maxLength is a plugin option.',
  section: 'Plugin',
  tags: ['BasePlugin', 'GraphEvent.BEFORE_RENDER', 'defaultOptions', 'maxLength', 'updatePlugin'],
  docs: ['repo/packages/site/docs/manual/plugin/custom-plugin.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
