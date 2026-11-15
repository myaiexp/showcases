// vega example: Symbol: Directional Shapes as a Vector Field
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Symbol: Directional Shapes as a Vector Field",
  summary:
    "A grid of directional symbols whose angle comes from a flow function of position and a time signal. Pick arrow, wedge, triangle or stroke: these centred shapes point where angle says.",
  section: "Mark Types",
  tags: ['marks.symbol.angle','marks.symbol.shape','signal.update'],
  docs: ['repo/docs/docs/marks/symbol.md', 'repo/docs/docs/marks/symbol.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
