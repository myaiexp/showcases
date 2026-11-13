// echarts example: Treemap colours mapped from a second dimension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap colours mapped from a second dimension",
  summary:
    "Each file has a value of [size, growth]: size sets the area, and levels.visualDimension picks which dimension drives colour. Compare colorMappingBy value, index and id, and pin the colour range with visualMin and visualMax.",
  section: 'Option: series.treemap',
  tags: ['treemap', 'levels', 'visualDimension', 'colorMappingBy', 'visualMin', 'visualMax', 'color', 'colorAlpha'],
  docs: ['repo/en/option/series/treemap.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
