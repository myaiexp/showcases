// Three.js example: transparency sorting problems and workarounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Drawing transparent objects',
  summary:
    'Eight transparent cubes and two crossed planes, switched between the manual\'s cases: FrontSide, DoubleSide, separate BackSide and FrontSide meshes with renderOrder, depthWrite off, and alphaTest.',
  section: 'Solutions',
  tags: ['transparent', 'side', 'depthWrite', 'alphaTest', 'renderOrder'],
  docs: [
    'repo/manual/pages/transparency.html',
    'repo/docs/pages/Material.html.md',
    'repo/docs/pages/Object3D.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
