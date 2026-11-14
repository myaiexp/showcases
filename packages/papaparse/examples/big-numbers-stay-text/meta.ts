// Papa Parse example: numbers too big for JavaScript are left as text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Huge numbers keep every digit',
  summary:
    'JavaScript numbers lose digits past 2^53 (about 9 quadrillion). To protect long order and tracking numbers, dynamicTyping leaves numbers that large as text, so nothing is rounded behind your back.',
  section: 'Parse config',
  tags: ['dynamicTyping', '2^53', 'precision'],
  docs: ['repo/docs/docs.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});
