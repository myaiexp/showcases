// playcanvas example: raycastAll and sorting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'raycastAll and sorting',
  summary:
    'A laser sweeps along a row of spheres and raycastAll returns every hit. The hits are joined with a polyline in the order the array came back, which is arbitrary unless sort is true, and then runs nearest to farthest. Each hit carries its point, normal and hitFraction from 0 at the start to 1 at the end. The sort option is a check box, and the cards flip it on a timer.',
  section: 'Physics',
  tags: ['raycastAll', 'sort', 'RaycastResult', 'hitFraction', 'drawLine'],
  docs: ['repo/docs/user-manual/physics/ray-casting.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
