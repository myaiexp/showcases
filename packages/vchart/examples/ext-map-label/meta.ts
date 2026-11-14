// vchart example: Map label component on a scatter map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Map label component on a scatter map',
  summary:
    'registerMapLabel adds the mapLabel component to a common chart whose geo region holds a map and a scatter series: each city gets a name and value label with an icon, background and leader line. Position and offset are controls, and the card cycles the position.',
  section: 'Extensions',
  tags: ['mapLabel', 'registerMapLabel', 'seriesId', 'nameField', 'valueField', 'position', 'leader', 'background'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/map_label.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
