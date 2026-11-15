// galacean example: Performance: texture size and memory
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Performance: texture size and memory",
  summary:
    "The same quad textured at 64, 256, 1024 and 4096 pixels: on screen they are nearly indistinguishable, but each step costs sixteen times the memory, which the readout adds up with mipmaps.",
  section: "Performance",
  tags: ['Texture2D', 'generateMipmaps', 'UnlitMaterial'],
  docs: [
    'repo/docs/en/performance/scene-standard.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
