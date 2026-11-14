// vchart example: API: globalConfig.uniqueTooltip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: globalConfig.uniqueTooltip',
  summary:
    'VChart.globalConfig.uniqueTooltip decides whether a tooltip on one chart hides the tooltips of the other charts on the page. Two charts show tooltips from code with showTooltip; a switch turns the setting on and off and restores it when the example ends.',
  section: 'API',
  tags: ['globalConfig', 'uniqueTooltip', 'showTooltip', 'hideTooltip'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
