// vchart example: Import on demand with useRegisters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Import on demand with useRegisters',
  summary:
    'The core VChart class and four register functions are imported by name and passed to VChart.useRegisters: the bar chart, tooltip, DOM tooltip handler and Cartesian crosshair. The chart uses exactly those parts; the readout lists what was registered.',
  section: 'Basic',
  tags: ['VChart.useRegisters', 'registerBarChart', 'registerTooltip', 'registerDomTooltipHandler', 'registerCartesianCrossHair'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Basic/How_to_Import_VChart.md', 'repo/docs/assets/api/en/API/vchart.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
