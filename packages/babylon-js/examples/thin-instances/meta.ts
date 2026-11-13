// babylon-js example: Thin instances with colours
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Thin instances with colours",
  summary:
    "One box drawn hundreds of times through thin instances: a matrix buffer rewritten each frame and a per-instance colour attribute.",
  section: 'Mesh',
  tags: ['thinInstanceSetBuffer', 'thinInstanceBufferUpdated', 'Matrix.Compose'],
  docs: [
    'repo/content/features/featuresDeepDive/mesh/copies/thinInstances.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
