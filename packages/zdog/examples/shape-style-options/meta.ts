// Zdog example: Shape style options, stroke and fill on a single star
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shape style options',
  summary:
    'One star drawn three ways: only its outline, only its inside, or both. Color picks the paint, stroke sets the line width (or false to switch the line off), and fill switches the inside on. The card cycles the three modes; the full view lets you set them yourself.',
  section: 'API: Shape',
  tags: ['Shape', 'color', 'stroke', 'fill', 'closed', 'path'],
  docs: ['repo/modules/docs/api-shape.hbs'],
  provenance: 'pure',
  added: '2026-11-14',
});
