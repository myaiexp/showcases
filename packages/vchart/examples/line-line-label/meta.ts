// vchart example: Line: series name at the line end
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: series name at the line end',
  summary:
    'lineLabel labels the whole line instead of every point. Its position is start or end, and a formatMethod over the datum prints the series name beside the line.',
  section: 'Line and Area',
  tags: ['lineLabel', 'lineLabel.position', 'formatMethod'],
  docs: [
    'repo/docs/assets/option/en/series/line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
