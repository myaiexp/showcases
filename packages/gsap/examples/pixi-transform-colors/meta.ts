// gsap example: PixiPlugin transform, directional rotation and colour props
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PixiPlugin transforms and colors',
  summary:
    'Pixi v8 Graphics animated through the pixi vars object: three squares rotate from 170 to -170 degrees with _short, _cw and _ccw, a circle shifts hue with a relative hsl() tint, and a star and pill tween scale, skew, position and alpha.',
  section: 'Pixi',
  tags: ['PixiPlugin', 'PixiJS', 'registerPIXI', 'rotation', 'tint', 'hsl', 'skew'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/PixiPlugin.md',
    'pages/gsap-com/docs/v3/Plugins/PixiPlugin/static-registerPIXI-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
