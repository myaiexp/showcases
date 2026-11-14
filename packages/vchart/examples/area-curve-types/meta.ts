// vchart example: Area: smooth and step edges
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: smooth and step edges',
  summary:
    'Setting curveType on line.style also moves the area\'s edge, so there is nothing to repeat on the area mark. A select goes through linear, monotone, basis, step, stepBefore and stepAfter.',
  section: 'Line and Area',
  tags: ['line.style.curveType', 'area', 'step', 'monotone'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Area.md',
    'repo/docs/assets/option/en/mark/area.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
