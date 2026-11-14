// g6 example: Plugin API: getPluginInstance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plugin API: getPluginInstance',
  summary: 'graph.getPluginInstance(key) returns the plugin object, so a bubble-sets plugin can be driven through its own addMember, removeMember and getMember methods.',
  section: 'Plugin',
  tags: ['getPluginInstance', 'bubble-sets', 'addMember', 'removeMember', 'getMember'],
  docs: ['repo/packages/site/docs/manual/plugin/overview.en.md', 'repo/packages/site/docs/api/plugin.en.md', 'repo/packages/site/docs/manual/plugin/BubbleSets.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
