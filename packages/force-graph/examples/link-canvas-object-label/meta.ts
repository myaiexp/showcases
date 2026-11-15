// force-graph example: Link styling: labels along links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: labels along links',
  summary:
    'In \'after\' mode linkCanvasObject runs after the default line is drawn. It writes the link\'s name at the midpoint, rotated to the line and kept upright, with the font size divided by globalScale, and skips links too short on screen to hold the text.',
  section: 'Link styling',
  tags: ['linkCanvasObject', 'linkCanvasObjectMode', 'linkWidth', 'zoom'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
