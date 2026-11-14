// deck-gl example: BrushingExtension targets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BrushingExtension targets',
  summary:
    'brushingTarget picks the position of each arc that the brush tests: its source, its target, or either. A select switches the mode while the orange-to-blue arcs follow the pointer.',
  section: 'Extensions',
  tags: ['BrushingExtension', 'brushingTarget', 'ArcLayer'],
  docs: [
    'repo/docs/api-reference/extensions/brushing-extension.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
