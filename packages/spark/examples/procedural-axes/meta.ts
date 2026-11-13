// Spark example: constructAxes drawing red, green and blue axes at several origins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Procedural axes',
  summary:
    'Red, green and blue XYZ axis markers drawn by constructAxes at a centre origin plus a ring of further origins. Sliders set the number of origins, the axis scale (length), axisRadius (thickness) and axisShadowScale.',
  section: 'Procedural Splats',
  tags: ['constructAxes', 'origins', 'axisRadius', 'axisShadowScale', 'scale'],
  docs: ['repo/docs/docs/procedural-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
