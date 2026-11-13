// babylon-js example: Edges renderer and epsilon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edges renderer and epsilon',
  summary:
    'enableEdgesRendering draws lines where two faces’ normals differ by more than epsilon allows: at 0.95 a low-poly cylinder shows only its rims, near 0.9999 every facet gets an edge. edgesWidth and edgesColor style them; with a transparent material, forceDepthWrite keeps hidden edges from drawing through.',
  section: 'Mesh',
  tags: ['enableEdgesRendering', 'edgesWidth', 'edgesColor', 'EdgesRenderer', 'forceDepthWrite'],
  docs: ['repo/content/features/featuresDeepDive/mesh/edgeRenderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
