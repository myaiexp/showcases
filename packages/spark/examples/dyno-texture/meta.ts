// Spark example: dynoSampler2D and texture() sampling a CanvasTexture per splat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sampling a canvas texture',
  summary:
    'A 2D canvas wrapped in a CanvasTexture and handed to dynoSampler2D, then sampled with dyno.texture() at each splat’s position to set its colour and lift it by brightness. A brush wanders over the canvas on its own and fades; in the full view you can also paint on the small canvas, which re-uploads each change.',
  section: 'Dyno Standard Library',
  tags: ['dynoSampler2D', 'texture', 'CanvasTexture', 'combine', 'dot', 'objectModifiers'],
  docs: ['repo/docs/docs/dyno-stdlib.md', 'repo/docs/docs/dyno-overview.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
