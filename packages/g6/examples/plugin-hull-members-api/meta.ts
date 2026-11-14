// g6 example: Hull: member methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hull: member methods',
  summary: "The hull instance's addMember, removeMember, updateMember and getMember change which nodes it wraps without rebuilding the plugin.",
  section: 'Plugin',
  tags: ['hull', 'addMember', 'removeMember', 'updateMember', 'getMember', 'getPluginInstance'],
  docs: ['repo/packages/site/docs/manual/plugin/Hull.en.md', 'repo/packages/site/common/api/plugins/hull.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
