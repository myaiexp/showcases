// echarts example: Custom map projections
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom map projections',
  summary:
    'The same GeoJSON world drawn through geo.projection functions: Mercator, sinusoidal, Mollweide, a polar view and an Albers conic, against the default linear mapping. Cities sit on the projected map, and the pointer readout runs unproject back to longitude and latitude.',
  section: 'Geo',
  tags: ['geo', 'projection', 'project', 'unproject', 'convertFromPixel', 'scatter on geo'],
  docs: [
    'repo/contents/en/basics/release-note/5-3-0.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/option/component/geo.md',
    'repo/en/api/echarts-instance.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
