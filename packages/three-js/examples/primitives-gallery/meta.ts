// Three.js example: a grid of every built-in geometry class
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Every built-in geometry',
  summary:
    'One of each primitive the manual lists, spinning side by side: boxes, spheres, lathes, extrusions, tubes, a parametric surface, plus the EdgesGeometry and WireframeGeometry line helpers.',
  section: 'Fundamentals',
  tags: ['BoxGeometry', 'SphereGeometry', 'LatheGeometry', 'ExtrudeGeometry', 'TubeGeometry', 'ParametricGeometry', 'EdgesGeometry', 'WireframeGeometry'],
  docs: [
    'repo/manual/pages/primitives.html',
    'repo/docs/pages/BoxGeometry.html.md',
    'repo/docs/pages/CapsuleGeometry.html.md',
    'repo/docs/pages/LatheGeometry.html.md',
    'repo/docs/pages/ExtrudeGeometry.html.md',
    'repo/docs/pages/TubeGeometry.html.md',
    'repo/docs/pages/ParametricGeometry.html.md',
    'repo/docs/pages/EdgesGeometry.html.md',
    'repo/docs/pages/WireframeGeometry.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
