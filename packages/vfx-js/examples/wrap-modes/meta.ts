// VFX-JS example: texture wrap modes compared in the overflow area
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'wrap: repeat, clamp, mirror',
  summary:
    'The texture is empty outside the element, but a shader can still sample there. wrap decides what it gets: "repeat" (the default) tiles the element, "clamp" stretches its edge pixels, "mirror" reflects it. Each copy has the same overflow and a shader that slides uv sideways.',
  section: 'How it Works',
  tags: ['wrap', 'overflow', 'texture', 'custom shader'],
  docs: ['pages/amagi-dev/vfx-js/how-it-works.md', 'pages/amagi-dev/vfx-js/shaders.md', 'pages/amagi-dev/vfx-js/getting-started.md', 'repo/packages/vfx-js/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
