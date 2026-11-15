// 3d-force-graph example: Initialisation: trackball, orbit or fly
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Initialisation: trackball, orbit or fly',
  summary:
    'The control type is fixed when the graph is constructed, so the select builds a new ForceGraph3D with the chosen controlType on the same data. Each type takes the mouse and keyboard differently.',
  section: 'Initialisation',
  tags: ['ForceGraph3D', 'controlType'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
