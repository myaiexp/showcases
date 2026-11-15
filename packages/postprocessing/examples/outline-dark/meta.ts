// postprocessing example: OutlineEffect dark outlines with BlendFunction.ALPHA
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Outline: dark outlines',
  summary:
    'The default SCREEN blend adds light, so a black outline disappears. Passing BlendFunction.ALPHA makes the effect blend its colour by its own alpha, which draws solid dark outlines on a light background, like a cartoon ink line.',
  section: 'Outline',
  tags: ['OutlineEffect', 'BlendFunction.ALPHA', 'BlendFunction.SCREEN', 'visibleEdgeColor', 'blendMode'],
  docs: ['repo/README.md', 'repo/src/effects/OutlineEffect.js', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/glsl/outline.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
