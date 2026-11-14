// Zdog example: One pixel gaps, thin lines between faces and the stroke fix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One pixel gaps',
  summary:
    'Two boxes drawn with no stroke can show hairline gaps along their edges, where flat faces meet. Adding a stroke one pixel wide, which is 1 / zoom units when the Illustration is zoomed, paints over them. Toggle the stroke and watch the thin lines vanish.',
  section: 'Extras',
  tags: ['Box', 'stroke', 'zoom'],
  docs: ['repo/content/extras.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
