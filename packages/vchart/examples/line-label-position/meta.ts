// vchart example: Line: point labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: point labels',
  summary:
    'label.visible puts a value label on every point, and label.position moves it: top, bottom, left, right, the four corners or center. A select picks the position.',
  section: 'Line and Area',
  tags: ['label.visible', 'label.position'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Line.md',
    'repo/docs/assets/option/en/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
