// playcanvas example: Relighting splats with a proxy mesh
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Relighting splats with a proxy mesh',
  summary:
    'Splats are unlit, so the GsplatRelighting script lights a simplified proxy mesh with standard lights on its own layer, renders that into an offscreen texture and lets a gsplatModifyPS chunk modulate each splat pixel by it. A grey splat cube and ball are shaded by a directional light and an orbiting blue point light; blend, brightness and background are the script attributes.',
  section: 'Gaussian Splatting',
  tags: ['GsplatRelighting', 'configureMaterial', 'relighting layer', 'gsplatModifyPS', 'blend', 'brightness', 'background', 'LightComponent.layers'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/relighting.md',
    'repo/docs/user-manual/gaussian-splatting/building/custom-shaders/fragment.md',
    'repo/docs/user-manual/gaussian-splatting/building/tonemapping.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
