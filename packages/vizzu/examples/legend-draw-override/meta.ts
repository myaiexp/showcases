// Vizzu example: a legend-label-draw handler colours each legend label by its category
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legend label draw event',
  summary:
    'legend-label-draw fires once per legend label with the label text as event.target.value. Setting the fillStyle there tints each label; labels that the handler has no colour for, such as the genres, get a fallback colour.',
  section: 'Events',
  tags: ['on', 'off', 'legend-label-draw', 'renderingContext', 'event.target.value'],
  docs: [
    'repo/docs/tutorial/events.md',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/events.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
