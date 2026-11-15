// globe-gl example: Render: renderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: renderer",
  summary:
    "renderer() returns the Three.js WebGLRenderer that draws the globe. Its tone mapping and exposure change the whole picture (the card pulses the exposure), and renderer.info reports the draw calls and triangles of each frame.",
  section: "Render Control",
  tags: ["renderer", "WebGLRenderer", "toneMapping", "toneMappingExposure", "info"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
