// vchart example: Line: curve types, smooth and step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: curve types, smooth and step',
  summary:
    'line.style.curveType interpolates between the points: linear, monotone, basis and catmullRom smooth the line, step, stepBefore and stepAfter draw stair steps. A select moves through all of them on the same data.',
  section: 'Line and Area',
  tags: ['line.style.curveType', 'monotone', 'basis', 'step', 'stepAfter', 'stepBefore'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Line.md',
    'repo/docs/assets/option/en/mark/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
