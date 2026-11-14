// vchart example: Line: dashed forecast segment
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: dashed forecast segment',
  summary:
    'line.style.lineDash accepts a function of the datum, so the series marked as forecast draws dashed while the actual series stays solid. The forecast repeats the last real point so the two lines join.',
  section: 'Line and Area',
  tags: ['line.style.lineDash', 'seriesField', 'function style'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Line.md',
    'repo/docs/assets/option/en/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
