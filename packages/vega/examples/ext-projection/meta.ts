// vega example: Extensibility: Projection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extensibility: Custom Projections',
  summary:
    'Two projections added with vega.projection and used by name in a spec: a tilted, clipped orthographic built from a built-in constructor, and a sinusoidal projection from a d3-geo raw function, both spinning on a slider.',
  section: 'Extensibility',
  tags: ['extensibility.projection', 'projection.type', 'projection.rotate', 'mark.shape'],
  docs: ['repo/docs/docs/api/extensibility.md', 'repo/docs/docs/projections.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
