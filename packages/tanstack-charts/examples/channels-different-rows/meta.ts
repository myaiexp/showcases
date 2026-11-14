// tanstack-charts example: Layers with different row types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layers with different row types',
  summary:
    'Maintenance windows (rect), hourly readings (line) and annotations (text) each use their own rows. The readout shows the mark id and row of the focused point.',
  section: 'Data and Channels',
  tags: ['rect', 'lineY', 'text', 'markId', 'onFocusChange'],
  docs: ['repo/docs/concepts/data-and-channels.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
