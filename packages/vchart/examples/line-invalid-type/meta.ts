// vchart example: Line: invalidType for missing values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: invalidType for missing values',
  summary:
    'invalidType decides what a null value does to the line: break leaves a gap, link bridges it, zero drops it to 0 and ignore leaves it untouched. A select switches the mode over data that has holes.',
  section: 'Line and Area',
  tags: ['invalidType', 'break', 'link', 'zero', 'ignore', 'null'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Line.md',
    'repo/docs/assets/option/en/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
