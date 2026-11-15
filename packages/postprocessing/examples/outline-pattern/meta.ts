// postprocessing example: OutlineEffect patternTexture and patternScale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Outline: pattern texture',
  summary:
    'A patternTexture with alpha, painted on a canvas, fills the selected objects with a repeating hatch or dot pattern next to their outline. patternScale sets how many times it repeats across the screen; setting the texture to null turns it off.',
  section: 'Outline',
  tags: ['OutlineEffect', 'patternTexture', 'patternScale', 'CanvasTexture'],
  docs: ['repo/README.md', 'repo/src/effects/OutlineEffect.js', 'repo/src/effects/glsl/outline.frag', 'repo/src/effects/glsl/outline.vert'],
  provenance: 'pure',
  added: '2026-11-15',
});
