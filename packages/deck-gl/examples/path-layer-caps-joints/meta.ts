// deck-gl example: PathLayer caps and joints
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PathLayer caps and joints',
  summary:
    'capRounded and jointRounded swap square caps and mitered corners for round ones; miterLimit decides how far a sharp mitered corner may spike before it is cut.',
  section: 'Core layers',
  tags: ['PathLayer', 'capRounded', 'jointRounded', 'miterLimit'],
  docs: [
    'repo/docs/api-reference/layers/path-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
