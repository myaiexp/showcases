// postprocessing example: bloom intensity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bloom intensity',
  summary:
    'The glow of neon rings and pillars, scaled by BloomEffect.intensity. At 0 the scene is untouched; the default 1 adds the blurred highlights once; higher values wash the colours toward white.',
  section: 'Bloom',
  tags: ['BloomEffect', 'intensity'],
  docs: ['repo/src/effects/BloomEffect.js', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
