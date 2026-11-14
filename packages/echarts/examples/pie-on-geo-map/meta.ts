// echarts example: Pies on a geographic map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pies on a geographic map',
  summary:
    'Seven city pies of solar, wind and hydro output on a world map. Each pie series uses coordinateSystem geo with a longitude and latitude as its centre. Scale the pies, turn them into rose charts and roll new data.',
  section: 'Option: series.pie',
  tags: ['pie', 'coordinateSystem', 'geoIndex', 'center', 'geo', 'roseType'],
  docs: ['repo/en/option/series/pie.md', 'repo/en/option/partial/coord-sys.md', 'repo/en/option/component/geo.md', 'repo/contents/en/basics/release-note/5-4-0.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
