// Three.js example: Fog and FogExp2 with the background matched to the fog colour
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fog and FogExp2',
  summary:
    'Cubes in receding rows fade into scene.fog. Switch between Fog (linear near/far) and FogExp2 (exponential density), tune the sliders and pick a colour that is applied to both the fog and scene.background.',
  section: 'Fundamentals',
  tags: ['Fog', 'FogExp2', 'scene.fog', 'scene.background'],
  docs: [
    'repo/manual/pages/fog.html',
    'repo/docs/pages/Fog.html.md',
    'repo/docs/pages/FogExp2.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
