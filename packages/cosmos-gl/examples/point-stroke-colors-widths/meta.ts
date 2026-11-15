// cosmos-gl example: Per-point stroke colors and widths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Per-point stroke colors and widths',
  summary:
    'setPointStrokeWidths and setPointStrokeColors style individual points. A NaN width or a NaN color channel means use the default (pointDefaultStrokeWidth and pointDefaultStrokeColor), and a width of 0 draws no stroke on that point.',
  section: 'Point styling',
  tags: ['setPointStrokeColors', 'setPointStrokeWidths', 'pointDefaultStrokeWidth'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx', 'repo/history/2026/2026-09-15-point-stroke.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
