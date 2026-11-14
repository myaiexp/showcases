// vchart example: API: the instance getters in one readout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: the instance getters in one readout',
  summary:
    'One readout for the instance\'s read-only getters: ID, getCanvas, getContainer, getComponents, getDataSet, getCurrentTheme and getCurrentThemeName, refreshed when the data changes. The card shows the counts update as the chart gains and loses series.',
  section: 'API',
  tags: ['ID', 'getCanvas', 'getContainer', 'getComponents', 'getDataSet', 'getCurrentTheme', 'getCurrentThemeName', 'getChart', 'getStage'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
