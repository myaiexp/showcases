// gsap example: MorphSVG render to canvas with defaultRender, defaultType and defaultUpdateTarget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'MorphSVG canvas render',
  summary:
    'A circle morphs through a diamond, a tablet and a bolt, drawn at once as an SVG path and on a canvas by a render function. Toggles flip the page-wide defaultType and defaultUpdateTarget.',
  section: 'MorphSVG',
  tags: ['MorphSVG', 'canvas', 'render', 'defaultRender', 'defaultType', 'defaultUpdateTarget', 'rawPathToString', 'stringToRawPath', 'convertToPath'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/MorphSVGPlugin.md',
    'pages/gsap-com/docs/v3/Plugins/MorphSVGPlugin/static-defaultRender.md',
    'pages/gsap-com/docs/v3/Plugins/MorphSVGPlugin/static-defaultType.md',
    'pages/gsap-com/docs/v3/Plugins/MorphSVGPlugin/static-defaultUpdateTarget.md',
    'pages/gsap-com/docs/v3/Plugins/MorphSVGPlugin/static-rawPathToString.md',
    'pages/gsap-com/docs/v3/Plugins/MorphSVGPlugin/static-stringToRawPath.md',
    'pages/gsap-com/docs/v3/Plugins/MorphSVGPlugin/static-convertToPath.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
