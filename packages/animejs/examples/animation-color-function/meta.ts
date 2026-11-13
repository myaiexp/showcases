// Animation example: CSS color() function values with WAAPI
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CSS color() function with WAAPI',
  summary: 'Four circles animate their backgroundColor to values written with the CSS color() function (display-p3 and srgb) through waapi.animate(), then replay in a loop.',
  section: 'Animation',
  tags: ['waapi', 'color()', 'display-p3', 'backgroundColor'],
  docs: [
    'pages/animejs-com/documentation/animation/tween-value-types/color-function-value.md',
    'pages/animejs-com/documentation/animation/tween-value-types.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
