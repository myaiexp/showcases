// postprocessing example: OutlineEffect pulseSpeed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Outline: pulse',
  summary:
    'pulseSpeed makes the outline fade in and out, a cosine over time scaled by the speed. At 0 the outline is steady; higher values pulse faster.',
  section: 'Outline',
  tags: ['OutlineEffect', 'pulseSpeed', 'Selection'],
  docs: ['repo/README.md', 'repo/src/effects/OutlineEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
