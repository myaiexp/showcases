// aframe example: <a-light>: directional, point, ambient and probe
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-light>: directional, point, ambient and probe',
  summary:
    'The docs\' four <a-light> lines on white spheres: a red directional light from the top left, a blue point light (here circling), a dim ambient light and a probe light that takes its ambient colour from an <a-cubemap>. Adding any light removes A-Frame\'s default lighting; the full view toggles each one.',
  section: 'Primitives',
  tags: ['a-light', 'type', 'directional', 'point', 'ambient', 'probe', 'envMap', 'intensity'],
  docs: ['repo/docs/primitives/a-light.md', 'repo/docs/components/light.md', 'repo/docs/primitives/a-cubemap.md', 'repo/docs/components/visible.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
