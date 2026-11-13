// Spark example: constructGrid with tunable extents, step, radius and colour function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Procedural grid',
  summary:
    'A 3D lattice of points made with constructGrid inside SplatMesh constructSplats. Sliders change the extents, stepSize, pointRadius and pointShadowScale (the dark copy behind each point), and a select switches between the default colours and two colour functions.',
  section: 'Procedural Splats',
  tags: ['constructGrid', 'constructSplats', 'stepSize', 'pointRadius', 'pointShadowScale', 'color'],
  docs: ['repo/docs/docs/procedural-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
