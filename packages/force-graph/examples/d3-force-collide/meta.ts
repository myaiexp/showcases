// force-graph example: Force engine: adding a collision force
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: adding a collision force',
  summary:
    'd3Force(name, force) adds any d3-force force to the simulation. With the charge turned down nodes overlap; a forceCollide of radius r added under the name \'collide\' pushes every pair apart, and null removes it again.',
  section: 'Force engine configuration',
  tags: ['d3Force', 'forceCollide', 'nodeRelSize'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
