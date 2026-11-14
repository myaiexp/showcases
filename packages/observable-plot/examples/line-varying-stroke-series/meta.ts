// observable-plot example: Line: varying colour within series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: varying colour within series',
  summary:
    'Metro unemployment lines coloured by the rate itself. Because stroke varies inside each series, Plot cuts every line into coloured segments, and z keeps the series apart.',
  section: 'Mark: Line',
  tags: ['line', 'stroke', 'z', 'ruleY'],
  docs: ['repo/docs/marks/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
