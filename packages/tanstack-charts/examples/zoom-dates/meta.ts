// tanstack-charts example: Zooming a time axis
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zooming a time axis',
  summary:
    'zoomX works on Date windows too. The extent is two dates, the window is two dates, and format writes dates into the generated keyboard instructions. The x scale is a UTC scale whose domain is the controlled window.',
  section: 'Interactions and Selections',
  tags: ['zoomX', 'Date', 'scaleUtc', 'extent', 'format'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
