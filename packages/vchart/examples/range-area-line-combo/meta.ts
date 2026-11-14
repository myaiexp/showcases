// vchart example: Range area: with a line series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Range area: with a line series',
  summary:
    'A range area only knows its bounds, so a common chart lays a line series with the middle value over it, each reading its own data entry. The line\'s points react to hover and select states.',
  section: 'Line and Area',
  tags: ['common', 'rangeArea', 'line', 'series', 'point.state'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/RangeArea.md',
    'repo/docs/assets/option/en/series/range-area.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
