// deck-gl example: BrushingExtension custom target
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'BrushingExtension custom target',
  summary:
    'Paths have no single position, so brushingTarget custom takes getBrushingTarget: here each path is brushed by its start, middle or end vertex.',
  section: 'Extensions',
  tags: ['BrushingExtension', 'brushingTarget', 'getBrushingTarget', 'PathLayer'],
  docs: [
    'repo/docs/api-reference/extensions/brushing-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
