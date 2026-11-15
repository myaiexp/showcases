// Vizzu example: an axis channel's step sets the base interval of the interlacing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Interlacing step',
  summary:
    'The step of an axis channel sets the base interval of its interlacing. The story sets 25, then 50, then back to \'auto\', and the stripes and the numbers on the axis follow.',
  section: 'Axes, title, tooltip',
  tags: ['step', 'interlacing', 'axis'],
  docs: [
    'repo/src/apps/weblib/typeschema-api/config.yaml',
    'repo/docs/tutorial/axes_title_tooltip.md',
    'repo/docs/assets/data/music_data.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
