// vchart example: Line: marker point style
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: marker point style',
  summary:
    'The point mark carries a shape, a size and a hover state. Two selects set point.style.shape and point.style.size, and hovering a marker scales it through point.state.hover.',
  section: 'Line and Area',
  tags: ['point.style.shape', 'point.style.size', 'point.state.hover'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Line.md',
    'repo/docs/assets/option/en/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
