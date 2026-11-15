// tsl-textures example: Turbulent smoke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Turbulent smoke',
  summary:
    'turbulentSmoke() on a colorNode: smoke animated by the TSL time node. Speed (negative is slow, positive fast), the int details iteration count, scale and the seed are live.',
  section: 'Textures',
  tags: ['turbulentSmoke', 'colorNode', 'speed', 'details', 'time'],
  docs: ['repo/docs/turbulent-smoke.md', 'repo/src/turbulent-smoke.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
