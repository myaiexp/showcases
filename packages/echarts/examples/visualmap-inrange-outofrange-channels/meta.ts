// echarts example: visualMap inRange and outOfRange channels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'visualMap inRange and outOfRange channels',
  summary:
    'A continuous visualMap with a draggable range over 160 points. Switch the inRange channel between colour lightness, alpha, saturation, hue and size, and choose what outOfRange does to the points outside the range.',
  section: 'Option: Components',
  tags: ['visualMap', 'continuous', 'inRange', 'outOfRange', 'colorLightness', 'colorAlpha', 'colorSaturation', 'colorHue', 'range', 'calculable'],
  docs: [
    'repo/en/option/component/visual-map.md',
    'repo/en/option/component/visual-map-continuous.md',
    'repo/en/option/partial/visual-mapping.md',
    'repo/en/api/action.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
