// fabric example: Free drawing: spray brush
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: spray brush',
  summary:
    'SprayBrush scatters small squares around the pointer: width is the spray radius, density the dots per move, dotWidth their size and randomOpacity fades each one at random.',
  section: 'Free drawing',
  tags: ['SprayBrush', 'width', 'density', 'dotWidth', 'randomOpacity', 'freeDrawingBrush'],
  docs: [
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/classes/SprayBrush.md',
    'repo/src/content/docs/api/classes/BaseBrush.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
