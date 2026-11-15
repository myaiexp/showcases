// postprocessing example: BrightnessContrastEffect with both factors moving between -1 and 1
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Brightness and contrast',
  summary:
    'BrightnessContrastEffect takes a brightness and a contrast factor, each from -1 to 1 where 0 leaves the picture alone. The two sliders (or the card animation) lift, darken, flatten and punch the colour bands.',
  section: 'Color Grading',
  tags: ['BrightnessContrastEffect', 'brightness', 'contrast'],
  docs: ['repo/README.md', 'repo/src/effects/BrightnessContrastEffect.js', 'repo/src/effects/glsl/brightness-contrast.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
