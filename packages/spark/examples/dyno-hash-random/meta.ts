// Spark example: hashVec3, hashFloat and PCG functions for per-index randomness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hashing for stateless randomness',
  summary:
    'A splat generator with no stored data: every position, size and colour is a hash of the splat’s index. hashVec3 and hashFloat place points in a ball, pcgMix, pcgNext and pcgHash drive hue and size, and mixing a tick counter into the hash makes each splat jitter anew. New seed changes the integer uniform, not the program.',
  section: 'Dyno Standard Library',
  tags: ['hashVec3', 'hashFloat', 'pcgMix', 'pcgNext', 'pcgHash', 'dynoInt', 'SplatGenerator'],
  docs: ['repo/docs/docs/dyno-stdlib.md', 'repo/docs/docs/dyno-overview.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
