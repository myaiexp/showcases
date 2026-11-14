// observable-plot example: Hexgrid: stroke and frame fill
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hexgrid: stroke and frame fill',
  summary:
    'The hexgrid mark takes stroke and strokeOpacity but no fill, so a frame behind it supplies the ground color.',
  section: 'Mark: Hexgrid',
  tags: ['hexgrid', 'stroke', 'strokeOpacity', 'frame', 'hexbin'],
  docs: ['repo/docs/marks/hexgrid.md', 'repo/docs/marks/frame.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
