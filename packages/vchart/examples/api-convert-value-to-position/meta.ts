// vchart example: API: convertValueToPosition and a threshold line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: convertValueToPosition and a threshold line',
  summary:
    'convertValueToPosition converts a value that is not in the data into a pixel coordinate: here a draggable threshold, drawn as an HTML line over the chart at the y axis position of the chosen value. A slider moves it and a readout shows the converted pixel.',
  section: 'API',
  tags: ['convertValueToPosition', 'axisIndex', 'isRelativeToCanvas', 'HTML overlay'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
