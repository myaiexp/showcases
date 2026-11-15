// postprocessing example: HueSaturationEffect rotating hue in radians and scaling saturation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hue and saturation',
  summary:
    'HueSaturationEffect rotates every colour around the hue wheel (hue is in radians) and scales saturation from -1 (grey) up to 1 (vivid). The panorama strips make the shift easy to follow.',
  section: 'Color Grading',
  tags: ['HueSaturationEffect', 'hue', 'saturation'],
  docs: ['repo/README.md', 'repo/src/effects/HueSaturationEffect.js', 'repo/src/effects/glsl/hue-saturation.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
