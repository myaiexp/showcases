// Pretext example: sweep measureLineStats() over every width
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line count across widths',
  summary:
    'measureLineStats() answers lineCount and maxLineWidth without building any strings, so all 561 widths from 40 to 600px are swept at once and drawn as step charts. A cursor reads off the current width.',
  section: 'Manual line layout',
  tags: ['measureLineStats', 'lineCount', 'maxLineWidth', 'chart'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
