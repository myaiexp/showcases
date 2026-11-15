// postprocessing example: ColorAverageEffect greyscale with a selectable blend function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Color average',
  summary:
    'ColorAverageEffect is the cheap greyscale: it averages the three channels. Its only constructor argument is a blend function, and opacity fades the grey in; try ADD, MULTIPLY or DIFFERENCE for odd results.',
  section: 'Color Grading',
  tags: ['ColorAverageEffect', 'BlendFunction', 'blendMode', 'opacity'],
  docs: ['repo/README.md', 'repo/src/effects/ColorAverageEffect.js', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
