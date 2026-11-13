// echarts example: Connected charts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Connected charts',
  summary:
    'Two charts given the same group and joined with echarts.connect: a tooltip, zoom or highlight on one is mirrored on the other, and getConnectedDataURL exports both as one image.',
  section: 'API',
  tags: ['echarts.connect', 'disconnect', 'group', 'getConnectedDataURL', 'showTip'],
  docs: ['repo/en/api/echarts.md', 'repo/en/api/echarts-instance.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
