// Three.js example: picking objects with a Raycaster
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Picking with a raycaster',
  summary:
    'Hover the cubes: Raycaster.setFromCamera turns the pointer into a ray and intersectObjects returns what it crosses, nearest first. The nearest hit flashes.',
  section: 'Solutions',
  tags: ['Raycaster', 'setFromCamera', 'intersectObjects', 'picking'],
  docs: ['repo/manual/pages/picking.html', 'repo/docs/pages/Raycaster.html.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
