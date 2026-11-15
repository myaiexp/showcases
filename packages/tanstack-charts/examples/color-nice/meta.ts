// tanstack-charts example: Rounding a continuous color domain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rounding a continuous color domain',
  summary:
    'color.nice rounds a factory or configured continuous color scale like nice does for positions. The values run from 3.7 to 96.2, so without nice the legend ends are those awkward numbers and with nice they are 0 and 100. A number gives a tick count for the rounding.',
  section: 'Scales, Guides, and Color',
  tags: ['color.nice', 'scaleSequential', 'colorGradientLegend'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
