// deck-gl example: Z-fighting and turning off depth testing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Z-fighting and turning off depth testing',
  summary:
    "Labels at a steep pitch lie in the same depth range as the ground under them and are depth-tested against it. Setting parameters: { depthCompare: 'always' } on the label layer turns its depth test off, the first fix the tips page gives for z-fighting without 3D extrusions.",
  section: 'Data and performance',
  tags: ['parameters', 'depthCompare', 'z-fighting', 'depth testing', 'TextLayer'],
  docs: [
    'repo/docs/developer-guide/tips-and-tricks.md',
    'repo/docs/api-reference/core/layer.md',  ],
  provenance: 'pure',
  added: '2026-11-14',
});
